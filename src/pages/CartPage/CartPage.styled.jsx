// CartPage.styled.jsx - 餈瑕恥憭◢?嚙質頃?嚙踝蕭??嚙賡 Styled Components
import styled from 'styled-components';
import { Card, Button, Table, Badge, Modal } from 'react-bootstrap';
import { theme } from '../../styles/theme';

// 鞈潛頠蕭??嚙賢捆??
export const CartPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const CartMain = styled.main`
  flex: 1;
  padding-top: 140px;
  background: ${theme.gradients.light};

  ${theme.mediaQueries.xs} {
    padding-top: 120px;
  }
`;

export const CartSection = styled.section`
  padding: ${theme.spacing.xxxl} 0;
`;

// ?嚙賡璅蕭?
export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${theme.fonts.weights.bold};
  color: ${theme.colors.dark};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  font-family: ${theme.fonts.primary};

  i {
    color: ${theme.colors.primary};
    margin-right: ${theme.spacing.sm};
  }

  ${theme.mediaQueries.xs} {
    font-size: 2rem;
  }
`;

export const PageSubtitle = styled.p`
  text-align: center;
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xxl};
  font-size: 1.1rem;
`;

// 鞈潛頠??
export const CartCard = styled(Card)`
  border: none;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  margin-bottom: ${theme.spacing.xl};

  .card-header {
    background: ${theme.gradients.secondary};
    color: ${theme.colors.white};
    border-bottom: none;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    font-weight: ${theme.fonts.weights.semibold};
    font-size: 1.2rem;

    i {
      margin-right: ${theme.spacing.sm};
    }
  }

  .card-body {
    padding: 0;
  }
