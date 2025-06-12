// Home 組件 - 風格首頁 (Styled Components版)
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DrinkMenu from '../../components/drinkMenu/DrinkMenu';
import {
  HomePage,
  MainContent,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  CTAButton,
  HeroImage,
  FloatingElements,
  FloatingCup,
  FeaturesSection,
  SectionTitle,
  SectionSubtitle,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  // CTASection,
  // CTATitle,
  // CTAText,
  // CTAButtonWhite
} from './Home.styled';

export default function Home() {
  return (
    <HomePage>
      <Header />
      
      <MainContent>
        {/* Hero Section */}
        <HeroSection>
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6}>
                <HeroContent>
                  <HeroTitle>
                    <span className="brand-highlight">章魚燒</span>
                    <br />
                    用心調製每一杯
                  </HeroTitle>
                  <HeroSubtitle>
                    精選優質茶葉，搭配新鮮牧場鮮奶，
                    為您帶來最純粹的茶飲體驗。
                    每一口都是對品質的堅持與用心。
                  </HeroSubtitle>
                  <HeroActions>
                    <CTAButton size="lg" className="primary">
                      <i className="bi bi-cup-hot"></i>
                      立即點餐
                    </CTAButton>
                    <CTAButton size="lg" className="secondary">
                      <i className="bi bi-play-circle"></i>
                      品牌故事
                    </CTAButton>
                  </HeroActions>
                </HeroContent>
              </Col>
              <Col lg={6}>
                <HeroImage>
                  <FloatingElements>
                    <FloatingCup className="cup-1">
                      <i className="bi bi-cup-straw"></i>
                    </FloatingCup>
                    <FloatingCup className="cup-2">
                      <i className="bi bi-cup-hot"></i>
                    </FloatingCup>
                    <FloatingCup className="cup-3">
                      <i className="bi bi-cup"></i>
                    </FloatingCup>
                  </FloatingElements>
                </HeroImage>
              </Col>
            </Row>
          </Container>
        </HeroSection>

        {/* Features Section */}
        <FeaturesSection>
          <Container>
            <SectionTitle>為什麼選擇章魚燒？</SectionTitle>
            <SectionSubtitle>
              我們堅持品質，用心服務每一位顧客，致力於成為您最信賴的茶飲品牌
            </SectionSubtitle>
            
            <Row>
              <Col lg={4} md={6} className="mb-4">
                <FeatureCard>
                  <FeatureCard.Body>
                    <FeatureIcon className="quality">
                      <i className="bi bi-award"></i>
                    </FeatureIcon>
                    <FeatureTitle>嚴選品質</FeatureTitle>
                    <FeatureText>
                      精選台灣在地優質茶葉，堅持新鮮牧場鮮奶，
                      每一杯都是對品質的承諾與堅持。
                    </FeatureText>
                  </FeatureCard.Body>
                </FeatureCard>
              </Col>
              
              <Col lg={4} md={6} className="mb-4">
                <FeatureCard>
                  <FeatureCard.Body>
                    <FeatureIcon className="fresh">
                      <i className="bi bi-droplet"></i>
                    </FeatureIcon>
                    <FeatureTitle>新鮮製作</FeatureTitle>
                    <FeatureText>
                      每杯飲品現場調製，不添加防腐劑，
                      保持最自然的茶香和奶香融合。
                    </FeatureText>
                  </FeatureCard.Body>
                </FeatureCard>
              </Col>
              
              <Col lg={4} md={6} className="mb-4">
                <FeatureCard>
                  <FeatureCard.Body>
                    <FeatureIcon className="craft">
                      <i className="bi bi-heart"></i>
                    </FeatureIcon>
                    <FeatureTitle>用心服務</FeatureTitle>
                    <FeatureText>
                      專業調茶師傅用心調製，
                      每一杯都融入我們對美味的熱忱與專業。
                    </FeatureText>
                  </FeatureCard.Body>
                </FeatureCard>
              </Col>
            </Row>
          </Container>
        </FeaturesSection>

        {/* Menu Section */}
        <section id="products">
          <DrinkMenu />
        </section>

        {/* CTA Section */}
        {/* <CTASection>
          <Container>
            <CTATitle>準備好品嚐了嗎？</CTATitle>
            <CTAText>
              現在就來體驗章魚燒的經典美味，讓每一口都成為您美好的回憶
            </CTAText>
            <CTAButtonWhite size="lg">
              <i className="bi bi-cart-plus"></i>
              立即訂購
            </CTAButtonWhite>
          </Container>
        </CTASection> */}
      </MainContent>
      
      <Footer />
    </HomePage>
  );
}
