import React from 'react';
import styled from 'styled-components';

type SidebarIconProps = {
  icon: string;
  active?: boolean;
};

export function SidebarIcon(props: SidebarIconProps): JSX.Element {
  const { icon, active } = props;
  const src = `/icons/${icon}-${active ? 'active' : 'inactive'}.svg`;

  return (
    <IconContainer>
      <Icon src={src} />
    </IconContainer>
  );
}

const IconContainer = styled.div`
  padding: 0;
  width: 14px;

  @media ${({ theme }) => theme.mediaQueries.desktop} {
    padding: 10px 0;
    width: 22px;
  }

  @media ${({ theme }) => theme.mediaQueries.largePhone} {
    padding: 5px 0;
  }
`;

const Icon = styled.img`
  display: block;
  height: auto;
  padding: 10px 0;
  width: 100%;
`;
