import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string
      primaryDark: string
      background: string
      backgroundAlt: string
      text: string
      textAlt: string
      border: string

      time: {
        morning: {
          background: string
          text: string
        }
        noon: {
          background: string
          text: string
        }
        evening: {
          background: string
          text: string
        }
        night: {
          background: string
          text: string
        }
      }
    }
  }
}

const theme: Theme = {
  colors: {
    primary: '#c4e2ff',
    primaryDark: '#24609b',
    background: '#ffffff',
    backgroundAlt: '#ecf3f8',
    text: '#1f1e31',
    textAlt: '#959595',
    border: '#dee5ea',
    time: {
      morning: {
        background: '#c4e2ff',
        text: '#24609b'
      },
      evening: {
        background: '#c4e2ff',
        text: '#24609b'
      },
      night: {
        background: '#c4e2ff',
        text: '#24609b'
      },
      noon: {
        background: '#c4e2ff',
        text: '#24609b'
      },
    }
  }
}

export default theme;