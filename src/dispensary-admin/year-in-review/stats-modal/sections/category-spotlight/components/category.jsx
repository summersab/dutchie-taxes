/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';
import { formatMoneyAbbr } from '../../../helpers';

const images = {
  flower: 'https://images.dutchie.com/category-stock-photos/flower/flower-1.png',
  'pre-rolls': 'https://images.dutchie.com/category-stock-photos/pre-rolls/pre-rolls-1.png',
  vaporizers: 'https://images.dutchie.com/category-stock-photos/vaporizers/vaporizers-1.png',
  concentrate: 'https://images.dutchie.com/category-stock-photos/concentrates/concentrates-1.png',
  edibles: 'https://images.dutchie.com/category-stock-photos/edibles/edibles-1.png',
  tincture: 'https://images.dutchie.com/category-stock-photos/tinctures/tinctures-1.png',
  topicals: 'https://images.dutchie.com/category-stock-photos/topicals/topicals-1.png',
  cbd: 'https://images.dutchie.com/category-stock-photos/cbd/cbd.png',
  seeds: 'https://images.dutchie.com/category-stock-photos/seeds/seeds.png',
  clones: 'https://images.dutchie.com/category-stock-photos/clones/clones.png',
  accessories: 'https://images.dutchie.com/category-stock-photos/accessories/accessories.png',
  apparel: 'https://images.dutchie.com/category-stock-photos/apparel/apparel.png',
};

function Category({ category, place }) {
  return (
    <CategoryStyles>
      <PlaceImg src={`/year-in-review/${place}-place.svg`} />
      <MainImg src={images[category.category.toLowerCase()]} />
      <Title>{_.upperFirst(category.category)}</Title>
      <Stats>
        {formatMoneyAbbr(category.sales)}
        <span>|</span>
        {category.salesPercent}%
      </Stats>
      <Copy>Total Sales</Copy>
    </CategoryStyles>
  );
}

export { Category };

const CategoryStyles = styled.div`
  width: 272px;
  height: 280px;
  background: #ffffff;
  box-shadow: 0 30px 44px rgba(36, 15, 15, 0.12);
  border-radius: 20px;
  z-index: 1;
  margin: 0 15px;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  -webkit-print-color-adjust: exact;
  -webkit-filter: opacity(1);

  @media ${mediaQueries.largeDesktop} {
    width: 250px;
    height: 260px;
  }

  @media ${mediaQueries.desktop} {
    width: 230px;
    height: 240px;
  }

  @media ${mediaQueries.largeTablet} {
    width: 200px;
    height: 210px;
  }

  @media ${mediaQueries.largePhone} {
    width: 155px;
    height: 160px;
  }

  @media ${mediaQueries.phone} {
    margin: 0 10px;
  }

  @media ${mediaQueries.smallPhone} {
    width: 140px;
  }
`;

const PlaceImg = styled.img`
  position: absolute;
  top: -10px;
  left: -12px;
  height: 65px;
  z-index: 2;

  @media ${mediaQueries.largeDesktop} {
    height: 60px;
  }

  @media ${mediaQueries.largeTablet} {
    height: 49px;
  }

  @media ${mediaQueries.largePhone} {
    height: 37px;
  }
`;

const MainImg = styled.img`
  width: 178px;
  z-index: 1;

  @media ${mediaQueries.largeDesktop} {
    width: 160px;
  }

  @media ${mediaQueries.largeTablet} {
    width: 130px;
  }

  @media ${mediaQueries.largePhone} {
    width: 102px;
  }
`;

const Title = styled.h3`
  font-size: 25px;
  line-height: 27px;
  font-weight: bold;
  margin: 10px 0 26px 0;
  color: #242526;
  font-family: 'proxima-nova', Helvetica, arial, sans-serif;

  @media ${mediaQueries.largeDesktop} {
    font-size: 23px;
  }

  @media ${mediaQueries.largeTablet} {
    font-size: 20px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const Stats = styled.div`
  display: flex;
  font-size: 23px;
  line-height: 120%;
  color: #454e50;
  font-family: 'proxima-nova', Helvetica, arial, sans-serif;
  span {
    font-size: 20px;
    color: #bccad2;
    line-height: 130%;
    margin: 0 15px;
  }

  @media ${mediaQueries.largeDesktop} {
    font-size: 21px;
    span {
      font-size: 18px;
    }
  }
  @media ${mediaQueries.largeTablet} {
    font-size: 18px;
    span {
      font-size: 16px;
    }
  }
  @media ${mediaQueries.largePhone} {
    font-size: 15px;
    span {
      font-size: 14px;
      margin: 0 8px;
    }
  }
`;

const Copy = styled.div`
  font-weight: bold;
  font-size: 11px;
  line-height: 150%;
  text-transform: uppercase;
  color: #969ea5;
  margin-top: 15px;
  font-family: 'proxima-nova', Helvetica, arial, sans-serif;

  @media ${mediaQueries.largePhone} {
    margin-top: 6px;
    font-size: 9px;
  }
`;
