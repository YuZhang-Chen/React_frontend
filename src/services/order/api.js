// API 服務：訂單相關
import { getAuthAxios } from '../../utils/authAxios';
import { handleApiResponse } from '../../utils/tokenManager';
import Qs from 'qs';

// 獲取所有訂單
const getOrders = () => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.get('?action=getOrders'));
};

// 獲取單一訂單
const getOrder = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post('?action=getOrders', Qs.stringify(data)));
};

// 創建新訂單
const createOrder = async (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post('?action=newOrder', Qs.stringify(data)));
};

// 取得新訂單ID
const getOrderId = async (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post('?action=getOrderId', Qs.stringify(data)));
}


// 更新訂單
const updateOrder = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post('?action=updateOrder', Qs.stringify(data)));
};

// 刪除訂單
const deleteOrder = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post('?action=removeOrder', Qs.stringify(data)));
};

// 獲取使用者的訂單（兼容舊版本）
export const getUserOrders = async (userId) => {
    return getOrder({ mId: userId });
};

// 獲取所有訂單（兼容舊版本）
export const getAllOrders = async () => {
    return getOrders();
};


export { createOrder, getOrders, getOrder, updateOrder, deleteOrder, getOrderId };
