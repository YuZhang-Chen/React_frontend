// Footer 組件 (Styled Components版)
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    StyledFooter,
    NewsletterSection,
    NewsletterContent,
    NewsletterTitle,
    NewsletterSubtitle,
    NewsletterForm,
    NewsletterInput,
    NewsletterButton,
    MainFooter,
    FooterSection,
    FooterLogo,
    FooterLogoIcon,
    FooterLogoText,
    FooterTitle,
    FooterText,
    FooterLinks,
    FooterLink,
    ContactInfo,
    SocialLinks,
    SocialLink,
    BottomFooter,
    Copyright,
    FooterBottomLinks
} from './Footer.styled';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <StyledFooter>
            {/* Newsletter Section */}
            <NewsletterSection>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={8}>
                            <NewsletterContent>
                                <NewsletterTitle>
                                    <i className="bi bi-envelope-heart"></i>
                                    訂閱電子報，掌握最新優惠
                                </NewsletterTitle>
                                <NewsletterSubtitle>
                                    第一時間收到新品資訊、限時優惠和獨家活動通知
                                </NewsletterSubtitle>
                            </NewsletterContent>
                        </Col>
                        <Col lg={4}>
                            <NewsletterForm>
                                <div className="input-group">
                                    <NewsletterInput 
                                        type="email" 
                                        placeholder="請輸入您的電子郵件"
                                    />
                                    <NewsletterButton>
                                        <i className="bi bi-send"></i>
                                        訂閱
                                    </NewsletterButton>
                                </div>
                            </NewsletterForm>
                        </Col>
                    </Row>
                </Container>
            </NewsletterSection>

            {/* Main Footer Content */}
            <MainFooter>
                <Container>
                    <Row>
                        {/* Company Info */}
                        <Col lg={4} md={6} className="mb-4">
                            <FooterSection>
                                <FooterLogo>
                                    <FooterLogoIcon>
                                        <i className="bi bi-cup-straw"></i>
                                    </FooterLogoIcon>
                                    <FooterLogoText>
                                        <div className="brand-name">章魚燒</div>
                                        <div className="brand-subtitle">MILKSHA</div>
                                    </FooterLogoText>
                                </FooterLogo>
                                <FooterText>
                                    章魚燒自創立以來，堅持使用最優質的茶葉和新鮮牛奶，
                                    為每一位顧客調製出最香濃美味的飲品。我們致力於成為您生活中最溫暖的陪伴。
                                </FooterText>
                                <ContactInfo>
                                    <i className="bi bi-geo-alt-fill"></i>
                                    <span>高雄市燕巢區深中路58號</span>
                                </ContactInfo>
                                <ContactInfo>
                                    <i className="bi bi-telephone-fill"></i>
                                    <span>+886-9-12345678</span>
                                </ContactInfo>
                                <ContactInfo>
                                    <i className="bi bi-envelope-fill"></i>
                                    <span>C112156205@nkust.edu.tw</span>
                                </ContactInfo>
                            </FooterSection>
                        </Col>

                        {/* Quick Links */}
                        <Col lg={2} md={6} className="mb-4">
                            <FooterSection>                                
                                <FooterTitle>快速連結</FooterTitle>
                                <FooterLinks>
                                    <li><FooterLink as={Link} to="/"><i className="bi bi-chevron-right"></i>首頁</FooterLink></li>
                                    <li><FooterLink as={Link} to="/about"><i className="bi bi-chevron-right"></i>關於我們</FooterLink></li>
                                    <li><FooterLink as={Link} to="/#products"><i className="bi bi-chevron-right"></i>飲品菜單</FooterLink></li>
                                    <li><FooterLink href="/stores"><i className="bi bi-chevron-right"></i>門市據點</FooterLink></li>
                                    <li><FooterLink href="/news"><i className="bi bi-chevron-right"></i>最新消息</FooterLink></li>
                                </FooterLinks>
                            </FooterSection>
                        </Col>

                        {/* Popular Products */}
                        <Col lg={2} md={6} className="mb-4">
                            <FooterSection>
                                <FooterTitle>熱門商品</FooterTitle>
                                <FooterLinks>
                                    <li><FooterLink href="/#products">愛茶的牛</FooterLink></li>
                                    <li><FooterLink href="/#products">牧場鮮奶茶</FooterLink></li>
                                    <li><FooterLink href="/#products">綠光牧場鮮奶</FooterLink></li>
                                    <li><FooterLink href="/#products">手作特調</FooterLink></li>
                                    <li><FooterLink href="/#products">無咖啡因</FooterLink></li>
                                </FooterLinks>
                            </FooterSection>
                        </Col>

                        {/* Customer Service */}
                        <Col lg={2} md={6} className="mb-4">
                            <FooterSection>
                                <FooterTitle>客戶服務</FooterTitle>
                                <FooterLinks>
                                    <li><FooterLink href="/faq">常見問題</FooterLink></li>
                                    <li><FooterLink href="/privacy">隱私政策</FooterLink></li>
                                    <li><FooterLink href="/terms">服務條款</FooterLink></li>
                                    <li><FooterLink href="/return">退換貨政策</FooterLink></li>
                                    <li><FooterLink href="/support">客服中心</FooterLink></li>
                                </FooterLinks>
                            </FooterSection>
                        </Col>

                        {/* Social & Download */}
                        <Col lg={2} md={6} className="mb-4">
                            <FooterSection>
                                <FooterTitle>跟隨我們</FooterTitle>
                                <SocialLinks>
                                    <SocialLink href="#" className="facebook" aria-label="Facebook">
                                        <i className="bi bi-facebook"></i>
                                    </SocialLink>
                                    <SocialLink href="#" className="instagram" aria-label="Instagram">
                                        <i className="bi bi-instagram"></i>
                                    </SocialLink>
                                    <SocialLink href="#" className="youtube" aria-label="YouTube">
                                        <i className="bi bi-youtube"></i>
                                    </SocialLink>
                                    <SocialLink href="#" className="line" aria-label="LINE">
                                        <i className="bi bi-chat-dots"></i>
                                    </SocialLink>
                                </SocialLinks>
                            </FooterSection>
                        </Col>
                    </Row>
                </Container>
            </MainFooter>

            {/* Bottom Footer */}
            <BottomFooter>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <Copyright>
                                &copy; {currentYear} 章魚燒. All Rights Reserved.
                            </Copyright>
                        </Col>
                        <Col md={6}>
                            <FooterBottomLinks>
                                <a href="/privacy">隱私政策</a>
                                <a href="/terms">服務條款</a>
                                <a href="/sitemap">網站地圖</a>
                            </FooterBottomLinks>
                        </Col>
                    </Row>
                </Container>
            </BottomFooter>
        </StyledFooter>
    );
};

export default Footer;
