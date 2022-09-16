import React from 'react';
import styled from 'styled-components';
import { ResetButton } from 'shared/components';
import { display } from 'styled-system';

export default styled(({ color, top, right, ...props }) => <ResetButton {...props} aria-label='Close' />)`
  ${display}
  position: ${(props) => props.position || 'absolute'};
  height: 36px;
  opacity: ${(props) => (props.color ? 1 : 0.7)};
  top: ${(props) => props.top || '8px'};
  right: ${(props) => props.right || '6px'};
  width: 36px;
  &:before {
    height: 3px;
    width: 50%;
  }
  &:after {
    height: 50%;
    width: 3px;
  }
  &:before,
  &:after {
    background-color: ${(props) => props.color || '#7f8683'};
    content: '';
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    transform-origin: center center;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }
`;
