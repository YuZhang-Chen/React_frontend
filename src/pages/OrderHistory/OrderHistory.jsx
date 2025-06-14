import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { 
  OrderHistoryPageContainer,
  OrderHistoryMain,
  OrderHistorySection,
  OrderHistoryContainer, 
  OrderCard, 
  StatusBadge, 
  OrderDetailModal,
  FloatingElement
} from './OrderHistory.styled';
import { getOrders } from '../../services/order/api';
import { getOrderDetail } from '../../services/orderDetail/api';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  // 強制滾動到頂部 - 使用 useLayoutEffect 確保在 DOM 渲染前執行
  useLayoutEffect(() => {
    // 立即且強制滾動到頂部
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const statusVariants = {
    '等待處理': 'warning',
    '製作中': 'info',
    '可取貨': 'success',
    '已完成訂單': 'secondary'
  };

  const statusColors = {
    '等待處理': '#ffc107',
    '製作中': '#17a2b8',
    '可取貨': '#28a745',
    '已完成訂單': '#6c757d'
  };useEffect(() => {
    fetchUserOrders();
    // 確保頁面載入時滾動到頂部，並立即執行
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // 防止其他元素影響滾動位置
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fetchUserOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getOrders();
      
      // 篩選出當前用戶的訂單
      const userOrders = response.data.result.filter(order => order.mId === user.mId);
      setOrders(userOrders);
    } catch (error) {
      console.error('獲取訂單失敗:', error);
      toast.error('無法載入訂單歷史');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      setIsLoadingDetail(true);     
      const response = await getOrderDetail({ oId: orderId });
      
      setOrderDetails(response.data.result);
    } catch (error) {
      console.error('獲取訂單詳情失敗:', error);
      toast.error('無法載入訂單詳情');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
    await fetchOrderDetails(order.oId);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
    setOrderDetails([]);
  };

  const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateOrderTotal = (details) => {
    return details.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };
  if (isLoading) {
    return (
      <OrderHistoryPageContainer>
        <Header />
        <OrderHistoryMain>
          <OrderHistorySection>
            <Container className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">載入中...</span>
              </Spinner>
              <div className="mt-3">載入訂單歷史中...</div>
            </Container>
          </OrderHistorySection>
        </OrderHistoryMain>
        <Footer />
      </OrderHistoryPageContainer>
    );
  }  return (
    <OrderHistoryPageContainer>
      <Header />
      
      <OrderHistoryMain>
        {/* 浮動裝飾元素 */}
        <FloatingElement className="element-1">
          <i className="bi bi-receipt"></i>
        </FloatingElement>
        <FloatingElement className="element-2">
          <i className="bi bi-check-circle"></i>
        </FloatingElement>
        <FloatingElement className="element-3">
          <i className="bi bi-cup-hot"></i>
        </FloatingElement>
        <FloatingElement className="element-4">
          <i className="bi bi-bag-check"></i>
        </FloatingElement>

        <OrderHistorySection>
          <OrderHistoryContainer>
            <Row>
              <Col>
                <h2 className="mb-4">我的訂單歷史</h2>
                
                {orders.length === 0 ? (
                  <Alert variant="info" className="text-center">
                    <h5>您還沒有任何訂單</h5>
                    <p>趕快去選購您喜歡的飲品吧！</p>
                    <Button variant="primary" href="/">開始購物</Button>
                  </Alert>
                ) : (
                  <Row>
                    {orders.map((order) => (
                      <Col md={6} lg={4} key={order.oId} className="mb-4">
                        <OrderCard>
                          <Card.Header className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">訂單 {order.oId}</h6>
                            <StatusBadge 
                              bg={statusVariants[order.status]}
                              statusColor={statusColors[order.status]}
                            >
                              {order.status}
                            </StatusBadge>
                          </Card.Header>
                          <Card.Body>
                            <div className="mb-3">
                              <small className="text-muted">訂購時間</small>
                              <div>{formatDateTime(order.datetime)}</div>
                            </div>
                            
                            <div className="d-grid">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleViewDetails(order)}
                              >
                                查看詳情
                              </Button>
                            </div>
                          </Card.Body>
                        </OrderCard>
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </OrderHistoryContainer>
        </OrderHistorySection>
      </OrderHistoryMain>

      <Footer />

      {/* 訂單詳情 Modal */}
      <OrderDetailModal
        show={showDetailModal}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            訂單詳情 #{selectedOrder?.oId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="mb-4">
              <Row>
                <Col md={6}>
                  <strong>訂購時間：</strong>
                  <div>{formatDateTime(selectedOrder.datetime)}</div>
                </Col>
                <Col md={6}>
                  <strong>訂單狀態：</strong>
                  <div>
                    <StatusBadge 
                      bg={statusVariants[selectedOrder.status]}
                      statusColor={statusColors[selectedOrder.status]}
                      className="ms-2"
                    >
                      {selectedOrder.status}
                    </StatusBadge>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {isLoadingDetail ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" />
              <div className="mt-2">載入訂單詳情中...</div>
            </div>
          ) : (
            <>
              <h6>訂購商品</h6>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>商品名稱</th>
                    <th>尺寸</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{item.pName}</td>
                      <td>{item.size}</td>
                      <td>NT$ {item.price}</td>
                      <td>{item.quantity}</td>
                      <td>NT$ {item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="4" className="text-end">總計：</th>
                    <th>NT$ {calculateOrderTotal(orderDetails)}</th>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            關閉
          </Button>
        </Modal.Footer>
      </OrderDetailModal>
    </OrderHistoryPageContainer>
  );
};

export default OrderHistory;
