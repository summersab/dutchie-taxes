import React, { forwardRef } from 'react';
import {
  space,
  height,
  color,
  top,
  width as styledWidth,
  right as styledRight,
  display as styledDisplay,
  fontSize as styledFontSize,
  borderRadius,
} from 'styled-system';
import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

export const SelectContainer = styled.span`
  ${styledWidth}
  ${color}
  ${styledDisplay}
  ${space}
  position: relative;
  cursor: pointer;

  &:after {
    border: 1px solid #46494c;
    border-left: 4px solid transparent !important;
    border-right: 4px solid transparent !important;
    border-top: 5px solid #797e83 !important;
    border-bottom: none !important;
    transform: none !important;
    content: ' ';
    display: block;
    pointer-events: none;
    position: absolute;
    transform: rotate(-45deg);
    z-index: 1;
    top: 47%;
    ${styledRight}
    ${top}
  }

  &.--overflow {
    &:before {
      content: '...';
      position: absolute;
      top: 29%;
      right: 26px;
      width: 22px;
      z-index: 2;
      background-color: white;
    }
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  min-width: 50px;
  padding: 2px 31px 0px 12px;
  align-items: center;
  border: ${(props) => props.border || '1px solid transparent'};
  border-radius: 3px;
  box-shadow: none;
  position: relative;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  border-color: ${(props) => (props.error ? '#e25241 !important' : '#d1d5da')};
  color: #6d747b;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: block;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 45px;
  font-size: 13px;
  ${space}
  ${height}
  ${styledFontSize}
  ${borderRadius}

  &:active,
  &:focus {
    border: ${(props) => props.border || '1px solid #dbdbdb'};
    box-shadow: none;
  }

  &:hover {
    border: ${(props) => props.border || '1px solid #b6b6b6'};
  }

  /* remove outline on FF */
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #6d747b;
  }
  option:not(:checked) {
    color: #707478;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 14px;
  }
`;

const Select = forwardRef((
  /** @type { any } */
  {
    width,
    bg = '#fcfdfe',
    right = '18px',
    display = ['block'],
    fontSize = ['16px', '16px', '16px', '13px'],
    carrotTop,
    className,
    mt,
    pr,
    ...props
  },
  ref
) => (
  <SelectContainer
    bg={bg}
    className={className}
    display={display}
    mt={mt}
    right={right}
    top={carrotTop}
    width={width}
    pr={pr}
  >
    <StyledSelect ref={ref} fontSize={fontSize} {...props} />
  </SelectContainer>
));

export default Select;
