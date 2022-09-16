import styled, { css } from 'styled-components';
import { width, space } from 'styled-system';
import { mediaQueries } from 'shared/styles';

export const textInputStyles = css`
  appearance: none;
  background: none;
  background-color: #fcfdfe;
  border-radius: 2px;
  box-shadow: none;
  color: #707478;
  font-size: 13px;
  border: 1px solid #d1d5da;
  padding: 14px 21px 13px;
  margin: 5px auto;
  ${space}
  width: 100%;
  ${width}
  box-sizing: border-box;
  outline: 0;
  &:active,
  &:focus {
    border: 1px solid #7fb1f4;
  }
  &:hover {
    @media ${mediaQueries.desktop} {
      border: 1px solid #7fb1f4;
      outline: none;
    }
  }
  &::placeholder {
    color: #aeafaf;
  }
  &[disabled] {
    background-color: #ecf0f3;
  }
  ${(props) =>
    props.type === 'number' &&
    `
    -moz-appearance: textfield;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  `}
  ${(props) =>
    props.disabled &&
    `
    background-color: whitesmoke;
    border-color: whitesmoke;
    box-shadow: none;
    color: #7a7a7a;
    cursor: not-allowed;
  `}
  @media ${mediaQueries.largePhone} {
    font-size: 16px;
  }
`;

export default styled.input`
  ${textInputStyles}
`;