`;

// 鞈潛頠”??
export const CartTable = styled(Table)`
  margin: 0;
  
  th {
    background: ${theme.colors.cream};
    color: ${theme.colors.dark};
    font-weight: ${theme.fonts.weights.semibold};
    border: none;
    padding: ${theme.spacing.lg};
    white-space: nowrap;
  }

  td {
    padding: ${theme.spacing.lg};
    vertical-align: middle;
    border-color: ${theme.colors.gray[200]};
  }

  ${theme.mediaQueries.xs} {
    font-size: 0.9rem;
    
    th, td {
      padding: ${theme.spacing.sm};
    }
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  .product-image {
    width: 60px;
    height: 60px;
    background: ${theme.gradients.secondary};
    border-radius: ${theme.borderRadius.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.white};
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .product-details {
    flex: 1;

    .product-name {
      font-weight: ${theme.fonts.weights.semibold};
      color: ${theme.colors.dark};
      margin-bottom: ${theme.spacing.xs};
    }

    .product-price {
      color: ${theme.colors.primary};
      font-weight: ${theme.fonts.weights.medium};
      font-size: 1.1rem;
    }
  }

  ${theme.mediaQueries.xs} {
    .product-image {
      width: 50px;
      height: 50px;
      font-size: 1.2rem;
    }
    
    .product-details .product-name {
      font-size: 0.9rem;
    }
  }
`;

// ?嚙踝蕭??嚙賢
export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  button {
    width: 35px;
    height: 35px;
    border: 1px solid ${theme.colors.gray[300]};
    background: ${theme.colors.white};
    color: ${theme.colors.dark};
    border-radius: ${theme.borderRadius.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.fast};
    cursor: pointer;

    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      border-color: ${theme.colors.primary};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  input {
    width: 60px;
    text-align: center;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.sm};
    padding: ${theme.spacing.xs};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }

  ${theme.mediaQueries.xs} {
    button {
      width: 30px;
      height: 30px;
    }
    
    input {
      width: 50px;
    }
  }
`;

// 撠蕭?憿舐內
export const SubtotalText = styled.span`
  font-weight: ${theme.fonts.weights.semibold};
  color: ${theme.colors.primary};
  font-size: 1.1rem;
`;

// ?嚙踝蕭??嚙踝蕭?
export const ActionButton = styled(Button)`
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-weight: ${theme.fonts.weights.medium};
  transition: ${theme.transitions.normal};

  &.btn-outline-danger {
    border-color: #dc3545;
    color: #dc3545;

    &:hover {
      background: #dc3545;
      border-color: #dc3545;
      transform: translateY(-1px);
    }
  }

  i {
    margin-right: ${theme.spacing.xs};
  }
`;

// 蝮踝蕭??嚙踝蕭?
export const SummaryCard = styled(Card)`
  border: none;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  position: sticky;
  top: 160px;

  .card-header {
    background: ${theme.gradients.primary};
    color: ${theme.colors.white};
    border-bottom: none;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    font-weight: ${theme.fonts.weights.semibold};
    font-size: 1.2rem;
  }

  .card-body {
    padding: ${theme.spacing.xl};
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
    padding-top: ${theme.spacing.md};
    border-top: 2px solid ${theme.colors.gray[200]};
    font-weight: ${theme.fonts.weights.bold};
    font-size: 1.2rem;
  }

  .label {
    color: ${theme.colors.dark};
  }

  .amount {
    color: ${theme.colors.primary};
    font-weight: ${theme.fonts.weights.semibold};
  }
`;

// ?嚙踝蕭??嚙踝蕭?嚙?
export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

export const CheckoutButton = styled(Button)`
  background: ${theme.gradients.secondary};
  border: none;
  padding: ${theme.spacing.md} 0;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fonts.weights.bold};
  font-size: 1.1rem;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.md};

  &:hover:not(:disabled) {
    background: ${theme.gradients.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    background: ${theme.colors.gray[400]};
    cursor: not-allowed;
  }

  i {
    margin-right: ${theme.spacing.sm};
  }
`;

export const ClearButton = styled(Button)`
  background: transparent;
  border: 2px solid ${theme.colors.gray[400]};
  color: ${theme.colors.gray[600]};
  padding: ${theme.spacing.sm} 0;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fonts.weights.medium};
  transition: ${theme.transitions.normal};

  &:hover {
    background: #dc3545;
    border-color: #dc3545;
    color: ${theme.colors.white};
    transform: translateY(-1px);
  }

  i {
    margin-right: ${theme.spacing.sm};
  }
`;

// 蝛箄頃?嚙踝蕭??嚙??
export const EmptyCart = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxxl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};

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

  h3 {
    color: ${theme.colors.dark};
    font-weight: ${theme.fonts.weights.semibold};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.gray[600]};
    margin-bottom: ${theme.spacing.xl};
  }
`;

export const ShopButton = styled(Button)`
  background: ${theme.gradients.secondary};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.pill};
  font-weight: ${theme.fonts.weights.semibold};
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
`;

// 蝯董璅∴蕭?嚙?
export const CheckoutModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: ${theme.borderRadius.xl};
    overflow: hidden;
  }

  .modal-header {
    background: ${theme.gradients.primary};
    color: ${theme.colors.white};
    border-bottom: none;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};

    .modal-title {
      font-weight: ${theme.fonts.weights.bold};
      font-size: 1.3rem;
    }

    .btn-close {
      filter: invert(1);
    }
  }

  .modal-body {
    padding: ${theme.spacing.xl};
  }

  .modal-footer {
    border-top: 1px solid ${theme.colors.gray[200]};
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
  }
`;

// ?嚙踝蕭?敺踝蕭?
export const ProductBadge = styled(Badge)`
  background: ${theme.colors.accent};
  color: ${theme.colors.white};
  font-size: 0.8rem;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.pill};
`;

// ?嚙踝蕭??嚙??
export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray[600]};

  .spinner-border {
    width: 1.2rem;
    height: 1.2rem;
    border-color: ${theme.colors.primary};
    border-right-color: transparent;
  }
`;
