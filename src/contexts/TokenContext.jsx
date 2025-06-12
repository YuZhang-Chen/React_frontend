import { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [showTokenExpiredModal, setShowTokenExpiredModal] = useState(false);

  const showTokenExpired = () => {
    setShowTokenExpiredModal(true);
  };

  const hideTokenExpired = () => {
    setShowTokenExpiredModal(false);
  };

  return (
    <TokenContext.Provider value={{
      showTokenExpiredModal,
      showTokenExpired,
      hideTokenExpired
    }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};

export default TokenContext;
