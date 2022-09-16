import React from 'react';
import { Button as RebassButton } from 'rebass/styled-components';
import { layout, space, fontSize, maxWidth } from 'styled-system';
import styled from 'styled-components';
import _ from 'lodash';
import tc from 'tinycolor2';

import { SmallLoader } from 'shared/components/loading';
import useStyledTheme from 'shared/hooks/use-styled-theme';

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledButton = styled(({ disabled, ...props }) => (
  <RebassButton disabled={disabled} {..._.omit(props, 'loading')} />
))`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  border-radius: 33px;
  border: none;
  box-shadow: none;
  color: ${(props) => (props.loading ? 'transparent !important' : '#FFF')};
  cursor: ${(props) => (props.loading || props.disabled ? 'not-allowed' : 'pointer')};
  display: block;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  line-height: 34px;
  padding: 0 18px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  line-height: 1;
  transition: background-color 86ms ease-out;
  white-space: nowrap;
  ${(props) => {
    if (props.height === '33px') {
      return `line-height: 2.4;`;
    }
    if (props.height === '27px') {
      return `line-height: 2;`;
    }
    return `line-height: 2.5;`;
  }}

  ${layout}
  ${space}
  ${fontSize}
  ${maxWidth}
  &:hover, &:active, &:focus {
    background-color: ${({ theme }) => tc(theme.colors.primaryBlue).darken(21).desaturate(24).toRgbString()};
    border: none;
    box-shadow: none;
    color: #fff;
    outline: none;
  }

  &:focus:not(:hover) {
    background-color: ${({ theme }) => theme.colors.primaryBlue};
  }

  &.--is-disabled,
  &:disabled,
  &:disabled:hover {
    background-color: #c6c4c4;
  }

  ${(props) => {
    if (props.disabled) {
      return `
        background-color: #9ea7ab;
        color: #ffffff;
        opacity: 1;
      `;
    }
    if (props.disabled || props.loading) {
      return `
        &:hover, &:active, &:focus {
          background-color: #9ea7ab;
          color: #ffffff;
        }
      `;
    }
    return '';
  }}

  ${(props) =>
    props.inverted &&
    `
    background-color: ${props.backgroundColor || 'white'};
    border: 2px solid ${props.theme.colors.primaryBlue};
    line-height: 2.2;
    color: ${props.loading ? 'transparent' : props.theme.colors.primaryBlue};
    &:hover, &:active, &:focus {
      background-color: #f2f2f2;
      border: 2px solid ${props.theme.colors.primaryBlue};
      color: ${props.theme.colors.primaryBlue};
    }
    &:focus:not(:hover) {
      background-color: #f2f2f2;
    }
  `}

  ${(props) =>
    props.gray &&
    `
    background-color: #a3b2c1;
    color: ${props.loading ? 'transparent' : '#FFF'};
    &:hover, &:active {
      background-color: #777f85;
    }
    &:focus:not(:hover),
    &:disabled:hover {
      background-color: #a3b2c1;
    }
    opacity: ${props.disabled ? '0.5' : '1'};
  `}

  ${(props) =>
    props.link &&
    `
    background-color: #fff;
    color: ${props.loading ? 'transparent' : props.theme.colors.primaryBlue};
    font-weight: normal;
    text-transform: none;
    &:hover, &:active {
      color: ${props.theme.colors.primaryBlue};
      background-color: #fff;
    }
    &:focus {
      background-color: #fff;
    }
  `}
`;

StyledButton.defaultProps = {
  theme: {
    colors: {
      primaryBlue: '#4597e0',
    },
  },
};

const Button = ({
  loading = false,
  disabled = false,
  children,
  inverted = false,
  link = false,
  onClick = _.noop,
  ...props
}) => {
  const theme = useStyledTheme();
  const spinnerColor = inverted ? theme.colors.primaryBlue : '#fff';
  return (
    <StyledButton
      loading={loading}
      disabled={disabled || loading}
      inverted={inverted}
      link={link}
      onClick={disabled || loading ? _.noop : onClick}
      {...props}
    >
      {children}
      {loading && (
        <LoaderContainer>
          <SmallLoader aria-label='Loading' height={20} color={spinnerColor} />
        </LoaderContainer>
      )}
    </StyledButton>
  );
};
export default Button;
