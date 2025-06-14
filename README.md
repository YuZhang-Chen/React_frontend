# 專案名稱 飲料店管理系統
React與MVC架構撰寫的PHP+MySQL

## 環境設定

### 前置需求

- Node.js (建議使用 LTS 版本)
- npm (通常隨 Node.js 一起安裝)

### 主要套件說明
以下是本專案使用的一些主要套件：

Production Dependencies:
@testing-library/dom: ^10.4.0 - 用於測試 DOM 節點的實用工具。
@testing-library/jest-dom: ^6.6.3 - 提供 Jest 使用的自訂 DOM 匹配器。
@testing-library/react: ^16.3.0 - 用於測試 React 元件的輕量級解決方案。
@testing-library/user-event: ^13.5.0 - 模擬使用者與瀏覽器互動的事件。
axios: ^1.9.0 - 基於 Promise 的 HTTP 客戶端，用於瀏覽器和 node.js。
bootstrap: ^5.3.6 - 流行的前端框架，用於快速設計和自訂響應式網站。
bootstrap-icons: ^1.13.1 - Bootstrap 的官方開源 SVG 圖示庫。
react: ^19.1.0 - 用於建構使用者介面的 JavaScript 函式庫。
react-bootstrap: ^2.10.10 - Bootstrap 元件的 React 版本。
react-dom: ^19.1.0 - React 的 DOM 特定方法入口。
react-router-dom: ^7.6.2 - React 應用程式的宣告式路由。
react-scripts: 5.0.1 - Create React App 的設定和腳本。
react-toastify: ^11.0.5 - 用於顯示 React 應用程式通知的套件。
styled-components: ^6.1.18 - 允許您在 JavaScript 中編寫實際 CSS 來設定元件樣式的函式庫。
web-vitals: ^2.1.4 - 用於測量網頁核心效能指標的 Google 提案。
Development Dependencies:
prettier: 3.5.3 - 一個固執己見的程式碼格式化工具。

### 專案結構樹狀圖

.
├── README.md               # 專案說明文件 (本檔案)
├── package.json            # 專案依賴與腳本設定
├── build/                  # 應用程式的生產建置版本
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── public/                 # 包含公開靜態資源
│   ├── favicon.ico         # 網站圖示
│   ├── index.html          # 應用程式的 HTML 主頁面
│   ├── logo192.png         # PWA 圖示
│   ├── logo512.png         # PWA 圖示
│   ├── manifest.json       # Web App Manifest (PWA 設定)
│   └── robots.txt          # 給搜尋引擎爬蟲的指示
└── src/                    # 應用程式原始碼
    ├── App.jsx             # 主要的應用程式根元件
    ├── App.styled.jsx      # App.jsx 的樣式檔案 (styled-components)
    ├── App.test.js         # App.jsx 的測試檔案
    ├── index.css           # 全域 CSS 樣式
    ├── index.js            # React 應用程式的進入點
    ├── logo.svg            # 專案 Logo
    ├── reportWebVitals.js  # 網頁效能監測
    ├── setupTests.js       # 測試環境設定檔
    ├── components/         # 可重用的 UI 元件
    │   ├── Navbar.jsx          # 導覽列元件
    │   ├── PrivateRoute.jsx    # 私有路由元件 (需登入才能存取)
    │   ├── RedirectIfAuth.jsx  # 已登入則重導向的元件
    │   ├── TokenExpiredModal.jsx # Token 過期提示彈跳視窗元件
    │   ├── drinkMenu/          # 飲品菜單相關元件
    │   │   ├── DrinkMenu.css   # DrinkMenu 元件的 CSS 樣式
    │   │   └── DrinkMenu.jsx   # 飲品菜單元件
    │   └── layout/             # 版面佈局元件 (如頁首、頁尾)
    │       ├── Footer.jsx          # 頁尾元件
    │       ├── Footer.styled.jsx   # Footer 元件的樣式
    │       ├── Header.jsx          # 頁首元件
    │       └── Header.styled.jsx   # Header 元件的樣式
    ├── contexts/             # React Context API 相關檔案
    │   ├── AuthContext.jsx     # 身份驗證狀態管理
    │   ├── CartContext.jsx     # 購物車狀態管理
    │   └── TokenContext.jsx    # Token 管理
    ├── pages/                # 頁面元件
    │   ├── About/              # 關於我們
    │   │   ├── About.jsx
    │   │   └── About.styled.jsx
    │   ├── CartPage/           # 購物車
    │   │   ├── CartPage.jsx
    │   │   └── CartPage.styled.jsx
    │   ├── Home/               # 首頁
    │   │   ├── Home.jsx
    │   │   └── Home.styled.jsx
    │   ├── LoginPage/          # 登入頁面
    │   │   ├── LoginPage.jsx
    │   │   └── LoginPage.styled.jsx
    │   ├── ManagePage/         # 後台管理頁面
    │   │   ├── ManagerPage.jsx
    │   │   └── ManagerPage.styled.jsx
    │   ├── OrderHistory/       # 歷史訂單
    │   │   ├── OrderHistory.jsx
    │   │   └── OrderHistory.styled.jsx
    │   ├── RegisterPage/       # 註冊頁面
    │   │   ├── RegisterPage.jsx
    │   │   └── RegisterPage.styled.jsx
    │   └── TestPage/           # 測試頁面
    │       └── TestPage.jsx
    ├── services/             # API 服務
    │   ├── dashboard/          # 儀表板 API
    │   │   └── api.js
    │   ├── login/              # 登入 API
    │   │   └── api.js
    │   ├── member/             # 會員管理 API 及元件
    │   │   ├── api.js
    │   │   ├── CreateMember.jsx
    │   │   ├── DeleteMember.jsx
    │   │   ├── MemberTable.jsx
    │   │   └── UpdateMember.jsx
    │   ├── order/              # 訂單管理 API 及元件
    │   │   ├── api.js
    │   │   ├── CreateOrder.jsx
    │   │   ├── DeleteOrder.jsx
    │   │   ├── OrderTable.jsx
    │   │   └── UpdateOrder.jsx
    │   ├── orderDetail/        # 訂單明細 API 及元件
    │   │   ├── api.js
    │   │   └── OrderDetailModal.jsx
    │   └── product/            # 產品管理 API 及元件
    │       ├── api.js
    │       ├── CreateProduct.jsx
    │       ├── DeleteProduct.jsx
    │       ├── ProductTable.jsx
    │       └── UpdateProduct.jsx
    ├── styles/               # 全域樣式設定
    │   └── theme.js            # 主題設定檔 (例如 styled-components 的主題)
    └── utils/                # 工具函式庫
        ├── authAxios.js        # 帶有身份驗證的 Axios 實例
        ├── authHelper.js       # 身份驗證輔助函式
        ├── axios.js            # Axios 基礎設定
        ├── networkDebugger.js  # 網路請求調試工具
        └── tokenManager.js     # Token 管理工具