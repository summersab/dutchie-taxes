import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';

import { mediaQueries } from 'shared/styles';

import { formatCurrency } from '../../helpers';
import { Dots } from '../../components/dots';
import { Copy } from '../../components/copy';
import { Wrapper } from '../../components/wrapper';
import { Headline } from '../../components/headline';

export function TopSellerLargestOrder({ topSeller, largestOrder }) {
  const formattedTotalSales = formatCurrency(topSeller.totalSale);
  const formattedLargestOrderTotal = formatCurrency(largestOrder?.orderAmount);
  const momentDay = moment(largestOrder?.dateOfLargestOrder);
  const formattedDate = momentDay.format('MMMM D, YYYY');
  const topProduct = _.startCase(_.toLower(topSeller.productName));
  const topBrand = _.startCase(_.toLower(topSeller.brandName));

  const hideTopSeller = !topSeller.productName || !topSeller.productImage;

  return (
    <TopSellerLargestOrderSectionStyles>
      <CardsContainer>
        <Card hide={hideTopSeller} bgColor='rgba(255, 211, 184, .2)'>
          <Top>
            <CircleBackground color='rgba(249, 161, 98, .3)'>
              <LeftDots>
                <Dots fill='#E97A3B' />
              </LeftDots>

              <StatDisplay>
                <StatImage>
                  <img src={topSeller.productImage} alt={`${topProduct}`} />
                </StatImage>
                <StatMain>{topProduct}</StatMain>
                {topBrand && <StatSubcopy>{topBrand}</StatSubcopy>}
              </StatDisplay>
            </CircleBackground>
          </Top>

          <Bottom>
            <Headline>Top Seller</Headline>
            <Copy>
              The product you sold the most of was {topProduct}
              {`${topBrand ? ` from ${topBrand}` : ``}`}, with total online sales of <Bold>{formattedTotalSales}</Bold>.
            </Copy>
          </Bottom>
        </Card>
        <Card bgColor='rgba(199, 239, 224, .2)'>
          <Top>
            <CircleBackground color='rgba(72, 164, 110, .3)'>
              <RightDots>
                <Dots className='rightDots' fill='#26A27B' />
              </RightDots>

              <StatDisplay>
                <StatImage>
                  <img src='/year-in-review/largest-order-icon.svg' className='largest-order-icon' />
                </StatImage>
                <StatMain>{formattedLargestOrderTotal}</StatMain>
                <StatSubcopy>{formattedDate}</StatSubcopy>
              </StatDisplay>
            </CircleBackground>
          </Top>

          <Bottom>
            <Headline>Largest Order</Headline>
            <Copy>
              The largest order you processed this year was on {formattedDate} for {formattedLargestOrderTotal}. This
              order was <Bold> {Math.round(largestOrder?.percentageHigher * 100)}% </Bold> larger than your average
              order value.
            </Copy>
          </Bottom>
        </Card>
      </CardsContainer>
    </TopSellerLargestOrderSectionStyles>
  );
}

const TopSellerLargestOrderSectionStyles = styled(Wrapper)`
  margin-top: 150px;
  margin-bottom: 200px;

  @media ${mediaQueries.largePhone} {
    margin-bottom: 120px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  justify-content: center;

  @media ${mediaQueries.largeDesktop} {
    width: 100%;
  }

  @media ${mediaQueries.tablet} {
    flex-direction: column;
    width: 80%;
    /* margin: 300px auto 200px; */
  }

  @media ${mediaQueries.largePhone} {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  @media ${mediaQueries.phone} {
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Card = styled.div`
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  flex-direction: column;
  background-color: ${(props) => `${props.bgColor}`};
  width: 598.73px;
  height: 697.89px;
  text-align: center;
  border-radius: 20px;
  justify-content: center;
  position: relative;
  margin: 0 5px;

  @media ${mediaQueries.largeDesktop} {
    margin: 0 5px;
  }

  @media ${mediaQueries.desktop} {
    width: 100%;
  }

  @media ${mediaQueries.tablet} {
    max-width: 500px;
    margin: 5px auto;
  }

  @media ${mediaQueries.largePhone} {
    height: 608px;
    width: 100%;
  }
`;

const CircleBackground = styled.div`
  width: 331.77px;
  height: 331.77px;
  border-radius: 50%;
  background-color: ${(props) => `${props.color}`};
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${mediaQueries.largePhone} {
    width: 278.25px;
    height: 278.25px;
  }

  @media ${mediaQueries.smallPhone} {
    width: 250px;
    height: 250px;
  }
`;

const LeftDots = styled.div`
  position: absolute;
  top: -10px;
  right: -29px;

  @media ${mediaQueries.largePhone} {
    width: 210.95px;
    height: 162.83px;
    top: -18px;
    right: -32px;
    overflow: hidden;
  }

  @media ${mediaQueries.iPhone5} {
    top: -15px;
    right: -30px;
  }
`;

const RightDots = styled.div`
  position: absolute;
  top: -10px;
  left: -29px;

  @media ${mediaQueries.largePhone} {
    width: 210.95px;
    height: 162.83px;
    left: -23px;
    top: -18px;
    overflow: hidden;
  }

  @media ${mediaQueries.iPhone5} {
    top: -15px;
    left: -23px;
  }
`;

const Top = styled.div`
  @media ${mediaQueries.largePhone} {
    width: 80%;
    margin: 0 auto;
  }

  @media ${mediaQueries.iPhone5} {
    width: 100%;
    height: 214.84px;
  }
`;

const Bottom = styled.div`
  margin-top: 50px;
  height: 20%;

  p {
    width: 70%;
    margin: auto;
  }

  span {
    font-weight: bold;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 25px;
    line-height: 30px;

    p {
      font-size: 15px;
      line-height: 23px;
    }
  }
`;

const StatDisplay = styled.div`
  width: 269.98px;
  height: 278.08px;
  background: #ffffff;
  box-shadow: 0px 30px 44px rgba(36, 15, 15, 0.12);
  border-radius: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  -webkit-print-color-adjust: exact;
  -webkit-filter: opacity(1);

  @media ${mediaQueries.largePhone} {
    width: 228.29px;
    height: 224.84px;
  }

  @media ${mediaQueries.smallPhone} {
    width: 188.29px;
    height: 214.84px;
  }
`;

const StatImage = styled.div`
  margin: auto;
  width: 50%;

  img {
    width: 100%;
    height: auto;
  }

  .largest-order-icon {
    width: 70%;
  }
`;

const StatMain = styled.div`
  font-weight: bold;
  font-size: 19px;
  line-height: 24px;
  text-align: center;
  color: #242526;
  margin-bottom: 10px;
`;

const StatSubcopy = styled.div`
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: #677882;
`;

const Bold = styled.span`
  font-weight: bold;
`;
