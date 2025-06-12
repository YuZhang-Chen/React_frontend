import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getOrders } from '../../services/order/api';
import { getMembers, createMember } from '../../services/member/api';
import { getAuthAxios } from '../../utils/authAxios';
import { handleApiResponse } from '../../utils/tokenManager';
import Qs from 'qs';

const TestPage = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (test, result, success) => {
    setTestResults(prev => [...prev, { test, result, success, timestamp: new Date().toLocaleTimeString() }]);
  };
  const runAllTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    // 測試 1: 獲取所有訂單
    try {
      const ordersResponse = await getOrders();
      addTestResult('獲取所有訂單', `成功獲取 ${ordersResponse.data?.result?.length || 0} 筆訂單`, true);
    } catch (error) {
      addTestResult('獲取所有訂單', `失敗: ${error.message}`, false);
    }

    // 測試 2: 獲取訂單詳情
    try {      const authAxios = getAuthAxios();
      if (!authAxios) {
        throw new Error('未找到認證 token');
      }
      await handleApiResponse(
        authAxios.post('?action=getOrderDetail', Qs.stringify({ oId: 5 }))
      );
      addTestResult('獲取訂單詳情', `成功獲取訂單 #5 詳情`, true);
    } catch (error) {
      addTestResult('獲取訂單詳情', `失敗: ${error.message}`, false);
    }

    // 測試 3: 獲取會員列表
    try {
      const membersResponse = await getMembers();
      addTestResult('獲取會員列表', `成功獲取 ${membersResponse.data?.result?.length || 0} 位會員`, true);
    } catch (error) {
      addTestResult('獲取會員列表', `失敗: ${error.message}`, false);
    }

    setIsLoading(false);
  };

  const testRegistration = async () => {
    const testData = {
      mId: `test_${Date.now()}`,
      name: '測試用戶',
      phone: '0912345678',
      email: `test${Date.now()}@test.com`,
      password: 'test123'
    };    try {
      await createMember(testData);
      addTestResult('註冊測試', `成功註冊測試用戶: ${testData.mId}`, true);
      toast.success('註冊測試成功！');
    } catch (error) {
      addTestResult('註冊測試', `失敗: ${error.message}`, false);
      toast.error('註冊測試失敗！');
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="mb-4">🧪 系統功能測試頁面</h2>
          
          <div className="mb-4">
            <Button 
              variant="primary" 
              onClick={runAllTests} 
              disabled={isLoading}
              className="me-3"
            >
              {isLoading ? '測試中...' : '執行全部測試'}
            </Button>
            
            <Button 
              variant="success" 
              onClick={testRegistration}
              disabled={isLoading}
            >
              測試註冊功能
            </Button>
          </div>

          {testResults.length > 0 && (
            <div>
              <h5>測試結果:</h5>
              {testResults.map((result, index) => (
                <Alert 
                  key={index} 
                  variant={result.success ? 'success' : 'danger'}
                  className="mb-2"
                >
                  <strong>[{result.timestamp}] {result.test}:</strong> {result.result}
                </Alert>
              ))}
            </div>
          )}

          <div className="mt-5">
            <h5>📋 測試項目說明:</h5>
            <ul>
              <li><strong>獲取所有訂單</strong>: 測試訂單列表 API</li>
              <li><strong>獲取訂單詳情</strong>: 測試訂單詳情 API</li>
              <li><strong>獲取會員列表</strong>: 測試會員查詢 API</li>
              <li><strong>註冊測試</strong>: 測試會員註冊功能</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TestPage;
