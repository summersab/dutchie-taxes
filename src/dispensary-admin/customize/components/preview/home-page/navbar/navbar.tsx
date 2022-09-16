import React from 'react';

import { Menu as MenuIcon } from 'src/svg/menu';
import { SearchIcon } from 'src/assets/search-icon';
import SvgCart from 'shared/assets/cart';

import { MenuButton, CartButton, PrimaryRow, SecondaryRow, Status, MenuType } from './navbar.styles';

export const TEST_ID_NAVBAR_HEADER = 'navbar-header';
export const TEST_ID_PRI_ROW = 'primary-row';
export const TEST_ID_CART_BUTTON = 'cart-button';

/*
  TODO: lift & reuse across preview pages.
   - move into preview/layout
   - render inside Preview
*/
export function NavBar(): JSX.Element {
  return (
    <header data-testid={TEST_ID_NAVBAR_HEADER}>
      <PrimaryRow data-testid={TEST_ID_PRI_ROW}>
        <MenuButton>
          <MenuIcon />
          Menu
        </MenuButton>

        <SearchIcon />

        <CartButton data-testid={TEST_ID_CART_BUTTON}>
          <SvgCart />
          <div>5</div>
        </CartButton>
      </PrimaryRow>

      <SecondaryRow>
        <Status>
          <b>Open</b>
          <span>Delivery</span>
        </Status>

        <MenuType>
          Menu: <b>Rec</b>
        </MenuType>
      </SecondaryRow>
    </header>
  );
}
