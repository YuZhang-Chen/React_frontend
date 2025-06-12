import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const CartProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    // 生成唯一的購物車鍵名（基於用戶ID）
    const getCartKey = () => {
        if (isAuthenticated && user) {
            return `cart_${user.mId || user.id}`;
        }
        return 'cart_guest';
    };

    // 從 localStorage 載入購物車
    useEffect(() => {
        if (isAuthenticated) {
            const savedCart = localStorage.getItem(getCartKey());
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (error) {
                    console.error('載入購物車失敗:', error);
                    setCartItems([]);
                }
            }
        } else {
            // 未登入時清空購物車
            setCartItems([]);
        }
    }, [isAuthenticated, user]);

    // 儲存購物車到 localStorage
    useEffect(() => {
        if (isAuthenticated && cartItems.length >= 0) {
            localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    // 添加商品到購物車
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.pId === product.pId);
            
            if (existingItem) {
                // 如果商品已存在，增加數量
                return prevItems.map(item =>
                    item.pId === product.pId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // 如果商品不存在，添加新商品
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // 更新商品數量
    const updateQuantity = (pId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(pId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.pId === pId ? { ...item, quantity } : item
            )
        );
    };

    // 從購物車移除商品
    const removeFromCart = (pId) => {
        setCartItems(prevItems => prevItems.filter(item => item.pId !== pId));
    };

    // 清空購物車
    const clearCart = () => {
        setCartItems([]);
        if (isAuthenticated) {
            localStorage.removeItem(getCartKey());
        }
    };

    // 計算總金額
    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);
    };

    // 計算總商品數量
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalAmount,
        getTotalItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
export { CartProvider };
