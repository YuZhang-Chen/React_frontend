import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TokenExpiredModal = ({ show, onHide }) => {
  const navigate = useNavigate();

  const handleReLogin = () => {
    onHide();
    navigate('/login');
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
          登錄已過期
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <i className="bi bi-clock-history text-muted" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3 mb-2">您的登錄已過期，為了保護您的帳戶安全，請重新登錄。</p>
          <small className="text-muted">
            這是正常的安全機制，用於保護您的個人資料。
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button 
          variant="primary" 
          onClick={handleReLogin}
          size="lg"
          className="px-4"
        >
          <i className="bi bi-box-arrow-in-right me-2"></i>
          重新登錄
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TokenExpiredModal;
