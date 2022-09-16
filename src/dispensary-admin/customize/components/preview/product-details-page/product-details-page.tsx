import React from 'react';

import SvgCart from 'shared/assets/cart';

import { Menu as MenuIcon } from 'src/svg/menu';
import { ChevronIcon } from 'src/svg/chevron-icon';
import { SearchIcon } from 'src/assets/search-icon';

import { Preview, PreviewProps } from '../preview';

import {
  Header,
  MenuButton,
  CartButton,
  BackToMenu,
  ProductImage,
  ProductName,
  ProductOptions,
  AddToCart,
  Quantity,
  AddToCartButton,
  ProductDescription,
  ProductDescriptionNote,
} from './product-details-page.styles';

const productOptions = [
  {
    weight: `1g`,
    price: 12.0,
  },
  {
    weight: `1/8oz`,
    price: 21.45,
    selected: true,
  },
  {
    weight: `1/4oz`,
    price: 39.0,
  },
  {
    weight: `1/2oz`,
    price: 70.0,
  },
  {
    weight: `1oz`,
    price: 125.0,
  },
];

type ProductDetailsPageProps = Omit<PreviewProps, 'children'>;

export function ProductDetailsPage({ data }: ProductDetailsPageProps): JSX.Element {
  return (
    <Preview data={data}>
      <Header>
        <MenuButton>
          <MenuIcon />
          Menu
        </MenuButton>

        <SearchIcon />

        <CartButton>
          <SvgCart />
          <div>5</div>
        </CartButton>
      </Header>

      <BackToMenu>
        <ChevronIcon />
        <div>Back to menu</div>
      </BackToMenu>

      <ProductImage src='/images/product-preview-image.jpg' width='211' height='211' />

      <ProductName>
        <span>Nick’s Nugz</span>
        Blueberry Syrup
      </ProductName>

      <ProductOptions>
        {productOptions.map((option) => (
          <li data-selected={option.selected} key={option.weight}>
            {option.weight}
            <div>${option.price}</div>
          </li>
        ))}
      </ProductOptions>

      <AddToCart>
        <Quantity>
          <div>1</div>
          <ChevronIcon />
        </Quantity>

        <AddToCartButton>
          <SvgCart />
          <div>Add To Cart</div>
        </AddToCartButton>
      </AddToCart>

      <ProductDescription>
        <ProductDescriptionNote>*Cannabis and Sales tax added at checkout</ProductDescriptionNote>A time-honored
        cultivar that has been passed around within the finest of smoking circles since the early 90s. The true origins
        remain a mystery, some say Chemdawg x Skunk #1, while others say it is merely a phenotype of Chemdawg. No matter
        the origin, Sour Diesel continues to impress anyone that gets the privilege to get a hint of the distinct gassy
        aroma. Users have said the experience tends to be euphoric & uplifting.
      </ProductDescription>
    </Preview>
  );
}
