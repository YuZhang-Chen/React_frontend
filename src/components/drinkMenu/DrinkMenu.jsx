import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Nav, Spinner, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { getProducts } from '../../services/product/api';
import { createOrder } from '../../services/order/api';
import './DrinkMenu.css';

const DrinkMenu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('全部');
    const [categories, setCategories] = useState(['全部']);
    const [orderMessage, setOrderMessage] = useState('');
    const [showToast, setShowToast] = useState(false);    const [toastVariant, setToastVariant] = useState('success');
    
    const { isAuthenticated, user } = useContext(AuthContext);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            if (response.data && response.data.status === 200) {
                const productsData = response.data.result || [];
                setProducts(productsData);
                
                // 提取分類
                const uniqueCategories = ['全部', ...new Set(productsData.map(product => product.category))];
                setCategories(uniqueCategories);
            } else {
                setError('載入飲料清單失敗');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('載入飲料清單失敗，請稍後再試。');
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = activeCategory === '全部' 
        ? products 
        : products.filter(product => product.category === activeCategory);    
        const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            setOrderMessage('請先登入才能使用購物車！');
            setToastVariant('warning');
            setShowToast(true);
            return;
        }

        if (user.role === 'admin') {
            setOrderMessage('管理員帳號無法使用購物車！');
            setToastVariant('warning');
            setShowToast(true);
            return;
        }

        addToCart(product, 1);
        setOrderMessage(`${product.pName} 已加入購物車！`);
        setToastVariant('success');
        setShowToast(true);
    };

    const handleOrder = async (product) => {
        if (!isAuthenticated) {
            setOrderMessage('請先登入才能下單！');
            setToastVariant('warning');
            setShowToast(true);
            return;
        }

        if (user.role === 'admin') {
            setOrderMessage('管理員帳號無法下單！');
            setToastVariant('warning');
            setShowToast(true);
            return;
        }

        try {
            const orderData = {
                mId: user.mId || user.id,
                datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                status: '等待處理'
            };

            const response = await createOrder(orderData);
            if (response.data && response.data.status === 200) {
                setOrderMessage(`成功下單：${product.pName}！`);
                setToastVariant('success');
            } else {
                setOrderMessage(response.data?.message || '下單失敗');
                setToastVariant('danger');
            }
        } catch (err) {
            console.error('Error creating order:', err);
            setOrderMessage('下單失敗，請稍後再試。');
            setToastVariant('danger');
        }
        
        setShowToast(true);
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">載入中...</span>
                </Spinner>
                <p className="mt-3 text-muted fs-5">載入飲料菜單中...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger" className="text-center">
                    <Alert.Heading>載入失敗</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={fetchProducts}>
                        重新載入
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <div className="drink-menu">
            {/* 頁面標題 */}
            <section className="hero-section">
                <Container>
                    <Row className="text-center py-5">
                        <Col>
                            <h1 className="display-4 fw-bold text-primary mb-3">我們的產品</h1>
                            <h2 className="h3 text-muted mb-4">飲品介紹</h2>
                            <div className="hero-divider mx-auto"></div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 分類導航 */}
            <section className="category-section bg-light py-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <Nav className="justify-content-center category-nav">
                                {categories.map((category) => (
                                    <Nav.Item key={category}>
                                        <Nav.Link
                                            active={activeCategory === category}
                                            onClick={() => handleCategoryChange(category)}
                                            className="px-4 py-3 mx-2 category-link"
                                        >
                                            {category}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 飲料清單 */}
            <section className="products-section py-5">
                <Container>
                    {activeCategory !== '全部' && (
                        <Row className="mb-4">
                            <Col className="text-center">
                                <h3 className="category-title">{activeCategory}</h3>
                                <div className="category-divider mx-auto"></div>
                            </Col>
                        </Row>
                    )}
                    
                    <Row className="g-4">
                        {filteredProducts.length === 0 ? (
                            <Col className="text-center py-5">
                                <div className="empty-state">
                                    <i className="bi bi-cup-straw fs-1 text-muted mb-3"></i>
                                    <h4 className="text-muted">此分類暫無飲品</h4>
                                    <p className="text-muted">請選擇其他分類查看</p>
                                </div>
                            </Col>
                        ) : (
                            filteredProducts.map((product) => (
                                <Col key={product.pId} lg={4} md={6} className="mb-4">
                                    <Card className="h-100 drink-card shadow-sm">
                                        {/* 飲料圖片 */}
                                        <div className="drink-image-container">
                                            {product.image_url ? (
                                                <Card.Img 
                                                    variant="top" 
                                                    src={product.image_url} 
                                                    alt={product.pName}
                                                    className="drink-image"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div 
                                                className="drink-image-placeholder"
                                                style={{ display: product.image_url ? 'none' : 'flex' }}
                                            >
                                                <i className="bi bi-cup-straw fs-1 text-muted"></i>
                                            </div>
                                        </div>

                                        <Card.Body className="d-flex flex-column">
                                            {/* 分類標籤 */}
                                            <div className="mb-2">
                                                <Badge bg="primary" className="category-badge">
                                                    {product.category}
                                                </Badge>
                                            </div>

                                            {/* 飲料名稱 */}
                                            <Card.Title className="drink-name h5 mb-3">
                                                {product.pName}
                                            </Card.Title>

                                            {/* 飲料介紹 */}
                                            <Card.Text className="drink-description text-muted mb-3 flex-grow-1">
                                                {product.description || `精選${product.category}，使用優質原料製作，口感層次豐富，是您品茶的絕佳選擇。`}
                                            </Card.Text>

                                            {/* 底部資訊 */}
                                            <div className="drink-footer">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <div className="price-section">
                                                        <span className="price-label text-muted small">價格</span>
                                                        <div className="price-value fw-bold text-primary fs-4">
                                                            NT$ {product.price}
                                                        </div>
                                                    </div>
                                                    <div className="size-section text-end">
                                                        <span className="size-label text-muted small">容量</span>
                                                        <div className="size-value">
                                                            <Badge bg="secondary" className="size-badge">
                                                                {product.size}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>                                                {/* 行動按鈕 */}
                                                <div className="d-grid gap-2">
                                                    <Button 
                                                        variant="outline-primary" 
                                                        className="order-button"
                                                        onClick={() => handleAddToCart(product)}
                                                    >
                                                        <i className="bi bi-cart-plus me-2"></i>
                                                        {isAuthenticated && user?.role !== 'admin' ? '加入購物車' : '登入使用購物車'}
                                                    </Button>
                                                    {isAuthenticated && user?.role !== 'admin' && (
                                                        <Button 
                                                            variant="success"
                                                            size="sm"
                                                            // onClick={() => handleOrder(product)}
                                                        >
                                                            <i className="bi bi-lightning me-2"></i>
                                                            立即下單
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}                    </Row>
                </Container>
            </section>

            {/* Toast 通知 */}
            <ToastContainer position="top-end" className="p-3">
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)} 
                    delay={3000} 
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Header>
                        <i className={`bi ${toastVariant === 'success' ? 'bi-check-circle' : toastVariant === 'warning' ? 'bi-exclamation-triangle' : 'bi-x-circle'} me-2`}></i>
                        <strong className="me-auto">
                            {toastVariant === 'success' ? '下單成功' : toastVariant === 'warning' ? '提醒' : '錯誤'}
                        </strong>
                    </Toast.Header>
                    <Toast.Body className={toastVariant === 'success' ? 'text-white' : ''}>
                        {orderMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default DrinkMenu;
