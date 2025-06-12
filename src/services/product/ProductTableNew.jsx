import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Alert, Spinner, Image } from 'react-bootstrap';
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
    }

    return (
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

            <div className="table-responsive">
                <Table striped hover className="align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th width="8%">ID</th>
                            <th width="12%">圖片</th>
                            <th width="25%">商品名稱</th>
                            <th width="15%">分類</th>
                            <th width="10%">價格</th>
                            <th width="10%">尺寸</th>
                            <th width="20%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center text-muted py-4">
                                    暫無商品資料
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.pId}>
                                    <td><strong>#{product.pId}</strong></td>
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
                                    <td><strong>{product.pName}</strong></td>
                                    <td>
                                        <Badge bg="info">{product.category}</Badge>
                                    </td>
                                    <td>
                                        <Badge bg="primary">NT$ {product.price}</Badge>
                                    </td>
                                    <td>
                                        <Badge bg="secondary">{product.size}</Badge>
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowUpdateModal(product)}
                                        >
                                            <i className="bi bi-pencil me-1"></i>編輯
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleShowDeleteModal(product)}
                                        >
                                            <i className="bi bi-trash me-1"></i>刪除
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

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
