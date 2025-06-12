// ManagerPage.styled.jsx 
import styled from 'styled-components';
import { Card, Tab, Tabs, Alert } from 'react-bootstrap';
import { theme } from '../../styles/theme';


export const ManagerPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ManagerMain = styled.main`
  flex: 1;
  padding-top: 140px;
  background: ${theme.gradients.light};

  ${theme.mediaQueries.xs} {
    padding-top: 120px;
  }
`;

export const ManagerSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
`;


export const PageHeader = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  h2 {
    font-size: 2.2rem;
    font-weight: ${theme.fonts.weights.bold};
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    font-family: ${theme.fonts.primary};

    i {
      margin-right: ${theme.spacing.sm};
    }
  }

  p {
    color: ${theme.colors.gray[600]};
    margin: 0;
    font-size: 1.1rem;
  }

  ${theme.mediaQueries.xs} {
    padding: ${theme.spacing.lg};
    
    h2 {
      font-size: 1.8rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

// ?嚙質”??嚙踝蕭?
export const DashboardCard = styled(Card)`
  border: none;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  height: 100%;
  transition: ${theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  .card-body {
    padding: ${theme.spacing.xl};
    background: ${theme.gradients.hero};
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &.members .card-body {
    background: ${theme.gradients.primary};
    color: ${theme.colors.white};
  }

  &.products .card-body {
    background: ${theme.gradients.secondary};
    color: ${theme.colors.white};
  }

  &.orders .card-body {
    background: linear-gradient(135deg, ${theme.colors.green} 0%, ${theme.colors.accent} 100%);
    color: ${theme.colors.white};
  }

  &.revenue .card-body {
    background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.primary} 100%);
    color: ${theme.colors.white};
  }
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: ${theme.spacing.md};
  position: relative;
  z-index: 2;

  ${theme.mediaQueries.xs} {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
`;

export const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: ${theme.fonts.weights.bold};
  margin-bottom: ${theme.spacing.xs};
  position: relative;
  z-index: 2;

  ${theme.mediaQueries.xs} {
    font-size: 2rem;
  }
`;

export const StatLabel = styled.p`
  margin: 0;
  opacity: 0.9;
  font-weight: ${theme.fonts.weights.medium};
  position: relative;
  z-index: 2;
`;

// 璅惜?嚙賣見嚙?
export const StyledTabs = styled(Tabs)`
  .nav-tabs {
    border-bottom: 3px solid ${theme.colors.gray[200]};
    margin-bottom: ${theme.spacing.xl};
  }

  .nav-link {
    border: none;
    border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
    color: ${theme.colors.gray[600]};
    font-weight: ${theme.fonts.weights.medium};
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    margin-right: ${theme.spacing.sm};
    background: ${theme.colors.white};
    box-shadow: ${theme.shadows.sm};
    transition: ${theme.transitions.normal};

    &:hover {
      background: ${theme.colors.cream};
      color: ${theme.colors.primary};
      transform: translateY(-2px);
    }

    &.active {
      background: ${theme.gradients.secondary};
      color: ${theme.colors.white};
      border-bottom-color: transparent;
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }

    i {
      margin-right: ${theme.spacing.sm};
    }
  }

  ${theme.mediaQueries.xs} {
    .nav-link {
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: 0.9rem;
    }
  }
`;

export const StyledTab = styled(Tab)`
  .tab-pane {
    padding: ${theme.spacing.xl} 0;
  }
`;

// ?嚙賢捆摰孵
export const TabContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  min-height: 500px;

  ${theme.mediaQueries.xs} {
    padding: ${theme.spacing.lg};
  }
`;

// ?嚙質炊霅佗蕭?
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

  i {
    margin-right: ${theme.spacing.sm};
  }
`;

// 頛?嚙??
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxxl};
  text-align: center;

  .spinner-border {
    width: 3rem;
    height: 3rem;
    border-color: ${theme.colors.primary};
    border-right-color: transparent;
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    color: ${theme.colors.gray[600]};
    font-size: 1.1rem;
    margin: 0;
  }
`;

// 蝞∴蕭??嚙踝蕭?
export const ManageButton = styled.button`
  background: ${theme.gradients.secondary};
  border: none;
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fonts.weights.medium};
  transition: ${theme.transitions.normal};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.gradients.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  &:active {
    transform: translateY(-1px);
  }

  i {
    font-size: 1.1rem;
  }
`;

// 敹恍蕭?雿蕭???
export const QuickActions = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  h4 {
    color: ${theme.colors.dark};
    font-weight: ${theme.fonts.weights.semibold};
    margin-bottom: ${theme.spacing.lg};
    
    i {
      color: ${theme.colors.primary};
      margin-right: ${theme.spacing.sm};
    }
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing.lg};
  }

  ${theme.mediaQueries.xs} {
    padding: ${theme.spacing.lg};
    
    .actions-grid {
      grid-template-columns: 1fr;
      gap: ${theme.spacing.md};
    }
  }
`;

// 餈蕭?瘣鳴蕭??嚙??
export const RecentActivity = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.xl};

  h4 {
    color: ${theme.colors.dark};
    font-weight: ${theme.fonts.weights.semibold};
    margin-bottom: ${theme.spacing.lg};
    
    i {
      color: ${theme.colors.primary};
      margin-right: ${theme.spacing.sm};
    }
  }

  .activity-item {
    padding: ${theme.spacing.md};
    border-left: 3px solid ${theme.colors.accent};
    background: ${theme.colors.cream};
    border-radius: 0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0;
    margin-bottom: ${theme.spacing.md};

    &:last-child {
      margin-bottom: 0;
    }

    .activity-time {
      font-size: 0.9rem;
      color: ${theme.colors.gray[500]};
    }

    .activity-text {
      color: ${theme.colors.dark};
      margin: 0;
    }
  }

  ${theme.mediaQueries.xs} {
    padding: ${theme.spacing.lg};
  }
`;
