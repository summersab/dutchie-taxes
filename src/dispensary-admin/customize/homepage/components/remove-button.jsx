import React from 'react';
import styled from 'styled-components';

export function RemoveButton(props) {
  return (
    <Container width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <ellipse cx='10' cy='10.1453' rx='10' ry='10.0184' fill='#E3E8ED' />
      <path
        d='M12.4625 6.67487C12.7879 6.34883 13.3156 6.34883 13.641 6.67487C13.9664 7.00091 13.9664 7.52952 13.641 7.85555L7.74846 13.759C7.42302 14.085 6.89538 14.085 6.56995 13.759C6.24451 13.4329 6.24451 12.9043 6.56995 12.5783L12.4625 6.67487Z'
        fill='#7A7D80'
      />
      <path
        d='M13.641 12.5783C13.9664 12.9043 13.9664 13.4329 13.641 13.759C13.3156 14.085 12.7879 14.085 12.4625 13.759L6.56995 7.85555C6.24451 7.52951 6.24451 7.0009 6.56995 6.67487C6.89538 6.34883 7.42302 6.34883 7.74845 6.67487L13.641 12.5783Z'
        fill='#7A7D80'
      />
    </Container>
  );
}

const Container = styled.svg`
  width: 20px;
  min-width: 20px;
  margin-right: 13px;
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.15s;
`;
