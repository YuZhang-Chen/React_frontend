import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { getOrders } from './api';
import { AuthContext } from '../../contexts/AuthContext';
import CreateOrder from './CreateOrder';
import DeleteOrder from './DeleteOrder';
import UpdateOrder from './UpdateOrder';
import OrderDetailModal from './OrderDetailModal';

export default function OrderTable() {
    const { user } = useContext(AuthContext);
    
    // Create Modal 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    
    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    
    // Update Modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState(null);    // Status Update Modal

    // Detail Modal
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [orderToShowDetail, setOrderToShowDetail] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await getOrders();
            
            if (res.data && res.data.status === 200) {
                setOrders(res.data.result || []);
            } else {
                setError(res.data?.message || '載入訂單資料失敗');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('載入訂單資料失敗，請稍後再試。');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const handleShowDeleteModal = (order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setOrderToDelete(null);
    };

    const handleShowUpdateModal = (order) => {
        setOrderToUpdate(order);
        setShowUpdateModal(true);
    };    
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setOrderToUpdate(null);
    };    
    
    const handleShowDetailModal = (order) => {        
        setOrderToShowDetail(order);
        setShowDetailModal(true);
    };


    const getStatusVariant = (status) => {
        switch (status) {
            case '等待處理': return 'warning';
            case '可取貨': return 'info';
            case '已完成訂單': return 'success';
            case '已取消': return 'danger';
            default: return 'secondary';
        }
    };

    const formatDateTime = (datetime) => {
        if (!datetime) return '未知時間';
        const date = new Date(datetime);
        return date.toLocaleString('zh-TW');
    };

    if (loading) {
        return (
            <div className="text-center py-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">載入中...</span>
                </Spinner>
                <p className="mt-2">載入訂單資料中...</p>
            </div>
        );
    }    return (
        <>
            <div className="mb-3 d-flex justify-content-end">
                <Button variant="success" onClick={handleShowCreateModal}>
                    <i className="bi bi-plus-circle me-2"></i>新增訂單
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
                        <th>訂單ID</th>
                        <th>會員ID</th>
                        <th>訂單時間</th>
                        <th>狀態</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order.oId}>
                                <td>{index + 1}</td>
                                <td>{order.oId}</td>
                                <td>{order.mId}</td>
                                <td>{formatDateTime(order.datetime)}</td>
                                <td>
                                    <Badge bg={getStatusVariant(order.status)}>
                                        {order.status}
                                    </Badge>    
                                </td>
                                <td>{user?.role === 'admin' && (
                                        <>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                className="me-2" 
                                                onClick={() => handleShowDetailModal(order)}
                                                title="查看詳情"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </Button>
                                            <Button 
                                                variant="info" 
                                                size="sm" 
                                                className="me-2" 
                                                onClick={() => handleShowUpdateModal(order)}
                                                title="編輯訂單"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => handleShowDeleteModal(order)}
                                                title="刪除訂單"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">無訂單資料</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Create Modal */}
            <CreateOrder
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                onSuccess={fetchOrders}
            />

            {/* Delete Modal */}
            <DeleteOrder
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                order={orderToDelete}
                onSuccess={fetchOrders}
            />            {/* Update Modal */}
            <UpdateOrder
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                order={orderToUpdate}
                onSuccess={fetchOrders}
            />            {/* Status Update Modal */}

            {/* Order Detail Modal */}
            <OrderDetailModal
                show={showDetailModal}
                onHide={() => setShowDetailModal(false)}
                orderId={orderToShowDetail?.oId}
                orderInfo={orderToShowDetail}
            />
        </>
    );
}
