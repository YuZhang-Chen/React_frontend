// 網路請求除錯工具
// 用於檢查實際發送到後端的請求內容

/**
 * 攔截並記錄所有 axios 請求
 */
export const setupRequestLogger = () => {
    // 設定請求攔截器
    const requestInterceptor = (config) => {
        console.log('=== 網路請求詳細資訊 ===');
        console.log('URL:', config.url);
        console.log('Method:', config.method);
        console.log('Headers:', config.headers);
        console.log('Data:', config.data);
        console.log('Data Type:', typeof config.data);
        
        if (config.data && typeof config.data === 'string') {
            console.log('Data as URL params:', new URLSearchParams(config.data));
        }
        
        console.log('========================');
        return config;
    };

    const responseInterceptor = (response) => {
        console.log('=== 網路回應詳細資訊 ===');
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Data:', response.data);
        console.log('========================');
        return response;
    };

    const errorInterceptor = (error) => {
        console.error('=== 網路請求錯誤 ===');
        console.error('Error:', error);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
            console.error('Response Headers:', error.response.headers);
        }
        if (error.request) {
            console.error('Request:', error.request);
        }
        console.error('===================');
        return Promise.reject(error);
    };

    return {
        requestInterceptor,
        responseInterceptor,
        errorInterceptor
    };
};

/**
 * 測試 Qs.stringify 的不同選項
 */
export const testQsOptions = (data) => {
    const Qs = require('qs');
    
    console.log('=== Qs.stringify 選項測試 ===');
    
    const tests = [
        { name: '預設', options: {} },
        { name: '不編碼', options: { encode: false } },
        { name: '編碼', options: { encode: true } },
        { name: '陣列格式', options: { arrayFormat: 'brackets' } },
        { name: '嚴格模式', options: { strictNullHandling: true } },
        { name: 'URL 編碼', options: { encodeValuesOnly: true } }
    ];

    tests.forEach(test => {
        const result = Qs.stringify(data, test.options);
        console.log(`${test.name}:`, result);
    });
    
    console.log('===========================');
};

/**
 * 模擬後端解析行為
 */
export const simulateBackendParsing = (qsString) => {
    console.log('=== 模擬後端解析 ===');
    console.log('原始字串:', qsString);
    
    try {
        // 模擬 PHP parse_str 行為
        const params = new URLSearchParams(qsString);
        const parsed = {};
        
        for (const [key, value] of params.entries()) {
            parsed[key] = value;
        }
        
        console.log('解析結果:', parsed);
        console.log('mId 存在:', 'mId' in parsed);
        console.log('mId 值:', parsed.mId);
        console.log('mId 長度:', parsed.mId ? parsed.mId.length : 0);
        
        return parsed;
    } catch (error) {
        console.error('解析錯誤:', error);
        return null;
    } finally {
        console.log('==================');
    }
};

export default {
    setupRequestLogger,
    testQsOptions,
    simulateBackendParsing
};
