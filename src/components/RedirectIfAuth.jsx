import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  
  if (isAuthenticated) {
    // 根據使用者角色導向不同頁面
    return user?.role === 'admin' ? <Navigate to="/manager" replace /> : <Navigate to="/" replace />;
  }
  
  return children;
};

export default RedirectIfAuthenticated;