import { createGlobalStyle } from 'styled-components';

import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
    
  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Light.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Medium.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-SemiBold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Bold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-ExtraBold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-display: swap;
    src: url('/src/assets/fonts/Pretendard-Black.woff') format('woff');
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  ul,
  li {
    list-style: none;
  }
  
  html,
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 62.5%;
  }

  :root {
    /* Colors *****************************************/
    --primary: #4A7CFE;
    --secondary: rgba(0, 0, 0, 0.65);
    --error: #FF4D4F;
    --white: #ffffff;
    --gray: #E3E3E3;
    --text-default: rgba(0, 0, 0, 0.88);
    --text-disabled: rgba(0, 0, 0, 0.25);
    --button-disabled: rgba(0, 0, 0, 0.04);
    --split: rgba(0, 0, 0, 0.06);
    --alter: rgba(0, 0, 0, 0.02);
    
    /* Fonts *****************************************/
    --heading5: 600 16px/24px Pretendard;
    --text-title: 600 14px/22px Pretendard;
    --text-content: 400 14px/22px Pretendard;

    /* Padding *****************************************/
    --padding-xs: 8px;
  }  
`;
