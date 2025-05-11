import { createGlobalStyle } from "styled-components";

import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
    
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border:none
  }
  
  ul,
  li {
    list-style: none;
  }
  
  html,
  body {
    font-family: sans-serif;
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
    --text-heading5: 600 16px/24px Prentarded;
    --text-base-strong: 600 14px/22px Prentarded;
    --text-base-normal: 400 14px/22px Prentarded;

    /* Padding *****************************************/
    --padding-xs: 8px;
  }  
`;
