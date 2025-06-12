import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function DeleteOrder({ show, handleClose, order, onSuccess }) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleModalClose = () => {
        setError(null);
        setSuccess(null);
        handleClose();
    };

    const handleDelete = async () => {
        if (!order) return;

        setSubmitting(true);
        setError(null);
        setSuccess(null);

        const data = {
            oId: order.oId
        };

        try {
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setSubmitting(false);
                setError('未找到認證 token，請重新登入');
                return;
            }

            const res = await authAxios.post('?action=removeOrder', Qs.stringify(data));
            const response = res.data;

            if (response.status === 200) {
                setSuccess(response.message || "訂單刪除成功！");
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    }
                    handleModalClose();
                }, 1500);
            } else {
                setError(response.message || "刪除失敗，請稍後再試。");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            setError("刪除訂單失敗，請稍後再試或聯絡系統管理員。");
        } finally {
            setSubmitting(false);
        }
    };

    const formatDateTime = (datetime) => {
        if (!datetime) return '未知時間';
        const date = new Date(datetime);
        return date.toLocaleString('zh-TW');
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>刪除訂單</Modal.Title>
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

                {order && !success && (
                    <div>
                        <p><strong>確定要刪除以下訂單嗎？此操作無法復原。</strong></p>
                        <div className="bg-light p-3 rounded">
                            <p><strong>訂單ID：</strong>#{order.oId}</p>
                            <p><strong>會員ID：</strong>{order.mId}</p>
                            <p><strong>訂單時間：</strong>{formatDateTime(order.datetime)}</p>
                            <p><strong>狀態：</strong>{order.status}</p>
                        </div>
                    </div>
                )}
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    取消
                </Button>
                {!success && (
                    <Button 
                        variant="danger" 
                        onClick={handleDelete} 
                        disabled={submitting}
                    >
                        {submitting ? '刪除中...' : '確定刪除'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
