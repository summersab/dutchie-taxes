import _ from 'lodash';
import { createMuiTheme } from '@material-ui/core/styles';
import { css } from 'styled-components';

import { mediaSizes, mediaQueries } from 'shared/styles';
import { MuiAccordion, MuiAccordionSummary, MuiAccordionActions } from 'shared/components/accordion';
import { MuiTabs, MuiTab } from 'shared/components/tabs';

const MuiDrawer = {
  root: {
    '& > .MuiBackdrop-root': {
      backgroundColor: 'transparent',
    },
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: '5px 0 7px 0 rgba(0,0,0,0.07)',
    borderRight: '1px solid #D9DDE4',
  },
};

const normalTransitions = createMuiTheme().transitions;
const normalAnimations = {
  create: (animation, settings) =>
    css`
      ${animation} ${settings}
    `,
};

export const fonts = [
  'Matter',
  'proxima-nova',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  '"Roboto"',
  '"Oxygen"',
  '"Ubuntu"',
  '"Cantarell"',
  '"Fira Sans"',
  '"Droid Sans"',
  '"Helvetica Neue"',
  '"Helvetica"',
  '"Arial"',
  'sans-serif',
];

export const colors = {
  // named colors, branding or action oriented
  primaryGreen: '#26a27b',
  primaryBlue: '#0b99e6',
  primaryOrange: '#e97a3b',
  primaryPurple: '#936bbe',
  primaryGrey: '#f3f6f8',
  primaryBlack: '#242526',
  white: '#fff',

  // backgrounds?
  darkBackground: '#e1e8ec', // "dark-bkgd"
  lightRedBackground: '#ffeeee',
  pinkBorder: '#d7c1c1',
  // shadows and other rgba colors
  // @TODO: I made these up, need to get input from product for actual colors here ch-47006
  blueShadow: 'rgba(11, 153, 230, 0.4)',
  basicShadow: 'rgba(0, 0, 0, 0.14)',
  lightShadow: 'rgba(0, 0, 0, 0.097543)',
  whiteOverlay: 'rgba(255, 255, 255, 0.8)',

  // @TODO these v2 colors need to be translated into a DDS color via product.
  v2Border1: '#cbd4d9',
  v2Background1: '#f7f9fb',
  v2TextColor1: '#6d747b',
  v2TextColor2: '#46494c',
  v2Background2: '#ebf0f4',
  v2Border2: '#bec8cd',
  v2ScheduleDemoBG: '#5e92d2',
  v2DarkFooter: '#3e566d',
  v2BlueGreyHeader: '#475d74',
  v2BlueGreySubheader: '#909fb2',
  v2BlueGreyCopyText: '#495867',
  v2PrimaryGreen: '#5ea68c',

  // dutchie plus colors
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

  // greens
  green: {
    95: '#f0fffa',
    90: '#d7f0e8',
    85: '#c7efe0',
    65: '#86c1ab',
    55: '#74B56E',
    45: '#43ab92',
    40: '#26A27B',
    30: '#178e6a',
  },
  lime: {
    45: '#4ca667',
    35: '#1c956f',
    30: '#118A67',
    25: '#0E7154',
  },
  moss: {
    85: '#C7EFE0',
    65: '#90b0a5',
    45: '#68867c',
  },

  // blues
  blue: {
    90: '#d3edff',
    55: '#4c94d7',
    50: '#3d85c9',
    40: '#316495',
  },

  // oranges
  orange: {
    85: '#ffd3b8',
    65: '#f58f51',
    55: '#E97A3B',
    35: '#a2460a',
  },

  // "purps" lul
  purple: {
    85: '#d7bbec',
    35: '#572e83',
  },

  // reds
  red: {
    60: '#f3583a',
    55: '#d34a4a',
  },

  // greys
  grey: {
    100: '#fcfdfe',
    95: '#f2f6f8',
    90: '#e5e8ea',
    85: '#d8d8d8',
    80: '#caced4',
    75: '#b7bfc7',
    70: '#a3afba',
    60: '#969ea5',
    55: '#888F9B',
    50: '#798891',
    45: '#677882',
    40: '#5E696E',
    35: '#4f5d68',
    30: '#454e50',
    25: '#393d40',
  },

  // blue-greys
  blueGrey: {
    95: '#eaeff2',
    90: '#d7e4eb',
    80: '#bccad2',
  },
};

export const styledComponentsTheme = {
  breakpoints: _.values(mediaSizes)
    .reverse()
    .map((size) => `${size + 1}px`), // +1 required to avoid conflicts on exact pixels. - Alex 9/17/18
  fonts: {
    sans: fonts.join(', '),
  },
  mediaQueries,
  colors,
  transitions: normalTransitions,
  animations: normalAnimations,
};

export const muiTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application
    },
  },
  typography: {
    fontFamily: fonts,
  },
  palette: {
    primaryBlue: '#4597e0',
    linkColor: '#589dc9',
  },
  overrides: {
    MuiAccordion,
    MuiAccordionSummary,
    MuiAccordionActions,
    MuiDrawer,
    MuiTabs,
    MuiTab,
  },
  transitions: normalTransitions,
  animations: normalAnimations,
});
