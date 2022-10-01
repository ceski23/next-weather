import { css, Theme } from '@emotion/react';
import 'react-loading-skeleton/dist/skeleton.css'

const globalStyles = (theme: Theme) => css`
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url('/fonts/poppins-latin-400-normal.woff2') format('woff2'), url('/fonts/poppins-latin-400-normal.woff') format('woff');  
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: url('/fonts/poppins-latin-500-normal.woff2') format('woff2'), url('/fonts/poppins-latin-500-normal.woff') format('woff');  
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url('/fonts/poppins-latin-600-normal.woff2') format('woff2'), url('/fonts/poppins-latin-600-normal.woff') format('woff');  
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url('/fonts/poppins-latin-700-normal.woff2') format('woff2'), url('/fonts/poppins-latin-700-normal.woff') format('woff');  
  }

  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    color: ${theme.colors.text};
  }

  * {
    box-sizing: border-box;
  }
`;

export default globalStyles;