// Home.styled.jsx - 餈瑕恥憭◢?嚙踝蕭???Styled Components
import styled, { keyframes } from 'styled-components';
import { Button, Card } from 'react-bootstrap';
import { theme } from '../../styles/theme';

// 擐蕭?摰孵
export const HomePage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  padding-top: 140px; /* ?嚙賢嚙?header ?嚙賜征??*/

  ${theme.mediaQueries.xs} {
    padding-top: 120px;
  }
`;

// Hero Section
export const HeroSection = styled.section`
  background: ${theme.gradients.hero};
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="3" fill="rgba(139,69,19,0.1)"/><circle cx="80" cy="30" r="2" fill="rgba(212,180,140,0.1)"/><circle cx="40" cy="70" r="2.5" fill="rgba(244,164,96,0.1)"/></svg>');
    animation: backgroundFloat 30s ease-in-out infinite;
  }

  @keyframes backgroundFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;

export const HeroContent = styled.div`
  z-index: 2;
  position: relative;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.dark};
  line-height: 1.2;
  margin-bottom: ${theme.spacing.lg};
  font-family: ${theme.fonts.primary};

  .brand-highlight {
    color: ${theme.colors.primary};
    text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.1);
  }

  ${theme.mediaQueries.xs} {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.gray[700]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xxl};
  max-width: 500px;

  ${theme.mediaQueries.xs} {
    font-size: 1rem;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;

  ${theme.mediaQueries.xs} {
    gap: ${theme.spacing.md};
  }
`;

export const CTAButton = styled(Button)`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.pill};
  font-weight: ${theme.fonts.weights.semibold};
  font-size: 1.1rem;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.md};
  min-width: 160px;

  &.primary {
    background: ${theme.gradients.secondary};
    border: none;
    color: ${theme.colors.white};

    &:hover {
      background: ${theme.gradients.primary};
      transform: translateY(-3px);
      box-shadow: ${theme.shadows.lg};
    }
  }

  &.secondary {
    background: transparent;
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};

    &:hover {
      background: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      transform: translateY(-3px);
      box-shadow: ${theme.shadows.lg};
    }
  }

  &:active, &:focus {
    box-shadow: ${theme.shadows.sm};
    transform: translateY(-1px);
  }

  i {
    margin-right: ${theme.spacing.sm};
  }

  ${theme.mediaQueries.xs} {
    min-width: 140px;
    font-size: 1rem;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  }
`;

// Hero Image Section
export const HeroImage = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${theme.mediaQueries.xs} {
    height: 300px;
    margin-top: ${theme.spacing.xl};
  }
`;

export const FloatingElements = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(2deg);
  }
  50% {
    transform: translateY(-5px) rotate(-1deg);
  }
  75% {
    transform: translateY(-20px) rotate(1deg);
  }
`;

export const FloatingCup = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background: ${theme.gradients.secondary};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 2rem;
  box-shadow: ${theme.shadows.lg};
  animation: ${float} 6s ease-in-out infinite;

  &.cup-1 {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &.cup-2 {
    top: 60%;
    right: 20%;
    animation-delay: 2s;
    background: ${theme.gradients.primary};
  }

  &.cup-3 {
    bottom: 20%;
    left: 50%;
    animation-delay: 4s;
    background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.primary} 100%);
  }

  ${theme.mediaQueries.xs} {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: ${theme.spacing.xxxl} 0;
  background: ${theme.colors.white};
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.dark};
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fonts.primary};

  ${theme.mediaQueries.xs} {
    font-size: 2rem;
  }
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xxxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const FeatureCard = styled(Card)`
  border: none;
  box-shadow: ${theme.shadows.md};
  border-radius: ${theme.borderRadius.xl};
  transition: ${theme.transitions.normal};
  height: 100%;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.xl};
  }

  .card-body {
    padding: ${theme.spacing.xxl};
    text-align: center;
    background: ${theme.gradients.light};
  }
`;

export const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.gradients.secondary};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  color: ${theme.colors.white};
  font-size: 2rem;
  box-shadow: ${theme.shadows.primary};

  &.quality {
    background: ${theme.gradients.primary};
  }

  &.fresh {
    background: linear-gradient(135deg, ${theme.colors.green} 0%, ${theme.colors.accent} 100%);
  }

  &.craft {
    background: ${theme.gradients.secondary};
  }
`;

export const FeatureTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: ${theme.fonts.weights.semibold};
  color: ${theme.colors.dark};
  margin-bottom: ${theme.spacing.md};
`;

export const FeatureText = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: 0;
`;

// CTA Section
export const CTASection = styled.section`
  background: ${theme.gradients.primary};
  padding: ${theme.spacing.xxxl} 0;
  text-align: center;
  color: ${theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="10" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="30" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="80" r="2.5" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: backgroundFloat 25s ease-in-out infinite;
  }
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: ${theme.fonts.weights.bold};
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  z-index: 2;

  ${theme.mediaQueries.xs} {
    font-size: 2rem;
  }
`;

export const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${theme.spacing.xxl};
  opacity: 0.9;
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  ${theme.mediaQueries.xs} {
    font-size: 1rem;
  }
`;

export const CTAButtonWhite = styled(Button)`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.pill};
  font-weight: ${theme.fonts.weights.bold};
  font-size: 1.2rem;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.lg};
  position: relative;
  z-index: 2;

  &:hover {
    background: ${theme.colors.cream};
    color: ${theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.xl};
  }

  &:active, &:focus {
    background: ${theme.colors.cream};
    color: ${theme.colors.primary};
    transform: translateY(-1px);
  }

  i {
    margin-right: ${theme.spacing.sm};
  }

  ${theme.mediaQueries.xs} {
    font-size: 1rem;
    padding: ${theme.spacing.md} ${theme.spacing.xl};
  }
`;
