import { createContext, useState, useEffect, useContext } from 'react';
import { setLogoutCallback, setTokenExpiredModalCallback, isTokenExpired } from '../utils/authAxios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);

  // 登出函數
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  // 顯示 Token 過期 Modal
  const showTokenExpired = () => {
    setShowTokenExpiredModal(true);
  };

  // 隱藏 Token 過期 Modal
  const hideTokenExpired = () => {
    setShowTokenExpiredModal(false);
  };

  // 檢查 token 過期的函數
  const checkTokenExpiration = () => {
    if (isAuthenticated && isTokenExpired()) {
      console.log('Token 已過期，執行自動登出');
      logout();
      showTokenExpired();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      // 檢查 token 是否已過期
      if (isTokenExpired()) {
        console.log('Token 已過期，清除登錄狀態');
        logout();
        showTokenExpired();
      } else {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    }

    // 設定 authAxios 的回調函數
    setLogoutCallback(logout);
    setTokenExpiredModalCallback(showTokenExpired);

    // 設定定期檢查 token 過期（每分鐘檢查一次）
    const tokenCheckInterval = setInterval(checkTokenExpiration, 60000);

    // 清除定時器
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [isAuthenticated]);

  const login = (token, userData) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      showTokenExpiredModal,
      hideTokenExpired
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}