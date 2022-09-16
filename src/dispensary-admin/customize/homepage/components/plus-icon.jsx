import React from 'react';
import styled from 'styled-components';

export function PlusIcon(props) {
  const { isHovered, onClick, ...restProps } = props;

  return (
    <PlusIconStyles
      fill='none'
      height='30'
      onClick={onClick}
      viewBox='0 0 30 30'
      visible={isHovered}
      width='30'
      xmlns='http://www.w3.org/2000/svg'
      {...restProps}
    >
      <path
        d='M12.5 2.5C12.5 1.11929 13.6193 0 15 0C16.3807 0 17.5 1.11929 17.5 2.5V27.5C17.5 28.8807 16.3807 30 15 30C13.6193 30 12.5 28.8807 12.5 27.5V2.5Z'
        fill='#5E6D79'
      />
      <path
        d='M27.5 12.5C28.8807 12.5 30 13.6193 30 15C30 16.3807 28.8807 17.5 27.5 17.5H2.5C1.11929 17.5 0 16.3807 0 15C0 13.6193 1.11929 12.5 2.5 12.5H27.5Z'
        fill='#5E6D79'
      />
    </PlusIconStyles>
  );
}

const PlusIconStyles = styled.svg`
  cursor: pointer;
  flex: 0 0 auto;
  min-width: 0;
  height: 12px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.15s;
  width: 12px;
`;
