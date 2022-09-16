import React from 'react';
import styled from 'styled-components';
import { color, height, justifyContent, width, space, borderRadius } from 'styled-system';

const Card = ({ children, ...rest }) => <StyledCard {...rest}>{children}</StyledCard>;

export default Card;

const StyledCard = styled.div`
  cursor: pointer;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: box-shadow 0.2s;
  border-radius: 13px;
  position: relative;
  box-shadow: ${({ alwaysShowShadow }) => (alwaysShowShadow ? '0px 4px 10px rgba(0, 0, 0, 0.10)' : 'none')};
  height: 187px;
  max-width: unset;
  width: auto;
  ${borderRadius}
  ${color}
  ${height}
  ${justifyContent}
  ${space}
  ${width}
  user-select: none;
  user-drag: none;

  @media (min-width: 600px) and (hover: hover) {
    &:hover,
    &:active {
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.1);
    }
  }
`;
