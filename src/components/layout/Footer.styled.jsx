// Footer.styled.jsx - 迷客夏風格 Styled Components
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { theme } from '../../styles/theme';

// Main Footer Container
export const StyledFooter = styled.footer`
  margin-top: auto;
`;

// Newsletter Section
export const NewsletterSection = styled.section`
  background: ${theme.gradients.light};
  padding: ${theme.spacing.xl} 0;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const NewsletterContent = styled.div`
  text-align: center;

  ${theme.mediaQueries.lg} {
    text-align: left;
  }
`;

export const NewsletterTitle = styled.h3`
  color: ${theme.colors.primary.main};
  font-weight: ${theme.fonts.weights.bold};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  i {
    color: ${theme.colors.accent.gold};
    font-size: 1.5rem;
  }

  ${theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`;

export const NewsletterSubtitle = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: 0;
  font-size: 0.95rem;
`;

export const NewsletterForm = styled.div`
  margin-top: ${theme.spacing.md};

  ${theme.mediaQueries.lg} {
    margin-top: 0;
  }

  .input-group {
    box-shadow: ${theme.shadows.card};
    border-radius: ${theme.borderRadius.md};
    overflow: hidden;
  }
`;

export const NewsletterInput = styled.input`
  border: none;
  padding: ${theme.spacing.md};
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

export const NewsletterButton = styled(Button).attrs({
  variant: 'primary'
})`
  background: ${theme.gradients.primary} !important;
  border: none !important;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-weight: ${theme.fonts.weights.medium};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.hover};
  }
`;

// Main Footer Content
export const MainFooter = styled.section`
  background: ${theme.colors.text.primary};
  color: ${theme.colors.background.white};
  padding: ${theme.spacing.xxl} 0 ${theme.spacing.xl} 0;
`;

export const FooterSection = styled.div`
  margin-bottom: ${theme.spacing.lg};

  ${theme.mediaQueries.lg} {
    margin-bottom: 0;
  }
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

export const FooterLogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${theme.gradients.secondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.primary};
  font-size: 1.75rem;
`;

export const FooterLogoText = styled.div`
  .brand-name {
    font-size: 1.5rem;
    font-weight: ${theme.fonts.weights.bold};
    color: ${theme.colors.background.white};
    line-height: 1;
    margin-bottom: 4px;
  }

  .brand-subtitle {
    font-size: 0.8rem;
    color: ${theme.colors.gray[400]};
    letter-spacing: 2px;
  }
`;

export const FooterTitle = styled.h5`
  color: ${theme.colors.background.white};
  font-weight: ${theme.fonts.weights.bold};
  margin-bottom: ${theme.spacing.md};
  position: relative;
  padding-bottom: ${theme.spacing.sm};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: ${theme.colors.accent.gold};
  }
`;

export const FooterText = styled.p`
  color: ${theme.colors.gray[300]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  font-size: 0.95rem;
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const FooterLink = styled.a`
  color: ${theme.colors.gray[300]} !important;
  text-decoration: none;
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.9rem;

  &:hover {
    color: ${theme.colors.accent.gold} !important;
    transform: translateX(5px);
  }

  i {
    font-size: 0.8rem;
    color: ${theme.colors.accent.gold};
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.gray[300]};
  font-size: 0.9rem;

  i {
    color: ${theme.colors.accent.gold};
    font-size: 1rem;
    width: 20px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.background.white};
  font-size: 1.2rem;
  transition: ${theme.transitions.default};
  text-decoration: none;

  &.facebook {
    background: #1877f2;
    
    &:hover {
      background: #166fe5;
      transform: translateY(-2px);
    }
  }

  &.instagram {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    
    &:hover {
      transform: translateY(-2px) scale(1.05);
    }
  }

  &.youtube {
    background: #ff0000;
    
    &:hover {
      background: #e60000;
      transform: translateY(-2px);
    }
  }

  &.line {
    background: #00c300;
    
    &:hover {
      background: #00b300;
      transform: translateY(-2px);
    }
  }
`;

// Bottom Footer
export const BottomFooter = styled.section`
  background: ${theme.colors.gray[900]};
  color: ${theme.colors.gray[400]};
  padding: ${theme.spacing.lg} 0;
  border-top: 1px solid ${theme.colors.gray[700]};
`;

export const Copyright = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-align: center;

  ${theme.mediaQueries.md} {
    text-align: left;
  }
`;

export const FooterBottomLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};

  ${theme.mediaQueries.md} {
    justify-content: flex-end;
    margin-top: 0;
  }

  a {
    color: ${theme.colors.gray[400]};
    text-decoration: none;
    font-size: 0.85rem;
    transition: ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.accent.gold};
    }
  }
`;
