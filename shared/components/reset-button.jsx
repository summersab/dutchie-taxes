import React from 'react';
import { Button } from 'rebass/styled-components';
import styled from 'styled-components';

// eslint-disable-next-line
export default styled(({ color = '#80919a', ...props }) => <Button {...props} />)`
  appearance: none;
  background: none;
  border: none;
  border-radius: 0;
  padding: 0;
  font-weight: 400;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    color: ${(props) => (props.color ? props.color : '#363636')};
    outline: none;
    border: none;
    box-shadow: none;
  }
`;
