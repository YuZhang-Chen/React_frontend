import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Image } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function CreateProduct({ show, handleClose, onSuccess }) {
    const [pName, setPName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("大");
    const [imageUrl, setImageUrl] = useState("");

    const [validated, setValidated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const resetForm = () => {
        setPName("");
        setCategory("");
        setPrice("");
        setSize("大");
        setImageUrl("");
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
            pName,
            category,
            price: parseFloat(price),
            size,
            image_url: imageUrl
        };

        try {
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setSubmitting(false);
                setError('未找到認證 token，請重新登入');
                return;
            }

            const res = await authAxios.post('?action=newProduct', Qs.stringify(data));
            const response = res.data;

            if (response.status === 200) {
                setSuccess(response.message || "商品新增成功！");
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
            console.error("Error creating product:", error);
            setError("新增商品失敗，請稍後再試或聯絡系統管理員。");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>新增商品</Modal.Title>
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
                    <Form.Group className="mb-3" controlId="validationPName">
                        <Form.Label>商品名稱 *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="請輸入商品名稱"
                            value={pName}
                            onChange={(e) => setPName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            請提供商品名稱。
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationCategory">
                        <Form.Label>分類 *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="例如：茶類、咖啡、果汁"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            請提供商品分類。
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationPrice">
                        <Form.Label>價格 *</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="請輸入價格"
                            min="0"
                            step="1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            請提供有效的價格。
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationSize">
                        <Form.Label>尺寸 *</Form.Label>
                        <Form.Select
                            required
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            <option value="大">大</option>
                            <option value="特大">特大</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            請選擇商品尺寸。
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationImageUrl">
                        <Form.Label>圖片網址</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder="請輸入圖片網址（選填）"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        {imageUrl && (
                            <div className="mt-3">
                                <p className="mb-2 text-muted">圖片預覽：</p>
                                <Image 
                                    src={imageUrl} 
                                    alt="商品預覽"
                                    style={{ 
                                        width: '150px', 
                                        height: '150px', 
                                        objectFit: 'cover'
                                    }}
                                    rounded
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
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
                    {submitting ? '處理中...' : '新增商品'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
