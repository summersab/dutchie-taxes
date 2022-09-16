import React from 'react';
import { fontSize, position, top, right, left, display, fontWeight, space, color } from 'styled-system';
import { Link } from 'rebass';
import styled, { css } from 'styled-components';

export default (props) => {
  const { as, ...otherProps } = props;

  if (as === 'button') {
    return <StyledButton {...otherProps} />;
  }

  return <StyledLink {...otherProps} />;
};

const styles = css`
  // eslint-disable-next-line i18next/no-literal-string
  color: ${({ theme }) => theme?.colors?.linkColor || '#4597e0'};
  cursor: pointer;
  ${fontSize}
  ${fontWeight}
  ${position}
  ${top}
  ${right}
  ${left}
  ${display}
  ${space}
  ${color}
`;

const StyledLink = styled(Link)`
  ${styles}
`;

const StyledButton = styled.button`
  // override default button styles
  appearance: none;
  border: none;
  padding: 0;
  background-color: transparent;
  ${styles}
`;
