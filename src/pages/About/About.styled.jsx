// About.styled.jsx - 迷客夏關於我們頁面樣式 (Styled Components)
import styled, { keyframes } from 'styled-components';
import { Card } from 'react-bootstrap';
import { theme } from '../../styles/theme';

// 浮動動畫
const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
`;

const glow = keyframes`
    0%, 100% { box-shadow: 0 0 20px rgba(139, 88, 42, 0.1); }
    50% { box-shadow: 0 0 30px rgba(139, 88, 42, 0.2); }
`;

// 主容器
export const AboutPageContainer = styled.div`
    background: linear-gradient(135deg, 
        ${theme.colors.background.primary} 0%, 
        ${theme.colors.background.secondary} 100%
    );
    min-height: 100vh;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 20% 20%, rgba(139, 88, 42, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(210, 180, 140, 0.05) 0%, transparent 50%);
        pointer-events: none;
    }
`;

export const AboutMain = styled.main`
    position: relative;
    z-index: 1;
`;

// 頁面標題區域
export const PageHeader = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
`;

export const PageTitle = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
    letter-spacing: -1px;

    ${theme.mediaQueries.md} {
        font-size: 2.5rem;
    }

    ${theme.mediaQueries.sm} {
        font-size: 2rem;
    }
`;

export const PageSubtitle = styled.p`
    font-size: 1.25rem;
    color: ${theme.colors.text.secondary};
    margin: 0;
    font-weight: 400;

    ${theme.mediaQueries.sm} {
        font-size: 1.1rem;
    }
`;

// 主要卡片樣式
export const StoryCard = styled(Card)`
    background: ${theme.colors.background.white};
    border: none;
    border-radius: ${theme.borderRadius.large};
    box-shadow: ${theme.shadows.card};
    transition: all ${theme.transitions.default};
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: ${theme.shadows.hover};
        animation: ${glow} 2s ease-in-out infinite;
    }

    .card-body {
        padding: 3rem;

        ${theme.mediaQueries.md} {
            padding: 2rem;
        }

        ${theme.mediaQueries.sm} {
            padding: 1.5rem;
        }
    }
`;

export const StoryTitle = styled.h3`
    color: ${theme.colors.primary.main};
    font-weight: 700;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 50px;
        height: 3px;
        background: linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
        border-radius: 2px;
    }
`;

export const StoryText = styled.p`
    color: ${theme.colors.text.secondary};
    line-height: 1.8;
    font-size: 1.1rem;
    margin: 0;
`;

// 特色卡片
export const FeatureCard = styled(Card)`
    background: ${theme.colors.background.white};
    border: none;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadows.card};
    transition: all ${theme.transitions.default};
    height: 100%;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-10px);
        box-shadow: ${theme.shadows.hover};
        
        .feature-icon {
            animation: ${float} 2s ease-in-out infinite;
        }
    }

    .card-body {
        padding: 2.5rem 2rem;
        text-align: center;

        ${theme.mediaQueries.sm} {
            padding: 2rem 1.5rem;
        }
    }
`;

export const FeatureIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    transition: all ${theme.transitions.default};
`;

export const FeatureTitle = styled.h5`
    color: ${theme.colors.primary.main};
    font-weight: 700;
    margin-bottom: 1rem;
    font-size: 1.3rem;
`;

export const FeatureText = styled.p`
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    margin: 0;
    font-size: 1rem;
`;

// 門市資訊卡片
export const StoreInfoCard = styled(Card)`
    background: linear-gradient(135deg, 
        ${theme.colors.background.white} 0%, 
        rgba(139, 88, 42, 0.02) 100%
    );
    border: none;
    border-radius: ${theme.borderRadius.large};
    box-shadow: ${theme.shadows.card};
    transition: all ${theme.transitions.default};
    margin-top: 2rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${theme.colors.secondary.main}, ${theme.colors.primary.main});
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${theme.shadows.hover};
    }

    .card-body {
        padding: 3rem;

        ${theme.mediaQueries.md} {
            padding: 2rem;
        }

        ${theme.mediaQueries.sm} {
            padding: 1.5rem;
        }
    }
`;

export const StoreTitle = styled.h3`
    color: ${theme.colors.primary.main};
    font-weight: 700;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    text-align: center;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, ${theme.colors.secondary.main}, ${theme.colors.primary.main});
        border-radius: 2px;
    }

    ${theme.mediaQueries.sm} {
        font-size: 1.5rem;
    }
`;

export const StoreInfoItem = styled.p`
    color: ${theme.colors.text.primary};
    font-size: 1.1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    line-height: 1.6;

    strong {
        color: ${theme.colors.primary.main};
        font-weight: 600;
        min-width: 120px;
        display: inline-block;
    }

    ${theme.mediaQueries.sm} {
        font-size: 1rem;
        flex-direction: column;
        align-items: flex-start;
        
        strong {
            min-width: auto;
            margin-bottom: 0.25rem;
        }
    }
`;

// 裝飾元素
export const FloatingElement = styled.div`
    position: absolute;
    pointer-events: none;
    opacity: 0.1;
    z-index: 0;

    &.tea-leaf-1 {
        top: 10%;
        left: 5%;
        font-size: 3rem;
        animation: ${float} 6s ease-in-out infinite;
        color: ${theme.colors.primary.main};
    }

    &.tea-leaf-2 {
        top: 60%;
        right: 10%;
        font-size: 2.5rem;
        animation: ${float} 8s ease-in-out infinite reverse;
        color: ${theme.colors.secondary.main};
    }

    &.milk-drop {
        top: 30%;
        right: 5%;
        font-size: 2rem;
        animation: ${float} 5s ease-in-out infinite;
        color: ${theme.colors.accent.cream};
    }

    &.cup {
        bottom: 20%;
        left: 8%;
        font-size: 2.8rem;
        animation: ${float} 7s ease-in-out infinite;
        color: ${theme.colors.primary.light};
    }
`;

// 響應式容器
export const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
`;
