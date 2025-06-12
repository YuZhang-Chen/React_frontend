// API 服務：產品相關
import { getAuthAxios } from "../../utils/authAxios";
import { handleApiResponse, checkAndSaveToken } from "../../utils/tokenManager";
import axios from '../../utils/axios';
import Qs from 'qs';

const createProduct = async (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post("?action=newProduct", Qs.stringify(data)));
}

// 獲取所有產品（公開 API，不需要認證）
const getProducts = async () => {
    const response = await axios.get('?action=getProducts');
    checkAndSaveToken(response); // 即使是公開 API 也檢查 token
    return response;
}

// 獲取單一產品（支援認證和非認證）
const getProduct = async (data) => {
    // 如果有認證 token，使用認證 API
    const authAxios = getAuthAxios();
    if (authAxios) {
        return handleApiResponse(authAxios.post(`?action=getProducts`, Qs.stringify(data)));
    }
    // 否則使用公開 API
    const response = await axios.post('?action=getProducts', data);
    checkAndSaveToken(response);
    return response;
}

const updateProduct = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post("?action=updateProduct", Qs.stringify(data)));
}

const deleteProduct = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post("?action=removeProduct", Qs.stringify(data)));
}

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
