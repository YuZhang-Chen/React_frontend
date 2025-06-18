import React, { useState, useLayoutEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  RegisterPageContainer, 
  RegisterMain,
  RegisterSection,
  RegisterCard, 
  RegisterBrand,
  BrandLogo,
  BrandIcon,
  BrandText,
  BrandDescription,
  RegisterForm,
  RegisterTitle,
  RegisterSubtitle,
  FormGroup,
  FormLabel,
  FormInput,
  RegisterButton,
  ErrorAlert,
  RegisterFooter,
  RegisterLink,
  FloatingElement
} from './RegisterPage.styled';
import { createMember } from '../../services/member/api';
import Header from '../../components/layout/Header';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mId: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 強制滾動到頂部 - 使用 useLayoutEffect 確保在 DOM 渲染前執行
  useLayoutEffect(() => {
    // 立即且強制滾動到頂部
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除該欄位的錯誤訊息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 用戶ID驗證
    if (!formData.mId.trim()) {
      newErrors.mId = '用戶ID為必填';
    } else if (formData.mId.length < 3) {
      newErrors.mId = '用戶ID至少需要3個字元';
    }

    // 姓名驗證
    if (!formData.name.trim()) {
      newErrors.name = '姓名為必填';
    }

    // Email驗證
    if (!formData.email.trim()) {
      newErrors.email = 'Email為必填';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '請輸入正確的Email格式';
    }

    // 確認密碼驗證
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '請確認密碼';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '密碼確認不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        mId: formData.mId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      };           
      const res = await createMember(registerData);
      const response = res.data;
      
      if (response.status === 200) {
        toast.success('註冊成功！請使用您的帳號登入');
        navigate('/login');
      }
    } catch (error) {
      console.error('註冊失敗:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error('用戶ID或Email已被使用');
      } else {
        toast.error('註冊失敗，請稍後再試');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <RegisterPageContainer>
      <Header />
      <RegisterMain>
        <RegisterSection>
          <Container>
            <RegisterCard>
              <Row className="g-0">
                {/* 品牌區域 */}
                <Col lg={5}>
                  <RegisterBrand>
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
                      開啟您的專屬茶飲之旅，享受每一口的香醇美味
                    </BrandDescription>
                  </RegisterBrand>
                </Col>

                {/* 註冊表單區域 */}
                <Col lg={7}>
                  <RegisterForm>
                    <RegisterTitle>會員註冊</RegisterTitle>
                    <RegisterSubtitle>建立您的帳戶，享受專屬服務</RegisterSubtitle>
                    
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>用戶ID *</FormLabel>
                            <FormInput
                              type="text"
                              name="mId"
                              value={formData.mId}
                              onChange={handleChange}
                              placeholder="請輸入用戶ID"
                              style={errors.mId ? { borderColor: '#f44336' } : {}}
                            />
                            {errors.mId && (
                              <ErrorAlert variant="danger" className="mt-2 py-2">
                                {errors.mId}
                              </ErrorAlert>
                            )}
                          </FormGroup>
                        </Col>
                        
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>姓名 *</FormLabel>
                            <FormInput
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="請輸入您的姓名"
                              style={errors.name ? { borderColor: '#f44336' } : {}}
                            />
                            {errors.name && (
                              <ErrorAlert variant="danger" className="mt-2 py-2">
                                {errors.name}
                              </ErrorAlert>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>電話 *</FormLabel>
                            <FormInput
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="0912345678"
                              style={errors.phone ? { borderColor: '#f44336' } : {}}
                            />
                            {errors.phone && (
                              <ErrorAlert variant="danger" className="mt-2 py-2">
                                {errors.phone}
                              </ErrorAlert>
                            )}
                          </FormGroup>
                        </Col>
                        
                        <Col md={6}>
                          <FormGroup>
                            <FormLabel>Email *</FormLabel>
                            <FormInput
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="example@email.com"
                              style={errors.email ? { borderColor: '#f44336' } : {}}
                            />
                            {errors.email && (
                              <ErrorAlert variant="danger" className="mt-2 py-2">
                                {errors.email}
                              </ErrorAlert>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <FormLabel>密碼 *</FormLabel>
                        <FormInput
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="請輸入密碼 (至少6個字元)"
                          style={errors.password ? { borderColor: '#f44336' } : {}}
                        />
                        {errors.password && (
                          <ErrorAlert variant="danger" className="mt-2 py-2">
                            {errors.password}
                          </ErrorAlert>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>確認密碼 *</FormLabel>
                        <FormInput
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="請再次輸入密碼"
                          style={errors.confirmPassword ? { borderColor: '#f44336' } : {}}
                        />
                        {errors.confirmPassword && (
                          <ErrorAlert variant="danger" className="mt-2 py-2">
                            {errors.confirmPassword}
                          </ErrorAlert>
                        )}
                      </FormGroup>

                      <RegisterButton 
                        type="submit"
                        disabled={isLoading}
                      >
                        <i className="fas fa-user-plus"></i>
                        {isLoading ? '註冊中...' : '立即註冊'}
                      </RegisterButton>
                    </form>

                    <RegisterFooter>
                      已有帳號？ <RegisterLink href="/login">立即登入</RegisterLink>
                    </RegisterFooter>
                  </RegisterForm>
                </Col>
              </Row>
            </RegisterCard>
          </Container>
        </RegisterSection>

        {/* 浮動裝飾元素 */}
        <FloatingElement className="element-1">
          <i className="fas fa-coffee"></i>
        </FloatingElement>
        <FloatingElement className="element-2">
          <i className="fas fa-leaf"></i>
        </FloatingElement>
        <FloatingElement className="element-3">
          <i className="fas fa-heart"></i>
        </FloatingElement>
        <FloatingElement className="element-4">
          <i className="fas fa-star"></i>
        </FloatingElement>
      </RegisterMain>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
