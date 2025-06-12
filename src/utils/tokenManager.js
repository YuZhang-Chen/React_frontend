// 統一的 JWT Token 管理工具
// 自動處理 token 的儲存和更新

/**
 * 檢查並儲存回應中的 token
 * @param {object} response - API 回應物件或資料
 */
export const checkAndSaveToken = (response) => {
    let tokenFound = false;
    
    // 檢查 response.data.token
    if (response?.data?.token) {
        localStorage.setItem("jwtToken", response.data.token);
        // console.log('🔄 Token 已自動更新 (from response.data.token)');
        tokenFound = true;
    }
    // 檢查 response.token
    else if (response?.token) {
        localStorage.setItem("jwtToken", response.token);
        // console.log('🔄 Token 已自動更新 (from response.token)');
        tokenFound = true;
    }
    // 檢查 response.data 中的其他可能位置
    else if (response?.data?.result?.token) {
        localStorage.setItem("jwtToken", response.data.result.token);
        // console.log('🔄 Token 已自動更新 (from response.data.result.token)');
        tokenFound = true;
    }
    
    return tokenFound;
};

/**
 * 自動處理 API 請求回應，檢查並更新 token
 * @param {Promise} apiCall - API 請求的 Promise
 * @returns {Promise} - 處理後的 Promise
 */
export const handleApiResponse = async (apiCall) => {
    try {
        const response = await apiCall;
        checkAndSaveToken(response);
        return response;
    } catch (error) {
        // 如果是 401 錯誤，token 可能已過期
        if (error.response?.status === 401) {
            console.warn('⚠️ API 請求返回 401，token 可能已過期');
        }
        throw error;
    }
};

/**
 * 包裝 API 呼叫，自動處理 token 更新
 * @param {function} apiFunction - API 函數
 * @returns {function} - 包裝後的函數
 */
export const withTokenUpdate = (apiFunction) => {
    return async (...args) => {
        const response = await apiFunction(...args);
        checkAndSaveToken(response);
        return response;
    };
};

/**
 * 為成功回調添加 token 更新檢查
 * @param {function} onSuccess - 原始成功回調
 * @returns {function} - 包裝後的成功回調
 */
export const wrapSuccessCallback = (onSuccess) => {
    return (response) => {
        checkAndSaveToken(response);
        if (onSuccess) {
            onSuccess(response);
        }
    };
};

// 默認導出
export default {
    checkAndSaveToken,
    handleApiResponse,
    withTokenUpdate,
    wrapSuccessCallback
};
