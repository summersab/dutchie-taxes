import styled from 'styled-components';

export const MainContent = styled.div`
  display: flex;
  flex: 1 0 0%;
  flex-direction: column;
  justify-content: start;
  min-height: 100vh;
  min-width: 0;
  padding-left: 200px;

  @media ${({ theme }) => theme.mediaQueries.desktop} {
    padding-left: 0px;
  }
`;
