/* eslint-disable i18next/no-literal-string */
import { createGlobalStyle, css } from 'styled-components';

export const mediaSizes = {
  largeDesktop: 1200,
  desktop: 992,
  largeTablet: 960, // matches MUI 'md' width
  tablet: 900,
  largePhone: 768,
  phone: 575,
  smallPhone: 376,
};

export const mediaQueries = {
  largeDesktop: `only screen and (max-width: ${mediaSizes.largeDesktop + 1}px)`,
  desktop: `only screen and (max-width: ${mediaSizes.desktop + 1}px)`,
  largeTablet: `only screen and (max-width: ${mediaSizes.largeTablet + 1}px)`,
  tablet: `only screen and (max-width: ${mediaSizes.tablet + 1}px)`,
  largePhone: `only screen and (max-width: ${mediaSizes.largePhone + 1}px)`,
  phone: `only screen and (max-width: ${mediaSizes.phone + 1}px)`,
  smallPhone: `only screen and (max-width: ${mediaSizes.smallPhone + 1}px)`,
  iPhone5: 'only screen and (max-width: 325px)',
  custom: (px) => `only screen and (max-width: ${px}px)`,
};

export const colors = {
  white: '#ffffff',
  grey1: '#dedede',
  grey2: '#fcfdfe',
  grey3: '#d7dbde',
  grey4: '#5b676d',
  grey5: '#575e64',
  grey6: '#c8d0d4',
  grey7: '#8a929c',
  grey8: '#46494c',
  grey9: '#8f969c',
  grey10: '#3a3d40',
  grey11: '#777f86',
  grey12: '#c0c9cd',
  grey13: '#e2e8eb',
  grey14: '#c1c8cb',
  grey15: '#9ea7ab',
  grey16: '#b4bac0',
  grey17: '#a7aeb4',
  grey18: '#abb6bc',
  grey19: '#dbdbdb',
  grey20: '#f2f6f8',
  grey21: '#e3e6e8',
  grey22: '#dae1e6',

  greenBackground: '#f4f6f7',
  green1: '#61a58b',
  green2: '#8ecbb5',
  green3: '#c8c9c7',
  green4: '#b4c7b5',

  blue: '#4597e0',

  footerBackground: '#3E566D',
  offWhite: '#f4f9ff',

  dutchiePlusBlue: {
    95: '#E5EDF6',
    45: '#586783',
    15: '#13253E',
    10: '#0C1829',
  },
  dutchiePlusGreen: {
    35: '#00BAAF',
  },
  dutchiePlusGrey: {
    95: '#DCE2FF',
  },
  dutchiePlusPurple: {
    95: '#DAE1FE',
    75: '#8298FC',
    55: '#5E6DBA',
    50: '#4756AD',
  },
};

export const variables = {
  maxWidthLarge: 1152,
  maxWidthMed: 960,
  outsidePadding: 28,
  outsidePaddingMobile: 22,
  menuTop: 94,
};

export const appPadding = css`
  padding: 0 ${variables.outsidePadding}px;
  @media ${mediaQueries.phone} {
    padding: 0 ${variables.outsidePaddingMobile}px;
  }
`;

export const fontFamily = css`
  font-family: Matter, proxima-nova, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
`;

