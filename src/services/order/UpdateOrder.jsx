import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function UpdateOrder({ show, handleClose, order, onSuccess }) {
    // 表單欄位狀態
    const [mId, setMId] = useState("");
    const [status, setStatus] = useState(null);
    const [datetime, setDatetime] = useState("");

    const [validated, setValidated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // 載入訂單資料
    const loadOrderData = useCallback(async () => {
        if (!order) return;
        try {
            setLoading(true);
            setError(null);
            
            // 設置表單初始值
            setMId(order.mId);
            setStatus(order.status || "等待處理");
            
            // 格式化日期時間為 input datetime-local 格式
            if (order.datetime) {
                const date = new Date(order.datetime);
                const formattedDate = date.toISOString().slice(0, 16);
                setDatetime(formattedDate);
            }
        } catch (err) {
            console.error("載入訂單資料時出錯:", err);
            setError("載入訂單資料時發生錯誤，請稍後再試。");
        } finally {
            setLoading(false);
        }
    }, [order]);

    // 當 order 變動時載入訂單資料
    useEffect(() => {
        if (show && order) {
            loadOrderData();
        }
    }, [show, order, loadOrderData]);

    // 重設表單
    const resetForm = () => {
        setMId("");
        setStatus("等待處理");
        setDatetime("");
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

        if (!order) {
            setError("找不到要更新的訂單資料");
            return;
        }

        setSubmitting(true);
        setError(null);
        setSuccess(null);

        // 格式化日期時間為 MySQL datetime 格式
        const formattedDatetime = datetime ? 
            new Date(datetime).toISOString().slice(0, 19).replace('T', ' ') :
            new Date().toISOString().slice(0, 19).replace('T', ' ');

        const data = {
            oId: order.oId,
            mId,
            datetime: formattedDatetime,
            status
        };
        

        try {
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setSubmitting(false);
                setError('未找到認證 token，請重新登入');
                return;
            }
            console.log(data);
            
            const res = await authAxios.post('?action=updateOrder', Qs.stringify(data));
           
            
            const response = res.data;

            if (response.status === 200) {
                setSuccess("訂單資料更新成功！");
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    }
                    handleModalClose();
                }, 1500);
            } else {
                setError(response.message || "更新失敗，請檢查資料是否正確。");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            setError("更新訂單失敗，請稍後再試或聯絡系統管理員。");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>編輯訂單</Modal.Title>
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

                {loading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">載入中...</span>
                        </div>
                        <p className="mt-2">載入訂單資料中...</p>
                    </div>
                ) : (
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

                        <Form.Group className="mb-3" controlId="validationDatetime">
                            <Form.Label>訂單時間</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                value={datetime}
                                onChange={(e) => setDatetime(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                請選擇訂單時間。
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
                                <option value="製作中">製作中</option>
                                <option value="可取貨">可取貨</option>
                                <option value="已完成訂單">已完成訂單</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                請選擇訂單狀態。
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    取消
                </Button>
                {!loading && (
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit} 
                        disabled={submitting}
                    >
                        {submitting ? '更新中...' : '更新訂單'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
