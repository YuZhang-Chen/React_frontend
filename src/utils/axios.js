import axios from 'axios';

// 創建 axios 實例
const instance = axios.create({
  baseURL: 'http://localhost/MVC_system/final_project/backend/public/index.php',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 全局回調函數
let logoutCallback = null;
let tokenExpiredModalCallback = null;

// 設置回調函數
export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

export const setTokenExpiredModalCallback = (callback) => {
  tokenExpiredModalCallback = callback;
};

// 請求攔截器 - 自動添加 token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 響應攔截器 - 處理錯誤和自動更新 token
instance.interceptors.response.use(
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
  (error) => {
    if (error.response?.status === 401) {
      // Token 過期或無效
      // console.log('檢測到 401 錯誤，token 已過期或無效');
      
      // 清除本地存儲
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userData');
      
      // 觸發登出和顯示過期提示
      if (logoutCallback) {
        logoutCallback();
      }
      if (tokenExpiredModalCallback) {
        tokenExpiredModalCallback();
      }
      
      // 如果沒有設置回調，則直接跳轉到登入頁
      if (!logoutCallback && !tokenExpiredModalCallback) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

// 保留原有的 Request 函數以確保向後兼容
export function Request() {
  return instance;
}