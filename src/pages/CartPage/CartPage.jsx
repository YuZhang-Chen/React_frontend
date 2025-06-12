// CartPage 組件 - 購物車頁面 (Styled Components版)
import React, { useState } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Spinner,
} from 'react-bootstrap';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { createOrder } from '../../services/order/api';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    CartPageContainer,
    CartMain,
    CartSection,
    PageTitle,
    PageSubtitle,
    CartCard,
    CartTable,
    ProductInfo,
    QuantityControl,
    SubtotalText,
    ActionButton,
    SummaryCard,
    SummaryRow,
    ActionButtons,
    CheckoutButton,
    ClearButton,
    EmptyCart,
    ShopButton,
    CheckoutModal,
    ProductBadge,
    LoadingSpinner
} from './CartPage.styled';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalAmount, getTotalItems } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const navigate = useNavigate();

    const handleQuantityChange = (pId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity >= 1 && quantity <= 99) {
            updateQuantity(pId, quantity);
        }
    };

    const handleRemoveItem = (pId) => {
        removeFromCart(pId);
        toast.success('商品已從購物車移除');
    };

    const handleClearCart = () => {
        clearCart();
        toast.info('購物車已清空');
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.warning('購物車是空的');
            return;
        }

        setLoading(true);
        setShowCheckoutModal(true);

        try {
            const orderData = {
                mId: user.mId,
                items: cartItems.map(item => ({
                    pId: item.pId,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.price * item.quantity
                })),
                totalAmount: getTotalAmount(),
                status: 'pending'
            };

            const response = await createOrder(orderData);
            
            if (response.status === 200) {
                clearCart();
                toast.success('訂單建立成功！');
                setShowCheckoutModal(false);
                // 可以導向到訂單詳情頁面
                navigate('/orders');
            } else {
                toast.error(response.message || '訂單建立失敗');
            }
        } catch (error) {
            console.error('訂單建立失敗:', error);
            toast.error('訂單建立失敗，請稍後再試');
        } finally {
            setLoading(false);
            setShowCheckoutModal(false);
        }
    };

    // 空購物車狀態
    if (cartItems.length === 0) {
        return (
            <CartPageContainer>
                <Header />
                <CartMain>
                    <CartSection>
                        <Container>
                            <PageTitle>
                                <i className="bi bi-cart-fill"></i>
                                購物車
                            </PageTitle>
                            <PageSubtitle>您的購物車目前是空的</PageSubtitle>
                            
                            <Row className="justify-content-center">
                                <Col md={6}>
                                    <EmptyCart>
                                        <div className="empty-icon">
                                            <i className="bi bi-cart-x"></i>
                                        </div>
                                        <h3>購物車是空的</h3>
                                        <p>您還沒有添加任何商品到購物車中，快去選購您喜愛的飲品吧！</p>
                                        <ShopButton onClick={() => navigate('/')}>
                                            <i className="bi bi-cup-hot"></i>
                                            開始購物
                                        </ShopButton>
                                    </EmptyCart>
                                </Col>
                            </Row>
                        </Container>
                    </CartSection>
                </CartMain>
                <Footer />
            </CartPageContainer>
        );
    }

    return (
        <CartPageContainer>
            <Header />
            <CartMain>
                <CartSection>
                    <Container>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <PageTitle>
                                <i className="bi bi-cart-fill"></i>
                                購物車
                            </PageTitle>
                            <ProductBadge>
                                {getTotalItems()} 件商品
                            </ProductBadge>
                        </div>

                        <Row>
                            <Col lg={8}>
                                <CartCard>
                                    <CartCard.Header>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>
                                                <i className="bi bi-list-ul"></i>
                                                商品清單
                                            </span>
                                            <ClearButton 
                                                size="sm"
                                                onClick={handleClearCart}
                                            >
                                                <i className="bi bi-trash"></i>
                                                清空購物車
                                            </ClearButton>
                                        </div>
                                    </CartCard.Header>
                                    <CartCard.Body>
                                        <CartTable responsive>
                                            <thead>
                                                <tr>
                                                    <th>商品</th>
                                                    <th>價格</th>
                                                    <th>數量</th>
                                                    <th>小計</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((item) => (
                                                    <tr key={item.pId}>
                                                        <td>
                                                            <ProductInfo>
                                                                <div className="product-image">
                                                                    <i className="bi bi-cup-straw"></i>
                                                                </div>
                                                                <div className="product-details">
                                                                    <div className="product-name">{item.name}</div>
                                                                    <div className="product-price">NT$ {item.price}</div>
                                                                </div>
                                                            </ProductInfo>
                                                        </td>
                                                        <td>
                                                            <span className="fw-medium">NT$ {item.price}</span>
                                                        </td>
                                                        <td>
                                                            <QuantityControl>
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.pId, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <i className="bi bi-dash"></i>
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleQuantityChange(item.pId, e.target.value)}
                                                                    min="1"
                                                                    max="99"
                                                                />
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.pId, item.quantity + 1)}
                                                                    disabled={item.quantity >= 99}
                                                                >
                                                                    <i className="bi bi-plus"></i>
                                                                </button>
                                                            </QuantityControl>
                                                        </td>
                                                        <td>
                                                            <SubtotalText>
                                                                NT$ {(item.price * item.quantity).toLocaleString()}
                                                            </SubtotalText>
                                                        </td>
                                                        <td>
                                                            <ActionButton
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleRemoveItem(item.pId)}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </ActionButton>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </CartTable>
                                    </CartCard.Body>
                                </CartCard>
                            </Col>

                            <Col lg={4}>
                                <SummaryCard>
                                    <SummaryCard.Header>
                                        <i className="bi bi-receipt"></i>
                                        訂單摘要
                                    </SummaryCard.Header>
                                    <SummaryCard.Body>
                                        <SummaryRow>
                                            <span className="label">商品數量：</span>
                                            <span className="amount">{getTotalItems()} 件</span>
                                        </SummaryRow>
                                        <SummaryRow>
                                            <span className="label">小計：</span>
                                            <span className="amount">NT$ {getTotalAmount().toLocaleString()}</span>
                                        </SummaryRow>
                                        <SummaryRow>
                                            <span className="label">運費：</span>
                                            <span className="amount">免費</span>
                                        </SummaryRow>
                                        <SummaryRow>
                                            <span className="label">總計：</span>
                                            <span className="amount">NT$ {getTotalAmount().toLocaleString()}</span>
                                        </SummaryRow>

                                        <ActionButtons>
                                            <CheckoutButton
                                                onClick={handleCheckout}
                                                disabled={loading || cartItems.length === 0}
                                            >
                                                {loading ? (
                                                    <LoadingSpinner>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                        處理中...
                                                    </LoadingSpinner>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-credit-card"></i>
                                                        立即結帳
                                                    </>
                                                )}
                                            </CheckoutButton>
                                        </ActionButtons>
                                    </SummaryCard.Body>
                                </SummaryCard>
                            </Col>
                        </Row>
                    </Container>
                </CartSection>
            </CartMain>

            {/* 結帳確認模態框 */}
            <CheckoutModal
                show={showCheckoutModal}
                onHide={() => setShowCheckoutModal(false)}
                centered
            >
                <CheckoutModal.Header closeButton>
                    <CheckoutModal.Title>
                        <i className="bi bi-credit-card me-2"></i>
                        確認結帳
                    </CheckoutModal.Title>
                </CheckoutModal.Header>
                <CheckoutModal.Body>
                    <div className="text-center">
                        <LoadingSpinner>
                            <Spinner
                                animation="border"
                                role="status"
                                style={{ width: '3rem', height: '3rem' }}
                            />
                            <div>正在處理您的訂單...</div>
                        </LoadingSpinner>
                    </div>
                </CheckoutModal.Body>
            </CheckoutModal>

            <Footer />
        </CartPageContainer>
    );
};

export default CartPage;
