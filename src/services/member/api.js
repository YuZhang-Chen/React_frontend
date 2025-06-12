// API 服務：會員相關
import { getAuthAxios } from "../../utils/authAxios";
import { handleApiResponse } from "../../utils/tokenManager";
import { testQsOptions, simulateBackendParsing } from "../../utils/networkDebugger";
import Qs from 'qs';

const createMember = async (data) => {
    const authAxios = getAuthAxios();
    if (!authAxios) {
        throw new Error('未找到認證 token');
    }
    
    console.log('===== CreateMember 除錯資訊 =====');
    console.log('原始資料:', data);
    
    // 測試不同的 Qs.stringify 選項
    testQsOptions(data);
    
    // 使用預設選項
    const stringifiedData = Qs.stringify(data);
    console.log('使用的序列化資料:', stringifiedData);
    
    // 模擬後端解析
    simulateBackendParsing(stringifiedData);
    
    console.log('請求 URL:', '?action=newMember');
    console.log('Authorization Header:', localStorage.getItem('jwtToken') ? '已設定' : '未設定');
    console.log('Content-Type:', 'application/x-www-form-urlencoded');
    console.log('================================');
    
    return handleApiResponse(authAxios.post("?action=newMember", stringifiedData));
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