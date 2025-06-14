import { getAuthAxios } from '../../utils/authAxios';
import { handleApiResponse } from '../../utils/tokenManager';
import Qs from 'qs';


const getOrderDetail = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post('?action=getOrderDetail', Qs.stringify(data)));
}

const createOrderDetail = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post('?action=newOrderDetail', Qs.stringify(data)));
};


export { getOrderDetail, createOrderDetail }