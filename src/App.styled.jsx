// App.styled.jsx - 全局應用程式 Styled Components
import styled from 'styled-components';
import { theme } from './styles/theme';

// 全局應用程式容器
export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.primary};
  background-color: ${theme.colors.background.white};
  color: ${theme.colors.text.primary};
  line-height: 1.6;
`;

// 主要內容區域
export const MainWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 頁面容器
export const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 140px); /* 減去 header 高度 */
`;

// 內容區域
export const ContentArea = styled.div`
  flex: 1;
  padding-top: 140px; /* 為固定 header 留空間 */
  
  @media (max-width: 768px) {
    padding-top: 120px;
  }
`;

// 錯誤邊界容器
export const ErrorBoundaryContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gradients.light};
  text-align: center;
  padding: ${theme.spacing.xxl};
`;

export const ErrorContent = styled.div`
  max-width: 500px;
  
  h1 {
    font-size: 3rem;
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.lg};
    font-weight: ${theme.fonts.weights.bold};
  }
  
  h2 {
    font-size: 1.5rem;
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    color: ${theme.colors.gray[600]};
    margin-bottom: ${theme.spacing.xl};
  }
  
  button {
    background: ${theme.gradients.secondary};
    border: none;
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.pill};
    color: ${theme.colors.background.white};
    font-weight: ${theme.fonts.weights.semibold};
    cursor: pointer;
    transition: ${theme.transitions.default};
    
    &:hover {
      background: ${theme.gradients.primary};
      transform: translateY(-2px);
    }
  }
`;
