import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const CustomTextField = styled(TextField)`
  .MuiInputBase-input {
    background: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 3px;
    font-size: 13px;
    line-height: 15px;
  }

  .MuiOutlinedInput-input {
    height: 45px;
    padding: 10px 34px 10px 20px;
    box-sizing: border-box;
  }

  .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.23);
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid #7fb1f4;
    }
  }

  .MuiInputAdornment-root {
    font-size: 12px;
    color: #a3afba;
  }
`;
