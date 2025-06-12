import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Image } from 'react-bootstrap';
import { getProducts } from './api';
import CreateProduct from './CreateProduct';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';

export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    
    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    
    // Update Modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await getProducts();
            if (res.data && res.data.status === 200) {
                setProducts(res.data.result || []);
            } else {
                setError(res.data?.message || '載入商品資料失敗');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('載入商品資料失敗，請稍後再試。');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const handleShowDeleteModal = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const handleShowUpdateModal = (product) => {
        setProductToUpdate(product);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setProductToUpdate(null);
    };

    if (loading) {
        return (
            <div className="text-center py-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">載入中...</span>
                </Spinner>
                <p className="mt-2">載入商品資料中...</p>
            </div>
        );
    }    return (
        <>
            <div className="mb-3 d-flex justify-content-end">
                <Button variant="success" onClick={handleShowCreateModal}>
                    <i className="bi bi-plus-circle me-2"></i>新增商品
                </Button>
            </div>

            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>商品ID</th>
                        <th>圖片</th>
                        <th>商品名稱</th>
                        <th>分類</th>
                        <th>價格</th>
                        <th>尺寸</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={product.pId}>
                                <td>{index + 1}</td>
                                <td>{product.pId}</td>
                                <td>
                                    {product.image_url ? (
                                        <Image 
                                            src={product.image_url} 
                                            alt={product.pName}
                                            style={{ 
                                                width: '60px', 
                                                height: '60px', 
                                                objectFit: 'cover'
                                            }}
                                            rounded
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div 
                                            style={{ 
                                                width: '60px', 
                                                height: '60px', 
                                                backgroundColor: '#f8f9fa',
                                                border: '1px dashed #dee2e6',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                color: '#6c757d'
                                            }}
                                        >
                                            無圖片
                                        </div>
                                    )}
                                </td>
                                <td>{product.pName}</td>
                                <td>{product.category}</td>
                                <td>NT$ {product.price}</td>
                                <td>{product.size}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleShowUpdateModal(product)}>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(product)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">無商品資料</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Create Modal */}
            <CreateProduct
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                onSuccess={fetchProducts}
            />

            {/* Delete Modal */}
            <DeleteProduct
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                product={productToDelete}
                onSuccess={fetchProducts}
            />

            {/* Update Modal */}
            <UpdateProduct
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                product={productToUpdate}
                onSuccess={fetchProducts}
            />
        </>
    );
}
