import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  position: fixed;
  right: 0;
  top: 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const Page = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export function AppContainer({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Container>
      <Body>
        <Page>{children}</Page>
      </Body>
    </Container>
  );
}
