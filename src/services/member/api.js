// API 服務：會員相關
import { getAuthAxios } from "../../utils/authAxios";
import { handleApiResponse, checkAndSaveToken } from "../../utils/tokenManager";
import Qs from 'qs';
import axios from '../../utils/axios';

const createMember = async (data) => {
    const response = await axios.post("?action=newMember", Qs.stringify(data),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
    checkAndSaveToken(response);
    return response;
}

const getMembers = () => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.get(`?action=getMembers`));
}

const getMember = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post(`?action=getMembers`, Qs.stringify(data)));
}

const updateMember = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post("?action=updateMember", Qs.stringify(data)));
}

const deleteMember = (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    return handleApiResponse(authAxios.post("?action=removeMember", Qs.stringify(data)));
}

export { createMember, getMembers, getMember, updateMember, deleteMember };