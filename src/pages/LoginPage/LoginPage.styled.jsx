import styled, { keyframes } from 'styled-components';
import { Card, Button, Alert } from 'react-bootstrap';
import { theme } from '../../styles/theme';


export const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LoginMain = styled.main`
  flex: 1;
  padding-top: 140px; /* ?嚙賢嚙?header ?嚙賜征??*/
  background: ${theme.gradients.hero};
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

  ${theme.mediaQueries.xs} {
    padding-top: 120px;
  }
`;

export const LoginSection = styled.section`
  padding: ${theme.spacing.xxxl} 0;
  position: relative;
  z-index: 2;
`;

// ?嚙賢?嚙踝蕭?
export const LoginCard = styled(Card)`
  border: none;
  border-radius: ${theme.borderRadius.xxl};
  box-shadow: ${theme.shadows.xl};
  overflow: hidden;
  max-width: 900px;
  margin: 0 auto;
  background: ${theme.colors.white};

  ${theme.mediaQueries.xs} {
    margin: 0 ${theme.spacing.md};
  }
`;

export const LoginBrand = styled.div`
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xxxl};
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon fill="white" points="0,0 100,0 0,100"/></svg>');
    opacity: 0.1;
  }

  ${theme.mediaQueries.md} {
    padding: ${theme.spacing.xxl};
  }

  ${theme.mediaQueries.xs} {
    padding: ${theme.spacing.xl};
  }
`;

export const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

export const BrandIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${theme.colors.white};
  box-shadow: ${theme.shadows.md};

  ${theme.mediaQueries.xs} {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
`;

export const BrandText = styled.div`
  .brand-name {
    font-size: 2.5rem;
    font-weight: ${theme.fonts.weights.bold};
    line-height: 1;
    margin-bottom: ${theme.spacing.xs};
    font-family: ${theme.fonts.primary};
  }

  .brand-subtitle {
    font-size: 1.2rem;
    font-weight: ${theme.fonts.weights.medium};
    opacity: 0.9;
    letter-spacing: 2px;
  }

  ${theme.mediaQueries.xs} {
    .brand-name {
      font-size: 2rem;
    }
    .brand-subtitle {
      font-size: 1rem;
    }
  }
`;

export const BrandDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
  max-width: 300px;
  margin: 0 auto;

  ${theme.mediaQueries.xs} {
    font-size: 1rem;
  }
`;

// ?嚙賢銵典
export const LoginForm = styled.div`
  padding: ${theme.spacing.xxxl};

  ${theme.mediaQueries.md} {
    padding: ${theme.spacing.xxl};
  }

  ${theme.mediaQueries.xs} {
    padding: ${theme.spacing.xl};
  }
`;

export const LoginTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.dark};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fonts.primary};

  ${theme.mediaQueries.xs} {
    font-size: 1.6rem;
  }
`;

export const LoginSubtitle = styled.p`
  text-align: center;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xxl};
  font-size: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: ${theme.fonts.weights.medium};
  color: ${theme.colors.dark};
  margin-bottom: ${theme.spacing.sm};
  font-size: 1rem;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: ${theme.transitions.normal};
  background: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`;

export const LoginButton = styled(Button)`
  width: 100%;
  background: ${theme.gradients.secondary};
  border: none;
  padding: ${theme.spacing.md} 0;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fonts.weights.semibold};
  font-size: 1.1rem;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.lg};

  &:hover:not(:disabled) {
    background: ${theme.gradients.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active:not(:disabled), &:focus:not(:disabled) {
    background: ${theme.gradients.primary};
    box-shadow: ${theme.shadows.sm};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${theme.colors.gray[400]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  i {
    margin-right: ${theme.spacing.sm};
  }
`;

export const ErrorAlert = styled(Alert)`
  border: none;
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  color: #c62828;
  border-left: 4px solid #f44336;
  margin-bottom: ${theme.spacing.lg};

  .alert-heading {
    color: #c62828;
    font-weight: ${theme.fonts.weights.semibold};
  }
`;

export const LoginFooter = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray[200]};
  color: ${theme.colors.gray[600]};
  font-size: 0.9rem;
`;

export const LoginLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.fonts.weights.medium};
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.dark};
    text-decoration: underline;
  }
`;

// 瘚殷蕭??嚙踝蕭??嚙賜
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  50% {
    transform: translateY(-5px) rotate(-1deg);
  }
  75% {
    transform: translateY(-15px) rotate(2deg);
  }
`;

export const FloatingElement = styled.div`
  position: absolute;
  opacity: 0.1;
  animation: ${floatAnimation} 8s ease-in-out infinite;
  color: ${theme.colors.primary};

  &.element-1 {
    top: 10%;
    left: 5%;
    font-size: 3rem;
    animation-delay: 0s;
  }

  &.element-2 {
    top: 70%;
    right: 10%;
    font-size: 2.5rem;
    animation-delay: 2s;
  }

  &.element-3 {
    bottom: 20%;
    left: 15%;
    font-size: 2rem;
    animation-delay: 4s;
  }

  &.element-4 {
    top: 30%;
    right: 5%;
    font-size: 1.5rem;
    animation-delay: 6s;
  }
`;
