import React, { useContext, useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Button, Container, Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          🧋 飲料店
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              首頁
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              關於我們
            </Nav.Link>
            {user && user.role === 'admin' && (
              <Nav.Link as={Link} to="/manager">
                後台管理
              </Nav.Link>
            )}
          </Nav>
            <Nav>
            {isAuthenticated && user?.role !== 'admin' && (
              <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
                <Button variant="outline-light" size="sm">
                  <i className="bi bi-cart3"></i>
                  {getTotalItems() > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Nav.Link>
            )}
            {isAuthenticated ? (
              <>
                <BootstrapNavbar.Text className="me-3">
                  歡迎，{user?.name || user?.account}
                  {user?.role === 'admin' && <span className="badge bg-warning ms-2">管理員</span>}
                </BootstrapNavbar.Text>
                <Button variant="outline-light" onClick={handleLogoutClick}>
                  登出
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light">登入</Button>
              </Nav.Link>
            )}
          </Nav></BootstrapNavbar.Collapse>
      </Container>
      
      {/* 登出確認 Modal */}
      <Modal show={showLogoutModal} onHide={handleCancelLogout} centered>
        <Modal.Header closeButton>
          <Modal.Title>確認登出</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>確定要登出嗎？</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelLogout}>
            取消
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            確認登出
          </Button>
        </Modal.Footer>
      </Modal>
    </BootstrapNavbar>
  );
}

export default Navbar;