import styled from 'styled-components';

export const Header = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.navColor};
  border-top: 1px solid #dfe5e8;
  display: flex;
  justify-content: space-between;
  padding: 9px 15px;
  width: 100%;
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

export const BackToMenu = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.linkColor};
  display: flex;
  font-size: 11px;
  font-weight: 700;
  line-height: ${18 / 11};
  margin: 20px 0 0 17px;

  svg {
    fill: currentColor;
    height: 6px;
    margin: 0 2px 0 0;
    transform: rotate(90deg);
    width: 12px;
  }
`;
export const ProductImage = styled.img`
  display: block;
  height: 211px;
  margin: 16px auto 0;
  width: 211px;
`;

export const ProductName = styled.h1`
  color: #242526;
  font-size: 23px;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 700;
  line-height: 1;
  margin: 0 0 0 17px;

  span {
    color: #969ea5;
    display: block;
    font-size: 10px;
    margin: 0 0 2px;
    text-transform: uppercase;
  }
`;

export const ProductOptions = styled.ul`
  display: flex;
  font-size: 10px;
  line-height: 1;
  margin: 17px 0 0 17px;
  list-style: none;

  li {
    border: 1px solid #bccad2;
    border-radius: 6px;
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.fontFamily};
    margin: 0 6px 0 0;
    padding: 10px 0;
    text-align: center;
    width: 55px;
  }

  [data-selected] {
    border-color: ${({ theme }) => theme.linkColor};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.linkColor};
  }

  div {
    font-weight: 700;
    margin: 2px 0 0;
  }
`;

export const AddToCart = styled.div`
  display: flex;
  margin: 22px 0 0 17px;
`;

export const Quantity = styled.div`
  align-items: center;
  border: 1px solid #a3afba;
  border-radius: 24px;
  display: flex;
  font-size: 13px;
  font-weight: 400;
  justify-content: space-between;
  padding: 0 17px 0 21px;
  width: 75px;

  svg {
    height: 5px;
    width: 9px;
  }
`;

export const AddToCartButton = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.linkColor};
  border-radius: 30px;
  color: #fff;
  display: flex;
  height: 40px;
  font-size: 10px;
  font-weight: 700;
  justify-content: space-between;
  margin: 0 0 0 11px;
  padding: 0 16px;
  text-transform: uppercase;

  svg {
    height: 16px;
    margin: 0 9px 0 0;
    width: 16px;
  }
`;

export const ProductDescription = styled.div`
  color: #454e50;
  font-size: 10px;
  font-weight: 300;
  line-height: ${16 / 10};
  margin: 15px 17px;
`;
export const ProductDescriptionNote = styled.div`
  color: #969ea5;
  font-size: 9px;
  line-height: ${15 / 9};
  margin: 0 0 15px;
`;
