import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { SidebarFooter } from 'src/components/sidebar/footer';

type SidebarContainerProps = {
  children: ReactNode;
};

export function SidebarContainer(props: SidebarContainerProps): JSX.Element {
  const { children } = props;

  return (
    <Container data-cy='admin-sidebar' data-test='admin-sidebar'>
      {children}
      <SidebarFooter />
    </Container>
  );
}

const Container = styled.div`
  background-color: #61a58b;
  color: #fff;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  font-size: 14px;
  height: auto;
  justify-content: space-between;
  left: 0;
  min-height: 100vh;
  min-width: 0;
  position: fixed;
  top: 0;
  width: 200px;

  @media ${({ theme }) => theme.mediaQueries.desktop} {
    display: none;
  }
`;
