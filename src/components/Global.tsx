import { createGlobalStyle } from "styled-components";
import ThemeType from "theme/types";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ThemeType {}
}

const GlobalStyle = createGlobalStyle`
  /*========== Colors ==========*/
  /* Change favorite color - Blue 210 - Purple 250 - Green 142 - Pink 340*/
  :root{
    --hue-light-color: 15;
    --hue-dark-color: 15;
  }
  
  * {
    font-family: 'Nunito', sans-serif;
    
  }
  
  body {
    
    img {
      height: auto;
      max-width: 100%;
    }
  }
  `;

export default GlobalStyle;

// background-color: ${({ theme }) => theme.background};
// background-color: rgba(0,0,0,0.2);
