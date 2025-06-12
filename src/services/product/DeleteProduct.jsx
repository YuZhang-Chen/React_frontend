import React, { useState } from 'react';
import { Modal, Button, Alert, Image, Badge } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function DeleteProduct({ show, handleClose, product, onSuccess }) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleModalClose = () => {
        setError(null);
        setSuccess(null);
        handleClose();
    };

    const handleDelete = async () => {
        if (!product) return;

        setSubmitting(true);
        setError(null);
        setSuccess(null);

        const data = {
            pId: product.pId
        };

        try {
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setSubmitting(false);
                setError('未找到認證 token，請重新登入');
                return;
            }

            const res = await authAxios.post('?action=removeProduct', Qs.stringify(data));
            const response = res.data;

            if (response.status === 200) {
                setSuccess(response.message || "商品刪除成功！");
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
            console.error("Error deleting product:", error);
            setError("刪除商品失敗，請稍後再試或聯絡系統管理員。");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>刪除商品</Modal.Title>
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

                {product && !success && (
                    <div>
                        <p><strong>確定要刪除以下商品嗎？此操作無法復原。</strong></p>
                        <div className="bg-light p-3 rounded">
                            <div className="d-flex align-items-start mb-3">
                                {product.image_url && (
                                    <Image 
                                        src={product.image_url} 
                                        alt={product.pName}
                                        style={{ 
                                            width: '80px', 
                                            height: '80px', 
                                            objectFit: 'cover'
                                        }}
                                        rounded
                                        className="me-3"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                )}
                                <div className="flex-grow-1">
                                    <h5 className="mb-2">{product.pName}</h5>
                                    <p className="mb-1">
                                        <strong>ID：</strong>#{product.pId}
                                    </p>
                                    <p className="mb-1">
                                        <strong>分類：</strong>
                                        <Badge bg="info" className="ms-2">{product.category}</Badge>
                                    </p>
                                    <p className="mb-1">
                                        <strong>價格：</strong>
                                        <Badge bg="primary" className="ms-2">NT$ {product.price}</Badge>
                                    </p>
                                    <p className="mb-0">
                                        <strong>尺寸：</strong>
                                        <Badge bg="secondary" className="ms-2">{product.size}</Badge>
                                    </p>
                                </div>
                            </div>
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
