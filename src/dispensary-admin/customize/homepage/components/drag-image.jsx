import React from 'react';
import styled from 'styled-components';

export function DragImage(props) {
  return (
    <Container width='17' height='11' viewBox='0 0 17 11' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect width='16.1333' height='2.2' rx='1.1' fill='#677882' />
      <rect y='4.40039' width='16.1333' height='2.2' rx='1.1' fill='#677882' />
      <rect y='8.80078' width='16.1333' height='2.2' rx='1.1' fill='#677882' />
    </Container>
  );
}

const Container = styled.svg`
  cursor: move;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  width: 16px;
  min-width: 16px;
`;
