// Header 組件 -  (Styled Components版)
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import {
    StyledHeader,
    TopInfoBar,
    ContactInfo,
    SocialLinks,
    SocialLink,
    StyledNavbar,
    BrandLogo,
    LogoContainer,
    LogoIcon,
    LogoText,
    NavLinks,
    StyledNavLink,
    UserActions,
    CartLink,
    CartIcon,
    CartBadge,
    UserMenu,
    UserGreeting,
    LoginButton,
    LogoutButton
} from './Header.styled';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);    const handleLogout = () => {
        logout();
        navigate('/');
    };    // 處理飲品介紹點擊，滑動到產品區域
    const handleProductsClick = (e) => {
        e.preventDefault();
        
        // 如果不在首頁，先導航到首頁
        if (window.location.pathname !== '/') {
            navigate('/');
            // 等待頁面加載後再滾動，增加延遲確保 DOM 完全載入
            setTimeout(() => {
                scrollToProducts();
            }, 300);
        } else {
            // 如果已在首頁，直接滾動
            scrollToProducts();
        }
    };

    // 滾動到產品區域
    const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // 如果找不到元素，再嘗試一次（防止 DOM 還沒完全載入）
            setTimeout(() => {
                const retrySection = document.getElementById('products');
                if (retrySection) {
                    retrySection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 200);
        }
    };

    const totalItems = isAuthenticated ? getTotalItems() : 0;return (
        <StyledHeader className={scrolled ? 'scrolled' : ''}>
            {/* Top Info Bar */}
            <TopInfoBar>
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <ContactInfo>
                            <span>
                                <i className="bi bi-telephone-fill"></i>
                                +886-9-12345678
                            </span>
                            <span>
                                <i className="bi bi-envelope-fill"></i>
                                C112156205@nkust.edu.tw
                            </span>
                        </ContactInfo>
                        <SocialLinks>
                            <SocialLink href="#" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </SocialLink>
                            <SocialLink href="#" aria-label="Instagram">
                                <i className="bi bi-instagram"></i>
                            </SocialLink>
                            <SocialLink href="#" aria-label="YouTube">
                                <i className="bi bi-youtube"></i>
                            </SocialLink>
                        </SocialLinks>
                    </div>
                </Container>
            </TopInfoBar>

            {/* Main Navigation */}
            <StyledNavbar expand="lg">
                <Container>                    {/* Logo */}
                    <BrandLogo as={Link} to="/">
                        <LogoContainer>
                            <LogoIcon>
                                <i className="bi bi-cup-straw"></i>
                            </LogoIcon>
                            <LogoText>
                                <span className="brand-name">章魚燒</span>
                                <span className="brand-subtitle">Takoyaki</span>
                            </LogoText>
                        </LogoContainer>
                    </BrandLogo>

                    <StyledNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <StyledNavbar.Collapse id="basic-navbar-nav">                        {/* Navigation Links */}                        <NavLinks className="mx-auto">
                            <StyledNavLink as={Link} to="/">
                                <i className="bi bi-house-door"></i>
                                首頁
                            </StyledNavLink>                            <StyledNavLink as={Link} to="/about">
                                <i className="bi bi-info-circle"></i>
                                關於我們
                            </StyledNavLink>
                            <StyledNavLink onClick={handleProductsClick} style={{ cursor: 'pointer' }}>
                                <i className="bi bi-cup-hot"></i>
                                飲品介紹
                            </StyledNavLink>
                            {isAuthenticated && user?.role === 'customer' && (
                                <StyledNavLink as={Link} to="/orders">
                                    <i className="bi bi-receipt"></i>
                                    我的訂單
                                </StyledNavLink>
                            )}
                            {isAuthenticated && user?.role === 'admin' && (
                                <StyledNavLink as={Link} to="/manager">
                                    <i className="bi bi-gear"></i>
                                    管理中心
                                </StyledNavLink>
                            )}
                        </NavLinks>

                        {/* User Actions */}
                        <UserActions>                            {isAuthenticated ? (
                                <>
                                    <CartLink as={Link} to="/cart">
                                        <CartIcon>
                                            <i className="bi bi-cart3"></i>
                                            {totalItems > 0 && (
                                                <CartBadge>{totalItems}</CartBadge>
                                            )}
                                        </CartIcon>
                                        購物車
                                    </CartLink>
                                    <UserMenu>
                                        <UserGreeting>
                                            <i className="bi bi-person-circle"></i>
                                            {user?.name || user?.mId}
                                        </UserGreeting>
                                        <LogoutButton 
                                            size="sm" 
                                            onClick={handleLogout}
                                        >
                                            登出
                                        </LogoutButton>
                                    </UserMenu>
                                </>                            ) : (
                                <>
                                    <LoginButton 
                                        onClick={() => navigate('/login')}
                                        className="me-2"
                                    >
                                        <i className="bi bi-box-arrow-in-right"></i>
                                        登入
                                    </LoginButton>
                                    <LoginButton 
                                        variant="outline-primary"
                                        onClick={() => navigate('/register')}
                                    >
                                        <i className="bi bi-person-plus"></i>
                                        註冊
                                    </LoginButton>
                                </>
                            )}
                        </UserActions>
                    </StyledNavbar.Collapse>
                </Container>
            </StyledNavbar>
        </StyledHeader>
    );
};

export default Header;
