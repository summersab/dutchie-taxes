export const MuiAutocomplete = {
  root: {
    width: '100%',
    height: '45px',
    fontSize: '13px',
  },
  inputRoot: {
    width: '100%',
    height: '45px',
    borderColor: '#d8dee3',
    '&[class*="MuiOutlinedInput-root"]': {
      borderRadius: 3,
      fontSize: '13px',
      color: '#6d747b',
      paddingTop: '0px',
      paddingBottom: '0px',
      '&:hover fieldset': {
        borderColor: '#b6b6b6',
        borderWidth: '1px',
      },
      '&.Mui-focused fieldset': {
        borderWidth: '1px',
        borderColor: '#b6b6b6',
      },
    },
  },
  option: {
    fontSize: '13px',
    color: '#6d747b',
  },
};
