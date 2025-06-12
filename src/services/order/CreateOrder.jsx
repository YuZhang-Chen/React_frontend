import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function CreateOrder({ show, handleClose, onSuccess }) {
    const [mId, setMId] = useState("");
    const [status, setStatus] = useState("等待處理");

    const [validated, setValidated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const resetForm = () => {
        setMId("");
        setStatus("等待處理");
        setValidated(false);
        setError(null);
        setSuccess(null);
    };

    const handleModalClose = () => {
        resetForm();
        handleClose();
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        // 表單驗證
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        setSubmitting(true);
        setError(null);
        setSuccess(null);

        const data = {
            mId,
            datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            status
        };

        try {
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setSubmitting(false);
                setError('未找到認證 token，請重新登入');
                return;
            }

            const res = await authAxios.post('?action=newOrder', Qs.stringify(data));
            const response = res.data;

            if (response.status === 200) {
                setSuccess(response.message || "訂單新增成功！");
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    }
                    handleModalClose();
                }, 1500);
            } else {
                setError(response.message || "新增失敗，請檢查資料是否正確。");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            setError("新增訂單失敗，請稍後再試或聯絡系統管理員。");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>新增訂單</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                {success && (
                    <Alert variant="success" className="mb-3">
                        <i className="bi bi-check-circle me-2"></i>
                        {success}
                    </Alert>
                )}

                {error && (
                    <Alert variant="danger" className="mb-3">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationMId">
                        <Form.Label>會員 ID</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="請輸入會員ID"
                            value={mId}
                            onChange={(e) => setMId(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            請提供有效的會員 ID。
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationStatus">
                        <Form.Label>訂單狀態</Form.Label>
                        <Form.Select
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="等待處理">等待處理</option>
                            <option value="處理中">處理中</option>
                            <option value="已完成">已完成</option>
                            <option value="已取消">已取消</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            請選擇訂單狀態。
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    取消
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    disabled={submitting}
                >
                    {submitting ? '處理中...' : '新增訂單'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