export const GlobalStyles = createGlobalStyle`
  // http://meyerweb.com/eric/tools/css/reset/
  // v5.0.1 | 20191019
  // License: none (public domain)

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  // end css reset

  html,
  .ReactModalPortal * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    ${fontFamily}
  }

  * {
    box-sizing: border-box;
  }

  .ReactModal__Content {
    outline: none;
  }

  a,
  a:hover,
  a:focus,
  a:active {
    color: #4597e0;
    text-decoration: none;
  }

  body {
    min-width: 320px;
  }

  /* These styles are for the Google Address lookup components */

  .pac-matched {
    font-weight: bold !important;
  }
  .pac-home.pac-container {
    border: 0px;
    border-radius: 8px;
    position: fixed;
    padding: 30px 38px;
    .pac-item {
      overflow: auto;
    }
    .pac-icon {
      display: none;
    }
  }

  .pac-container-reopened {
    border: 1px solid #d9aeae;

    &:before {
      color: #ee6c6c;
      font-size: 12px;
      content: 'Please select an address below';
      padding-top: 10px;
      height: 22px;
      text-align: center;
      display: block;
    }
  }
  .pac-container.modal-pac-container {
    span {
      font-size: 12px;
    }
    .pac-item {
      overflow: hidden;
    }
    .pac-icon {
      display: none;
    }
  }

  .pac-item {
    display: flex;
    place-items: center;
    height: 43px;
    padding: 0;
    border: 0px;

    &:hover,
    &.pac-item-selected {
      background-color: #f5f5f5;
      border-radius: 8px;
      cursor: pointer;

      span {
        color: #46494c;
      }
    }

  }

  /* These styles are for the default consumer 1.0 Google Address lookup components */
  .pac-container {
    border: 1px solid #c2c9cc;
    border-radius: 4px;
    position: fixed;
  }
  .pac-container-reopened {
    border: 1px solid #d9aeae;
    &:before {
      color: #ee6c6c;
      font-size: 12px;
      content: 'Please select an address below';
      padding-top: 10px;
      height: 22px;
      text-align: center;
      display: block;
    }
  }
  .pac-container {
    .pac-item {
      height: 48px;
      padding-top: 10px;
      padding-left: 16px;
      &:hover,
      &.pac-item-selected {
        background-color: #f5f5f5;
        cursor: pointer;
        span {
          color: #46494c;
        }
      }
      span {
        color: #8f989e;
        font-size: 13px;
        font-weight: normal;
        @media screen and (max-width: 800px) {
          font-size: 11px;
        }
      }
    }
    .pac-icon {
      display: none;
    }
    .pac-logo:after {
      background-position: center;
      border-top: 1px solid #eaeaea;
      height: 36px;
    }
  }

  // consumer-v1.5 google places autocomplete style override
  .pac-home {
    .pac-item {
      padding: 0;
      span {
        color: #242526 !important;
        font-size: 15px !important;
        font-weight: normal;
        @media screen and (max-width: 800px) {
          font-size: 14px !important;
          line-height: 43px !important;
        }
      }
    }
    .pac-icon {
      background-image: url('/images/pin-icon.png') !important;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 15px !important;
      margin-left: 5px !important;
      margin-top: 0px !important;
      @media all and (max-width: 800px) {
        display: none;
      }
    }
    .pac-item:not(:first-of-type) {
      margin-top: 13px;
    }
    @media all and (max-width: 800px) {
      padding: 25px;
    }
  }

  .pac-home.pac-logo {
    ::after {
      display: none !important;
    }
  }

  .override-pac-container.pac-container:not(.pac-container.modal-pac-container) {
    width: 100% !important;
    max-width: 694px !important;
    margin-left: -5px;
    margin-top: 1px;
    .pac-icon {
      display: block;
    }
    @media ${mediaQueries.phone} {
      .pac-item {
        overflow: scroll;
      }
      span {
        font-size: 12px;
      }
      max-width: 322px !important;
    }
  }
  .fullScreenPac.override-pac-container.pac-container:not(.pac-container.modal-pac-container) {
    height: 100%;
    width: 100% !important;
    max-width: 100% !important;
    left: 0 !important;
    margin-top: 20px;
    margin-left: 0;
    border-radius: 0;
    @media ${mediaQueries.phone} {
      box-shadow: 0 2px 0px rgba(0, 0, 0, 0.0408458) inset !important;
      text-overflow: ellipsis;
      height: fit-content;
      overflow: auto;
      span {
        font-size: 14px;
        line-height: 43px;
      }
      .pac-item {
        overflow: hidden;
        display: block;
      }
      .pac-icon {
        display: none;
      }
    }
  }
`;
