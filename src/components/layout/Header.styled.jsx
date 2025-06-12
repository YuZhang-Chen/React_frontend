// Header.styled.jsx - Styled Components
import styled from 'styled-components';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { theme } from '../../styles/theme';

// Header 容器
export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: ${theme.transitions.default};
  box-shadow: ${theme.shadows.card};

  &.scrolled {
    box-shadow: ${theme.shadows.hover};
  }
`;

// Top Info Bar
export const TopInfoBar = styled.div`
  background: ${theme.gradients.primary};
  color: ${theme.colors.background.white};
  padding: ${theme.spacing.sm} 0;
  font-size: 0.85rem;
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    margin-right: ${theme.spacing.md};

    &:last-child {
      margin-right: 0;
    }

    i {
      margin-right: ${theme.spacing.xs};
    }
  }

  ${theme.mediaQueries.xs} {
    font-size: 0.75rem;
    
    span {
      margin-right: ${theme.spacing.sm};
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  ${theme.mediaQueries.xs} {
    gap: ${theme.spacing.xs};
  }
`;

export const SocialLink = styled.a`
  color: ${theme.colors.background.white};
  font-size: 1.1rem;
  transition: ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.accent.cream};
    transform: scale(1.1);
  }
`;

// Main Navigation
export const StyledNavbar = styled(Navbar)`
  background: ${theme.colors.background.white} !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding: ${theme.spacing.md} 0;
`;

export const BrandLogo = styled(Navbar.Brand)`
  text-decoration: none !important;
  color: ${theme.colors.primary.main} !important;

  &:hover {
    color: ${theme.colors.primary.dark} !important;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.background.white};
  font-size: 1.5rem;
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;

  .brand-name {
    font-size: 1.25rem;
    font-weight: ${theme.fonts.weights.bold};
    color: ${theme.colors.primary.main};
    line-height: 1;
  }

  .brand-subtitle {
    font-size: 0.75rem;
    color: ${theme.colors.text.secondary};
    letter-spacing: 1px;
  }
`;

export const NavLinks = styled(Nav)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  ${theme.mediaQueries.md} {
    gap: ${theme.spacing.md};
  }
`;

export const StyledNavLink = styled(Nav.Link)`
  display: flex !important;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text.primary} !important;
  font-weight: ${theme.fonts.weights.medium};
  text-decoration: none !important;
  transition: ${theme.transitions.default};
  position: relative;

  &:hover {
    color: ${theme.colors.primary.main} !important;
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.gradients.primary};
    transition: ${theme.transitions.default};
  }

  &:hover::after {
    width: 100%;
  }

  i {
    font-size: 1rem;
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const CartLink = styled(Nav.Link)`
  display: flex !important;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.primary.main} !important;
  text-decoration: none !important;
  font-weight: ${theme.fonts.weights.medium};
  transition: ${theme.transitions.default};
  position: relative;

  &:hover {
    color: ${theme.colors.primary.dark} !important;
  }
`;

export const CartIcon = styled.div`
  position: relative;
  font-size: 1.25rem;
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${theme.colors.accent.gold};
  color: ${theme.colors.text.primary};
  font-size: 0.7rem;
  font-weight: ${theme.fonts.weights.bold};
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;

  i {
    color: ${theme.colors.primary.main};
    font-size: 1.1rem;
  }
`;

export const LoginButton = styled(Button).attrs({
  variant: 'outline-primary'
})`
  display: flex !important;
  align-items: center;
  gap: ${theme.spacing.xs};
  border-color: ${theme.colors.primary.main} !important;
  color: ${theme.colors.primary.main} !important;
  font-weight: ${theme.fonts.weights.medium};
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary.main} !important;
    border-color: ${theme.colors.primary.main} !important;
    color: ${theme.colors.background.white} !important;
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.card};
  }
`;

export const LogoutButton = styled(Button).attrs({
  variant: 'outline-secondary'
})`
  font-size: 0.85rem;
  padding: 4px 12px;
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
  }
`;
