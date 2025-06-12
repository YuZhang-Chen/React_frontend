// 認證相關的 axios 工具函數
import axios from './axios';

// 儲存登出回調函數和 Modal 顯示函數
let logoutCallback = null;
let showTokenExpiredModal = null;

/**
 * 設定登出回調函數
 * @param {function} callback - 登出回調函數
 */
export const setLogoutCallback = (callback) => {
    logoutCallback = callback;
};

/**
 * 設定 Token 過期 Modal 顯示函數
 * @param {function} callback - Modal 顯示函數
 */
export const setTokenExpiredModalCallback = (callback) => {
    showTokenExpiredModal = callback;
};

/**
 * 執行登出操作
 */
const performLogout = () => {
    if (logoutCallback) {
        logoutCallback();
    }
};

/**
 * 創建帶有認證 token 的 axios 實例
 * @param {string} token - JWT token
 * @returns {object} - 配置好認證的 axios 實例
 */
export const createAuthAxios = (token) => {
    const authAxios = axios.create({
        baseURL: axios.defaults.baseURL,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    // 添加請求攔截器用於除錯
    authAxios.interceptors.request.use(
        (config) => {
            // console.log('=== AuthAxios 請求攔截器 ===');
            // console.log('URL:', config.url);
            // console.log('Method:', config.method);
            // console.log('Headers:', config.headers);
            // console.log('Data:', config.data);
            // console.log('Data Type:', typeof config.data);
            
            if (config.data && typeof config.data === 'string') {
                // console.log('解析 URL 參數:');
                try {
                    const params = new URLSearchParams(config.data);
                    for (const [key, value] of params.entries()) {
                        // console.log(`  ${key}: "${value}" (${typeof value})`);
                    }
                } catch (e) {
                    console.log('無法解析 URL 參數:', e);
                }
            }
            // console.log('============================');
            
            return config;
        },
        (error) => {
            console.error('請求攔截器錯誤:', error);
            return Promise.reject(error);
        }
    );// 添加回應攔截器來處理 token 過期和自動更新 token
    authAxios.interceptors.response.use(
        (response) => {
            // 檢查回應中是否包含新的 token，如果有則自動更新
            if (response.data && response.data.token) {
                // console.log('檢測到新的 token，自動更新');
                localStorage.setItem('jwtToken', response.data.token);
            } else if (response.token) {
                // console.log('檢測到新的 token，自動更新');
                localStorage.setItem('jwtToken', response.token);
            }
            return response;
        },
        (error) => {            // 檢查是否為認證錯誤 (401 Unauthorized)
            if (error.response && error.response.status === 401) {
                // 檢查錯誤訊息是否為 token 過期相關
                const errorMessage = error.response.data?.message || '';
                if (errorMessage.includes('token') || 
                    errorMessage.includes('expired') || 
                    errorMessage.includes('unauthorized') ||
                    errorMessage.includes('invalid')) {
                    
                    // console.log('Token 已過期，自動登出');
                    performLogout();
                    
                    // 顯示優雅的過期提示 Modal
                    if (showTokenExpiredModal) {
                        showTokenExpiredModal();
                    } else {
                        // 備用方案：使用 alert
                        alert('登錄已過期，請重新登錄');
                        window.location.href = '/login';
                    }
                }
            }
            return Promise.reject(error);
        }
    );

    return authAxios;
};

/**
 * 從 localStorage 獲取 jwtToken 並創建認證 axios 實例
 * @returns {object|null} - 配置好認證的 axios 實例，如果沒有 token 則返回 null
 */
export const getAuthAxios = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        return null;
    }
    return createAuthAxios(token);
};

/**
 * 檢查是否有有效的認證 jwtToken
 * @returns {boolean} - 是否有 token
 */
export const hasAuthToken = () => {
    return !!localStorage.getItem('jwtToken');
};

/**
 * 檢查 token 是否已過期（通過解析 JWT）
 * @returns {boolean} - token 是否已過期
 */
export const isTokenExpired = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return true;

    try {
        // 解析 JWT token 的 payload
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        
        const payload = JSON.parse(jsonPayload);
        const currentTime = Math.floor(Date.now() / 1000);
        
        // 檢查是否有過期時間並且已過期
        return payload.exp && payload.exp < currentTime;
    } catch (error) {
        console.error('解析 token 失敗:', error);
        return true; // 如果解析失敗，視為已過期
    }
};

/**
 * 手動更新 jwtToken（如果需要的話）
 * @param {string} newToken - 新的 JWT token
 */
export const updateToken = (newToken) => {
    if (newToken) {
        console.log('手動更新 jwtToken');
        localStorage.setItem('jwtToken', newToken);
    }
};

/**
 * 從回應中提取並更新 token
 * @param {object} response - API 回應物件
 */
export const extractAndUpdateToken = (response) => {
    if (response?.data?.token) {
        updateToken(response.data.token);
        return response.data.token;
    } else if (response?.token) {
        updateToken(response.token);
        return response.token;
    }
    return null;
};

export default createAuthAxios;
