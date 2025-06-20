import React, { useLayoutEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import {
    AboutPageContainer,
    AboutMain,
    PageHeader,
    PageTitle,
    PageSubtitle,
    StoryCard,
    StoryTitle,
    StoryText,
    FeatureCard,
    FeatureIcon,
    FeatureTitle,
    FeatureText,
    StoreInfoCard,
    StoreTitle,
    StoreInfoItem,
    FloatingElement,
    ContentWrapper
} from './About.styled';

export default function About() {
    useLayoutEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <>
            <Header />
            <AboutPageContainer>
                {/* 浮動裝飾元素 */}
                <FloatingElement className="tea-leaf-1">🌿</FloatingElement>
                <FloatingElement className="tea-leaf-2">🍃</FloatingElement>
                <FloatingElement className="milk-drop">🥛</FloatingElement>
                <FloatingElement className="cup">🧋</FloatingElement>
                
                <AboutMain>
                    <Container>
                        <ContentWrapper>
                            <Row className="justify-content-center">
                                <Col lg={8}>
                                    <PageHeader>
                                        <PageTitle>關於章魚燒</PageTitle>
                                        <PageSubtitle>致力於提供最優質的手搖飲品體驗</PageSubtitle>
                                    </PageHeader>

                                    <StoryCard>
                                        <StoryCard.Body>
                                            <StoryTitle>我們的故事</StoryTitle>
                                            <StoryText>
                                                章魚燒創立以來，始終秉持著「新鮮、品質、用心」的經營理念，
                                                堅持使用優質的茶葉與新鮮牛奶，為每一位顧客調製出最純粹的茶香與奶香。
                                                我們相信每一杯飲品都承載著溫暖與用心，讓您在忙碌的生活中品味片刻的美好。
                                            </StoryText>
                                        </StoryCard.Body>
                                    </StoryCard>

                                    <Row>
                                        <Col md={6} className="mb-4">
                                            <FeatureCard>
                                                <FeatureCard.Body>
                                                    <FeatureIcon className="feature-icon">🌿</FeatureIcon>
                                                    <FeatureTitle>嚴選茶葉</FeatureTitle>
                                                    <FeatureText>
                                                        來自台灣高山的優質茶葉，每一片都經過精心挑選
                                                    </FeatureText>
                                                </FeatureCard.Body>
                                            </FeatureCard>
                                        </Col>
                                        <Col md={6} className="mb-4">
                                            <FeatureCard>
                                                <FeatureCard.Body>
                                                    <FeatureIcon className="feature-icon">🥛</FeatureIcon>
                                                    <FeatureTitle>新鮮牛奶</FeatureTitle>
                                                    <FeatureText>
                                                        每日新鮮配送的優質牛奶，給您最純粹的奶香體驗
                                                    </FeatureText>
                                                </FeatureCard.Body>
                                            </FeatureCard>
                                        </Col>
                                    </Row>

                                    <StoreInfoCard>
                                        <StoreInfoCard.Body>
                                            <StoreTitle>門市資訊</StoreTitle>
                                            <Row>
                                                <Col md={6}>
                                                    <StoreInfoItem>
                                                        <strong>📍 地址：</strong>高雄市燕巢區深中路58號
                                                    </StoreInfoItem>
                                                    <StoreInfoItem>
                                                        <strong>📞 電話：</strong>(05) 2500-1234
                                                    </StoreInfoItem>
                                                </Col>
                                                <Col md={6}>
                                                    <StoreInfoItem>
                                                        <strong>🕐 營業時間：</strong>週一至週日 09:00-22:00
                                                    </StoreInfoItem>
                                                    <StoreInfoItem>
                                                        <strong>📧 Email：</strong>C112156205@nkust.edu.tw
                                                    </StoreInfoItem>
                                                </Col>
                                            </Row>
                                        </StoreInfoCard.Body>
                                    </StoreInfoCard>
                                </Col>
                            </Row>
                        </ContentWrapper>
                    </Container>
                </AboutMain>
            </AboutPageContainer>
            <Footer />
        </>
    );
}