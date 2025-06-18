// ManagerPage 組件 - 迷客夏風格管理頁面 (Styled Components版)
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MemberTable from '../../services/member/MemberTable';
import ProductTable from '../../services/product/ProductTable';
import OrderTable from '../../services/order/OrderTable';
import { Request } from '../../utils/axios';
import {
    ManagerPageContainer,
    ManagerMain,
    ManagerSection,
    PageHeader,
    DashboardCard,
    StatIcon,
    StatNumber,
    StatLabel,
    StyledTabs,
    StyledTab,
    TabContent,
    ErrorAlert,
    LoadingContainer,
    ManageButton,
    QuickActions,
} from './ManagerPage.styled';

export default function ManagerPage() {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for dashboard data
    const [dashboardData, setDashboardData] = useState({
        memberCount: 0,
        productCount: 0,
        orderCount: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDashboardData();
    }, []);    
    
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const res = await Request().get('?action=getDashboard');  
            const response = res.data.result;

            setDashboardData(response);
            setError('');
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('載入儀表板資料失敗');
        } finally {
            setLoading(false);
        }
    };

    const DashboardContent = () => (    
        <Container fluid>
            <PageHeader>
                <h2>
                    <i className="bi bi-speedometer2"></i>
                    管理後台
                </h2>
                <p>歡迎回來，{user?.name || user?.mId}！這裡是您的管理控制中心</p>
            </PageHeader>

            {error && (
                <ErrorAlert variant="danger">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    {error}
                </ErrorAlert>
            )}

            {loading ? (
                <LoadingContainer>
                    <Spinner animation="border" role="status" />
                    <p>載入資料中...</p>
                </LoadingContainer>
            ) : (
                <>
                    {/* 統計卡片 */}
                    <Row className="mb-4">
                        <Col md={6} lg={3} className="mb-3">
                            <DashboardCard className="members">
                                <DashboardCard.Body>
                                    <StatIcon>
                                        <i className="bi bi-people-fill"></i>
                                    </StatIcon>
                                    <StatNumber>{dashboardData.memberCount}</StatNumber>
                                    <StatLabel>總會員數</StatLabel>
                                </DashboardCard.Body>
                            </DashboardCard>
                        </Col>
                        <Col md={6} lg={3} className="mb-3">
                            <DashboardCard className="products">
                                <DashboardCard.Body>
                                    <StatIcon>
                                        <i className="bi bi-cup-hot-fill"></i>
                                    </StatIcon>
                                    <StatNumber>{dashboardData.productCount}</StatNumber>
                                    <StatLabel>商品總數</StatLabel>
                                </DashboardCard.Body>
                            </DashboardCard>
                        </Col>
                        <Col md={6} lg={3} className="mb-3">
                            <DashboardCard className="orders">
                                <DashboardCard.Body>
                                    <StatIcon>
                                        <i className="bi bi-bag-check-fill"></i>
                                    </StatIcon>
                                    <StatNumber>{dashboardData.orderCount}</StatNumber>
                                    <StatLabel>訂單總數</StatLabel>
                                </DashboardCard.Body>
                            </DashboardCard>
                        </Col>
                        <Col md={6} lg={3} className="mb-3">
                            <DashboardCard className="revenue">
                                <DashboardCard.Body>
                                    <StatIcon>
                                        <i className="bi bi-currency-dollar"></i>
                                    </StatIcon>
                                    <StatNumber>NT$ {dashboardData.totalRevenue?.toLocaleString() || '0'}</StatNumber>
                                    <StatLabel>總營收</StatLabel>
                                </DashboardCard.Body>
                            </DashboardCard>
                        </Col>
                    </Row>

                    {/* 快速操作 */}
                    <Row>
                        <Col lg={8} className="mb-4">
                            <QuickActions>
                                <h4>
                                    <i className="bi bi-lightning-charge"></i>
                                    快速操作
                                </h4>
                                <div className="actions-grid">
                                    <ManageButton onClick={() => setActiveTab('members')}>
                                        <i className="bi bi-person-plus"></i>
                                        管理會員
                                    </ManageButton>
                                    <ManageButton onClick={() => setActiveTab('products')}>
                                        <i className="bi bi-plus-circle"></i>
                                        新增商品
                                    </ManageButton>
                                    <ManageButton onClick={() => setActiveTab('orders')}>
                                        <i className="bi bi-list-check"></i>
                                        查看訂單
                                    </ManageButton>
                                    <ManageButton onClick={fetchDashboardData}>
                                        <i className="bi bi-arrow-clockwise"></i>
                                        重新整理
                                    </ManageButton>
                                </div>
                            </QuickActions>
                        </Col>
                        
                    </Row>
                </>
            )}
        </Container>
    );

    return (
        <ManagerPageContainer>
            <Header />
            <ManagerMain>
                <ManagerSection>
                    <Container fluid>
                        <StyledTabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                            className="mb-4"
                        >
                            <StyledTab 
                                eventKey="dashboard" 
                                title={
                                    <>
                                        <i className="bi bi-speedometer2"></i>
                                        儀表板
                                    </>
                                }
                            >
                                <DashboardContent />
                            </StyledTab>

                            <StyledTab 
                                eventKey="members" 
                                title={
                                    <>
                                        <i className="bi bi-people"></i>
                                        會員管理
                                    </>
                                }
                            >
                                <TabContent>
                                    <MemberTable />
                                </TabContent>
                            </StyledTab>

                            <StyledTab 
                                eventKey="products" 
                                title={
                                    <>
                                        <i className="bi bi-cup-hot"></i>
                                        商品管理
                                    </>
                                }
                            >
                                <TabContent>
                                    <ProductTable />
                                </TabContent>
                            </StyledTab>

                            <StyledTab 
                                eventKey="orders" 
                                title={
                                    <>
                                        <i className="bi bi-bag-check"></i>
                                        訂單管理
                                    </>
                                }
                            >
                                <TabContent>
                                    <OrderTable />
                                </TabContent>
                            </StyledTab>
                        </StyledTabs>
                    </Container>
                </ManagerSection>
            </ManagerMain>
            <Footer />
        </ManagerPageContainer>
    );
}
