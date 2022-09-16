import styled from 'styled-components';

export const Container = styled.div`
  min-height: 420px;
  padding: 40px 16px 5px 16px;
  border-bottom: 1px solid #d7e4eb;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
`;

export const Title = styled.h2`
  color: #242526;
  font-weight: bold;
  font-size: 20px;
`;

export const ViewAllLink = styled.a`
  color: ${({ theme }) => theme.linkColor};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 11px;
  margin-top: 15px;
  padding: 10px 0 18px 0;
  margin-left: -30px;
  padding-left: 30px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;
