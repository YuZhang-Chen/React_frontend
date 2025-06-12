// API 服務：登入相關
import axios from '../../utils/axios';
import { createAuthAxios } from '../../utils/authAxios';
import { checkAndSaveToken } from '../../utils/tokenManager';

// 登入
export const login = async (credentials) => {
    try {
        const response = await axios.post('?action=doLogin', {
            mId: credentials.mId,
            password: credentials.password
        });
        
        // 自動檢查並儲存 token
        checkAndSaveToken(response);
        
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// 獲取使用者資料
export const getUserData = async (mId, token) => {
    try {
        const authAxios = createAuthAxios(token);
        const response = await authAxios.post('?action=getMembers', { mId });
        
        // 自動檢查並儲存 token
        checkAndSaveToken(response);
        
        return response.data;
    } catch (error) {
        console.error('Get user data error:', error);
        throw error;
    }
};

// 登出
export const logout = async () => {
    try {
        const response = await axios.post('?action=logout');
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// 驗證 token
export const verifyToken = async (token) => {
    try {
        const authAxios = createAuthAxios(token);
        const response = await authAxios.get('?action=verifyToken');
        
        // 自動檢查並儲存 token
        checkAndSaveToken(response);
        
        return response.data;
    } catch (error) {
        console.error('Token verification error:', error);
        throw error;
    }
};

// 註冊新使用者（如果需要）
export const register = async (userData) => {
    try {
        const response = await axios.post('/api/register', userData);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};
