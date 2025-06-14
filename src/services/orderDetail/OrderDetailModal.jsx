import React, { useState, useEffect } from 'react';
import { Modal, Table, Spinner, Alert, Badge, Row, Col } from 'react-bootstrap';
import { getOrderDetail } from './api';

const OrderDetailModal = ({ show, onHide, orderId, orderInfo }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const statusVariants = {
    '等待處理': 'warning',
    '製作中': 'info',
    '可取貨': 'success',
    '已完成訂單': 'secondary'
  };
  useEffect(() => {
    if (show && orderId) {
      fetchOrderDetails();
    }
  }, [show, orderId]); // eslint-disable-line react-hooks/exhaustive-deps
  const fetchOrderDetails = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await getOrderDetail({ oId: orderId });
      
      if (response.data) {
        setOrderDetails(response.data.result);
      } else {
        setError('無法載入訂單詳情');
      }
    } catch (error) {
      console.error('獲取訂單詳情失敗:', error);
      setError('載入訂單詳情時發生錯誤');
    } finally {
      setIsLoading(false);
    }
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

  const handleClose = () => {
    setOrderDetails([]);
    setError('');
    onHide();
  };
  
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-receipt me-2"></i>
          訂單詳情 #{orderId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 訂單基本資訊 */}
        {orderInfo && (
          <div className="mb-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <Row>
              <Col md={4}>
                <strong>客戶ID：</strong>
                <div>{orderInfo.mId}</div>
              </Col>
              <Col md={4}>
                <strong>訂購時間：</strong>
                <div>{formatDateTime(orderInfo.datetime)}</div>
              </Col>
              <Col md={4}>
                <strong>訂單狀態：</strong>
                <div>
                  <Badge bg={statusVariants[orderInfo.status]} className="mt-1">
                    {orderInfo.status}
                  </Badge>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* 載入狀態 */}
        {isLoading && (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" />
            <div className="mt-2">載入訂單詳情中...</div>
          </div>
        )}

        {/* 錯誤訊息 */}
        {error && (
          <Alert variant="danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        {/* 訂單商品列表 */}
        {!isLoading && !error && orderDetails.length > 0 && (
          <>
            <h6 className="mb-3">
              <i className="bi bi-bag-check me-2"></i>
              訂購商品
            </h6>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#6c5ce7', color: 'white' }}>
                <tr>
                  <th>商品名稱</th>
                  <th>類別</th>
                  <th>尺寸</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.pName}</strong>
                    </td>
                    <td>
                      <Badge bg="info">{item.category}</Badge>
                    </td>
                    <td>{item.size}</td>
                    <td>NT$ {item.price}</td>
                    <td>
                      <Badge bg="primary">{item.quantity}</Badge>
                    </td>
                    <td>
                      <strong>NT$ {item.price * item.quantity}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ backgroundColor: '#74b9ff', color: 'white' }}>
                <tr>
                  <th colSpan="5" className="text-end">訂單總金額：</th>
                  <th>
                    <span style={{ fontSize: '1.2em' }}>
                      NT$ {calculateOrderTotal(orderDetails)}
                    </span>
                  </th>
                </tr>
              </tfoot>
            </Table>
          </>
        )}

        {/* 無資料狀態 */}
        {!isLoading && !error && orderDetails.length === 0 && (
          <Alert variant="info" className="text-center">
            <i className="bi bi-info-circle me-2"></i>
            此訂單沒有商品資料
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button 
          className="btn btn-secondary" 
          onClick={handleClose}
        >
          <i className="bi bi-x-circle me-2"></i>
          關閉
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailModal;
