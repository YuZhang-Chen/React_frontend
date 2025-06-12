// LoginPage 組件 - 風格登入頁面 (Styled Components版)
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { login as apiLogin, getUserData } from '../../services/login/api';
import Header from '../../components/layout/Header';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {
  LoginPageContainer,
  LoginMain,
  LoginSection,
  LoginCard,
  LoginBrand,
  BrandLogo,
  BrandIcon,
  BrandText,
  BrandDescription,
  LoginForm,
  LoginTitle,
  LoginSubtitle,
  FormGroup,
  FormLabel,
  FormInput,
  LoginButton,
  ErrorAlert,
  LoginFooter,
  LoginLink,
  FloatingElement
} from './LoginPage.styled';

function LoginPage() {
  const [mId, setMId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // 步驟1：呼叫登入 API
      const loginResponse = await apiLogin({ mId, password });
      
      if (loginResponse.status === 200 && loginResponse.token) {
        const token = loginResponse.token;
        
        try {
          // 步驟2：獲取使用者詳細資訊
          const userResponse = await getUserData(mId, token);
          
          if (userResponse.status === 200 && userResponse.result.length > 0) {
            const userData = userResponse.result[0];
            
            // 判斷角色：admin 或 customer
            const role = mId === 'admin' ? 'admin' : 'customer';
            
            const user = {
              mId: userData.mId,
              name: userData.name,
              email: userData.email,
              role: role
            };
            
            // 使用 AuthContext 的 login 方法
            login(token, user);

            // 根據角色導向不同頁面
            if (role === 'admin') {
              navigate('/manager');
            } else {
              navigate('/');
            }
          } else {
            setError('無法獲取使用者資訊，請稍後再試');
          }
        } catch (userError) {
          console.error('獲取使用者資訊失敗:', userError);
          setError('獲取使用者資訊失敗，請稍後再試');
        }
      } else {
        setError(loginResponse.message || '登入失敗，請檢查帳號密碼');
      }
    } catch (error) {
      console.error('登入失敗:', error);
      setError('登入失敗，請檢查網路連線或稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <Header />
      
      <LoginMain>
        {/* 浮動裝飾元素 */}
        <FloatingElement className="element-1">
          <i className="bi bi-cup-straw"></i>
        </FloatingElement>
        <FloatingElement className="element-2">
          <i className="bi bi-cup-hot"></i>
        </FloatingElement>
        <FloatingElement className="element-3">
          <i className="bi bi-cup"></i>
        </FloatingElement>
        <FloatingElement className="element-4">
          <i className="bi bi-heart"></i>
        </FloatingElement>

        <LoginSection>
          <Container>
            <Row className="justify-content-center">
              <Col xl={10} lg={11}>
                <LoginCard>
                  <Row className="g-0">
                    {/* 品牌展示區 */}
                    <Col lg={5}>
                      <LoginBrand>
                        <BrandLogo>
                          <BrandIcon>
                            <i className="bi bi-cup-straw"></i>
                          </BrandIcon>
                          <BrandText>
                            <div className="brand-name">章魚燒</div>
                            <div className="brand-subtitle">Takoyaki</div>
                          </BrandText>
                        </BrandLogo>
                        <BrandDescription>
                          用心調製每一杯飲品，
                          為您帶來最純粹的茶飲體驗。
                          歡迎回到章魚燒的溫暖世界。
                        </BrandDescription>
                      </LoginBrand>
                    </Col>
                    
                    {/* 登入表單區 */}
                    <Col lg={7}>
                      <LoginForm>
                        <LoginTitle>會員登入</LoginTitle>
                        <LoginSubtitle>
                          歡迎回來！請登入您的帳戶
                        </LoginSubtitle>
                        
                        {error && (
                          <ErrorAlert variant="danger">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                          </ErrorAlert>
                        )}
                        
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <FormLabel htmlFor="mId">
                              <i className="bi bi-person me-2"></i>
                              會員帳號
                            </FormLabel>
                            <FormInput
                              type="text"
                              id="mId"
                              placeholder="請輸入會員帳號"
                              value={mId}
                              onChange={(e) => setMId(e.target.value)}
                              required
                            />
                          </FormGroup>
                          
                          <FormGroup>
                            <FormLabel htmlFor="password">
                              <i className="bi bi-lock me-2"></i>
                              密碼
                            </FormLabel>
                            <FormInput
                              type="password"
                              id="password"
                              placeholder="請輸入密碼"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </FormGroup>
                          
                          <LoginButton
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <i className="bi bi-arrow-clockwise"></i>
                                登入中...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-box-arrow-in-right"></i>
                                登入
                              </>
                            )}
                          </LoginButton>
                        </Form>
                          <LoginFooter>
                          還沒有帳號？{' '}
                          <LoginLink as={Link} to="/register">
                            立即註冊
                          </LoginLink>
                          {' '}｜{' '}
                          <LoginLink href="/forgot-password">
                            忘記密碼？
                          </LoginLink>
                        </LoginFooter>
                      </LoginForm>
                    </Col>
                  </Row>
                </LoginCard>
              </Col>
            </Row>
          </Container>
        </LoginSection>
      </LoginMain>
      
      {/* <Footer /> */}
    </LoginPageContainer>
  );
}

export default LoginPage;
