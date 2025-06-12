// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/layout/Header';
import PrivateRoute from './components/PrivateRoute';
import RedirectIfAuthenticated from './components/RedirectIfAuth';
import TokenExpiredModal from './components/TokenExpiredModal';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ManagerPage from './pages/ManagePage/ManagerPage';
import CartPage from './pages/CartPage/CartPage';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import About from './pages/About/About';
import TestPage from './pages/TestPage/TestPage';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// 內部應用組件，用於訪問 Auth 上下文
function AppContent() {
  const { showTokenExpiredModal, hideTokenExpired } = useAuth();

  return (
    <div className="App">
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <LoginPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuthenticated>
                <RegisterPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/manager"
            element={
              <PrivateRoute requiredRole="admin">
                <ManagerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          {/* 開發測試頁面 */}
          {process.env.NODE_ENV === 'development' && (
            <Route path="/test" element={<TestPage />} />
          )}
        </Routes>
      </main>
      
      {/* Token 過期提示 Modal */}
      <TokenExpiredModal 
        show={showTokenExpiredModal} 
        onHide={hideTokenExpired} 
      />
      
      {/* Toast 通知容器 */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
