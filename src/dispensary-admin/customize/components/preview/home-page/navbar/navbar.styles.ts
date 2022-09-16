import styled from 'styled-components';

export const PrimaryRow = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.navColor};
  border: solid #dfe5e8;
  border-width: 1px 0;
  display: flex;
  justify-content: space-between;
  padding: 9px 15px;
`;

export const MenuButton = styled.div`
  align-items: center;
  color: #888f9b;
  display: flex;
  flex-grow: 1;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;

  svg {
    margin-right: 11px;
  }
`;

export const CartButton = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.linkColor};
  border-radius: 3px;
  color: #fff;
  display: flex;
  flex-grow: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 0 14px;
  padding: 4px 6px;

  svg {
    height: 16px;
    margin: 0 6px 0 0;
    width: 16px;
  }
`;

export const SecondaryRow = styled.div`
  align-items: center;
  border-bottom: 1px solid #dfe5e8;
  color: #677882;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  padding: 9px 15px;
`;

export const Status = styled.div`
  display: flex;
  font-weight: bold;

  b {
    color: #4ca667;
    padding-right: 6px;
    text-transform: uppercase;
  }
`;

export const MenuType = styled.div`
  display: flex;

  b {
    font-weight: bold;
    margin-left: 4px;
  }
`;
