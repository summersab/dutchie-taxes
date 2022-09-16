/* eslint-disable i18next/no-literal-string */
export const sansSerifFallbacks = [
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

export const serifFallbacks = ['Georgia', 'serif'];

export const fonts = {
  EXO: {
    fontFamily: 'Exo',
    fontFamilyEncoded: 'Exo',
    fallbacks: sansSerifFallbacks,
  },
  FIRA_SANS: {
    fontFamily: 'Fira Sans',
    fontFamilyEncoded: 'Fira+Sans',
    fallbacks: sansSerifFallbacks,
  },
  HEEBO: {
    fontFamily: 'Heebo',
    fontFamilyEncoded: 'Heebo',
    fallbacks: sansSerifFallbacks,
  },
  LATO: {
    fontFamily: 'Lato',
    fontFamilyEncoded: 'Lato',
    fallbacks: sansSerifFallbacks,
  },
  MATTER: {
    fontFamily: 'Matter',
    fallbacks: sansSerifFallbacks,
  },
  MERRIWEATHER: {
    fontFamily: 'Merriweather',
    fontFamilyEncoded: 'Merriweather',
    fallbacks: serifFallbacks,
  },
  NOTO_SANS: {
    fontFamily: 'Noto Sans',
    fontFamilyEncoded: 'Noto+Sans',
    fallbacks: sansSerifFallbacks,
  },
  NUNITO: {
    fontFamily: 'Nunito',
    fontFamilyEncoded: 'Nunito',
    fallbacks: sansSerifFallbacks,
  },
  PROXIMA_NOVA: {
    fontFamily: 'proxima-nova',
    fallbacks: sansSerifFallbacks,
  },
  ROKKITT: {
    fontFamily: 'Rokkitt',
    fontFamilyEncoded: 'Rokkitt',
    fallbacks: serifFallbacks,
  },
  VOLKHOV: {
    fontFamily: 'Volkhov',
    fontFamilyEncoded: 'Volkhov',
    fallbacks: serifFallbacks,
  },
  VOLLKORN: {
    fontFamily: 'Vollkorn',
    fontFamilyEncoded: 'Vollkorn',
    fallbacks: serifFallbacks,
  },
  WORK_SANS: {
    fontFamily: 'Work Sans',
    fontFamilyEncoded: 'Work+Sans',
    fallbacks: sansSerifFallbacks,
  },
};
