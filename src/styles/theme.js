// 迷客夏主題配置
const themeConfig = {
  colors: {
    primary: {
      main: '#8B4513',      // 茶色/咖啡色
      light: '#D2B48C',     // 淺茶色
      dark: '#5D4037'       // 深咖啡色
    },
    secondary: {
      main: '#D2B48C',      // 奶茶色
      light: '#F4A460',     // 焦糖色
      dark: '#CD853F'       // 深焦糖色
    },
    accent: {
      cream: '#FFF8DC',     // 奶油色
      green: '#90EE90',     // 清新綠
      gold: '#FFD700'       // 金色
    },
    background: {
      primary: '#FAF0E6',   // 亞麻色
      secondary: '#FFF8DC', // 奶油色
      white: '#FFFFFF'      // 純白
    },
    text: {
      primary: '#2C1810',   // 深咖啡色
      secondary: '#5D4037', // 中咖啡色
      muted: '#8B7355'      // 淺咖啡色
    },
    gray: {
      100: '#f8f9fa',
      200: '#e9ecef', 
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8B4513 0%, #5D4037 100%)',
    secondary: 'linear-gradient(135deg, #D2B48C 0%, #F4A460 100%)',
    light: 'linear-gradient(135deg, #FFF8DC 0%, #FAF0E6 100%)',
    cream: 'linear-gradient(135deg, #FFF8DC 0%, #FFFFFF 50%, #FAF0E6 100%)',
    hero: 'linear-gradient(135deg, #FFF8DC 0%, #FAF0E6 50%, #FFFFFF 100%)'
  },
  fonts: {
    primary: "'Microsoft JhengHei', 'PingFang TC', 'Helvetica Neue', Arial, sans-serif",
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 800
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
    xxxl: '4rem'      // 64px
  },
  borderRadius: {
    small: '0.375rem',   // 6px
    medium: '0.5rem',    // 8px
    large: '0.75rem',    // 12px
    xl: '1rem',          // 16px
    xxl: '1.5rem',       // 24px
    round: '50%',
    pill: '50px'
  },
  shadows: {
    card: '0 4px 15px rgba(0,0,0,0.1)', 
    hover: '0 12px 32px rgba(0,0,0,0.15)',
    primary: '0 8px 25px rgba(139, 69, 19, 0.3)',
    light: '0 2px 8px rgba(0,0,0,0.08)'
  },
  transitions: {
    fast: '0.15s ease',
    default: '0.3s ease',
    slow: '0.5s ease'
  },
  breakpoints: {
    xs: '0px',
    sm: '576px', 
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  }
};

// 添加 media queries
themeConfig.mediaQueries = {
  xs: `@media (max-width: ${themeConfig.breakpoints.sm})`,
  sm: `@media (min-width: ${themeConfig.breakpoints.sm})`,
  md: `@media (min-width: ${themeConfig.breakpoints.md})`,
  lg: `@media (min-width: ${themeConfig.breakpoints.lg})`,
  xl: `@media (min-width: ${themeConfig.breakpoints.xl})`,
  xxl: `@media (min-width: ${themeConfig.breakpoints.xxl})`
};

export const theme = themeConfig;
export default theme;
