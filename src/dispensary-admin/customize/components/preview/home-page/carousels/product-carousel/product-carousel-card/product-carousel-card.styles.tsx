import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border-radius: 13px;
  width: 160px;
  height: 100%;
  cursor: pointer;

  padding: 15px;
  box-shadow: none;
  transition: box-shadow 0.2s;
  @media (min-width: 600px) and (hover: hover) {
    &:hover,
    &:active {
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const Price = styled.p`
  color: ${({ theme }) => theme.linkColor};
  margin-bottom: 8px;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 214px;
  margin-bottom: 12px;
`;

export const Name = styled.p`
  color: #242526;
  font-size: 14px;
  font-weight: bold;
  line-height: 17px;
  margin-bottom: 6px;
`;

export const Brand = styled.p`
  color: #242526;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.65;
`;

export const Strain = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  line-height: 1.2;
  color: #677882;
`;

export const Button = styled.button`
  padding: 0;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100px;
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 6px ${({ theme }) => theme.colors.basicShadow};
  color: ${({ theme }) => theme.colors.primaryBlack};
  cursor: pointer;
  transition: 'background-color', 'box-shadow' 0.2s;

  :hover {
    background-color: ${({ theme }) => theme.colors.grey[95]};
  }

  :active {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }
`;
