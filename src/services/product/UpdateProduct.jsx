import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Alert, Image } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function UpdateProduct({ show, handleClose, product, onSuccess }) {
    // 表單欄位狀態
    const [pName, setPName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("大");
    const [imageUrl, setImageUrl] = useState("");

    const [validated, setValidated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // 載入商品資料
    const loadProductData = useCallback(async () => {
        if (!product) return;
        
        try {
            setLoading(true);
            setError(null);
            
            // 設置表單初始值
            setPName(product.pName || "");
            setCategory(product.category || "");
            setPrice(product.price ? product.price.toString() : "");
            setSize(product.size || "大");
            setImageUrl(product.image_url || "");
        } catch (err) {
            console.error("載入商品資料時出錯:", err);
            setError("載入商品資料時發生錯誤，請稍後再試。");
        } finally {
            setLoading(false);
        }
    }, [product]);

    // 當 product 變動時載入商品資料
    useEffect(() => {
        if (show && product) {
            loadProductData();
        }
    }, [show, product, loadProductData]);

    // 重設表單
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

        if (!product) {
            setError("找不到要更新的商品資料");
            return;
        }

        setSubmitting(true);
        setError(null);
        setSuccess(null);

        const data = {
            pId: product.pId,
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

            const res = await authAxios.post('?action=updateProduct', Qs.stringify(data));
            const response = res.data;

            if (response.status === 200) {
                setSuccess("商品資料更新成功！");
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
            console.error("Error updating product:", error);
            setError("更新商品失敗，請稍後再試或聯絡系統管理員。");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>編輯商品</Modal.Title>
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
                        <p className="mt-2">載入商品資料中...</p>
                    </div>
                ) : (
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
                        {submitting ? '更新中...' : '更新商品'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
