import styled, { keyframes } from 'styled-components';
import { Container, Card, Badge, Modal } from 'react-bootstrap';
import { theme } from '../../styles/theme';

// 主頁面容器 - 參考其他頁面的結構
export const OrderHistoryPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const OrderHistoryMain = styled.main`
  flex: 1;
  padding-top: 140px;
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

export const OrderHistorySection = styled.section`
  padding: ${theme.spacing.xxxl} 0;
  position: relative;
  z-index: 2;
`;

export const OrderHistoryContainer = styled(Container)`
  h2 {
    font-size: 2.5rem;
    font-weight: ${theme.fonts.weights.bold};
    color: ${theme.colors.text?.primary || '#2C1810'};
    text-align: center;
    margin-bottom: ${theme.spacing.xxl};
    font-family: ${theme.fonts.primary};

    ${theme.mediaQueries.xs} {
      font-size: 2rem;
    }
  }
`;

export const OrderCard = styled(Card)`
  border: none;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: ${theme.transitions.default || '0.3s ease'};
  height: 100%;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  }

  .card-header {
    background: ${theme.gradients.secondary};
    color: ${theme.colors.white || '#ffffff'};
    border-radius: ${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0 !important;
    border: none;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    
    h6 {
      font-weight: ${theme.fonts.weights.semibold};
      font-size: 1.1rem;
      margin: 0;
    }
  }

  .card-body {
    padding: ${theme.spacing.xl};
    background: ${theme.colors.white || '#ffffff'};
    
    .text-muted {
      color: ${theme.colors.gray[600]} !important;
      font-size: 0.9rem;
      font-weight: ${theme.fonts.weights.medium};
    }
    
    > div:first-child {
      margin-bottom: ${theme.spacing.lg};
      
      div:last-child {
        font-weight: ${theme.fonts.weights.semibold};
        color: ${theme.colors.text?.primary || '#2C1810'};
        margin-top: ${theme.spacing.xs};
        font-size: 1rem;
      }
    }

    .btn {
      background: ${theme.gradients.primary};
      border: none;
      border-radius: ${theme.borderRadius.large || '0.75rem'};
      font-weight: ${theme.fonts.weights.semibold};
      padding: ${theme.spacing.sm} ${theme.spacing.lg};
      transition: ${theme.transitions.default || '0.3s ease'};

      &:hover {
        background: ${theme.gradients.secondary};
        transform: translateY(-1px);
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
      }
    }
  }
`;

export const StatusBadge = styled(Badge)`
  background: ${props => props.statusColor} !important;
  color: ${theme.colors.white || '#ffffff'} !important;
  font-size: 0.8rem;
  font-weight: ${theme.fonts.weights.semibold};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.pill};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

export const OrderDetailModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.xl};
    overflow: hidden;
  }

  .modal-header {
    background: ${theme.gradients.primary};
    color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0;
    border: none;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};

    .modal-title {
      font-weight: ${theme.fonts.weights.bold};
      font-size: 1.3rem;
    }

    .btn-close {
      filter: brightness(0) invert(1);
      opacity: 0.8;
      
      &:hover {
        opacity: 1;
      }
    }
  }

  .modal-body {
    padding: ${theme.spacing.xl};
    background: ${theme.colors.cream};

    .row {
      margin-bottom: ${theme.spacing.lg};
      background: ${theme.colors.white};
      padding: ${theme.spacing.lg};
      border-radius: ${theme.borderRadius.lg};
      box-shadow: ${theme.shadows.sm};
      
      > div {
        margin-bottom: ${theme.spacing.md};
        
        strong {
          color: ${theme.colors.dark};
          font-weight: ${theme.fonts.weights.semibold};
        }
        
        > div:last-child {
          margin-top: ${theme.spacing.xs};
          color: ${theme.colors.gray[700]};
          font-weight: ${theme.fonts.weights.medium};
        }
      }
    }

    h6 {
      color: ${theme.colors.dark};
      font-weight: ${theme.fonts.weights.bold};
      margin-bottom: ${theme.spacing.lg};
      font-size: 1.2rem;
    }

    .table {
      background: ${theme.colors.white};
      border-radius: ${theme.borderRadius.lg};
      overflow: hidden;
      box-shadow: ${theme.shadows.md};
      border: none;

      thead {
        background: ${theme.gradients.secondary};
        
        th {
          color: ${theme.colors.white};
          font-weight: ${theme.fonts.weights.semibold};
          border: none;
          padding: ${theme.spacing.lg};
          font-size: 0.95rem;
        }
      }

      tbody {
        tr {
          &:hover {
            background-color: ${theme.colors.cream};
          }
          
          td {
            padding: ${theme.spacing.lg};
            border-color: ${theme.colors.gray[200]};
            color: ${theme.colors.gray[700]};
            font-weight: ${theme.fonts.weights.medium};
          }
        }
      }

      tfoot {
        background-color: ${theme.colors.cream};
        
        th {
          font-weight: ${theme.fonts.weights.bold};
          color: ${theme.colors.dark};
          padding: ${theme.spacing.lg};
          border-color: ${theme.colors.gray[200]};
          font-size: 1.1rem;
        }
      }
    }
  }

  .modal-footer {
    background: ${theme.colors.white};
    border-radius: 0 0 ${theme.borderRadius.xl} ${theme.borderRadius.xl};
    border: none;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};

    .btn {
      border-radius: ${theme.borderRadius.lg};
      font-weight: ${theme.fonts.weights.semibold};
      padding: ${theme.spacing.sm} ${theme.spacing.xl};
      transition: ${theme.transitions.normal};

      &.btn-secondary {
        background: ${theme.colors.gray[400]};
        border-color: ${theme.colors.gray[400]};

        &:hover {
          background: ${theme.colors.gray[500]};
          border-color: ${theme.colors.gray[500]};
        }
      }
    }
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxxl};
  color: ${theme.colors.gray[600]};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  margin: ${theme.spacing.xl} 0;

  .spinner-border {
    color: ${theme.colors.primary};
    width: 3rem;
    height: 3rem;
  }

  div {
    margin-top: ${theme.spacing.lg};
    font-weight: ${theme.fonts.weights.medium};
    font-size: 1.1rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  margin: ${theme.spacing.xl} 0;

  .empty-icon {
    width: 120px;
    height: 120px;
    background: ${theme.gradients.light};
    border-radius: ${theme.borderRadius.round};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing.xl};
    color: ${theme.colors.gray[400]};
    font-size: 3rem;
  }

  h5 {
    color: ${theme.colors.dark};
    font-weight: ${theme.fonts.weights.bold};
    margin-bottom: ${theme.spacing.md};
    font-size: 1.5rem;
  }

  p {
    color: ${theme.colors.gray[600]};
    margin-bottom: ${theme.spacing.xl};
    font-size: 1.1rem;
  }

  .btn {
    background: ${theme.gradients.secondary};
    border: none;
    border-radius: ${theme.borderRadius.pill};
    font-weight: ${theme.fonts.weights.semibold};
    padding: ${theme.spacing.md} ${theme.spacing.xxl};
    font-size: 1.1rem;
    transition: ${theme.transitions.normal};
    box-shadow: ${theme.shadows.md};
    
    &:hover {
      background: ${theme.gradients.primary};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }

    i {
      margin-right: ${theme.spacing.sm};
    }
  }
`;

// 浮動裝飾元素動畫
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
  color: ${theme.colors.primary?.main || '#8B4513'};

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
