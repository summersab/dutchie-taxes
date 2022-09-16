/* eslint-disable import/order */
import React from 'react';
import styled from 'styled-components';

import { formatMoneyAbbr, formatCurrency, formatNumber } from '../../helpers';
import { mediaQueries } from 'shared/styles';
import { Copy } from '../../components/copy';
import { Wrapper } from '../../components/wrapper';
import { Headline } from '../../components/headline';
import { LinebreakMobile } from '../../components/linebreak-mobile';
import { LinebreakDesktop } from '../../components/linebreak-desktop';

export function DutchieTotals(props) {
  const { totalSales } = props;
  const formattedSalesTotalAbbr = formatMoneyAbbr(Math.round(totalSales.salesTotal));
  const formattedTotalSales = formatCurrency(totalSales.salesTotal, { trimCents: true });
  const formattedOrders = formatNumber(totalSales.onlineOrdersTotal);

  return (
    <DutchieTotalsSectionStyles>
      <DutchieTotalsSection>
        <Headline>
          Let's take a look back at
          <LinebreakMobile /> your
          <LinebreakDesktop /> 2021 on Dutchie Ecommerce.
        </Headline>
        <Copy>
          It was a big year for cannabis and your store. To celebrate, we’ve brought together some interesting (and fun)
          statistics about how your store performed on Dutchie Ecommerce in 2021. Enjoy!
        </Copy>
        <StatsSections>
          <OnlineOrderStat>
            <Content>
              <OnlineOrderTotal>{formattedOrders}</OnlineOrderTotal>
              <p>Your store processed a total of {formattedOrders} online orders through Dutchie Ecommerce.</p>
            </Content>
            <OnlineOrderIconBackground>
              <img src='/year-in-review/online-orders-icon.svg' />
            </OnlineOrderIconBackground>
          </OnlineOrderStat>
          <SalesStat>
            <Content>
              <TotalSalesStat>{formattedSalesTotalAbbr}</TotalSalesStat>
              <p>Your store did a total of {formattedTotalSales} in sales through Dutchie Ecommerce.</p>
            </Content>
            <SalesStatIconBackground>
              <img src='/year-in-review/sales-icon.svg' />
            </SalesStatIconBackground>
          </SalesStat>
        </StatsSections>
      </DutchieTotalsSection>
    </DutchieTotalsSectionStyles>
  );
}

const DutchieTotalsSectionStyles = styled(Wrapper)`
  margin-bottom: 345px;

  @media ${mediaQueries.tablet} {
    margin-bottom: 190px;
  }
`;

const DutchieTotalsSection = styled.div`
  text-align: center;

  position: relative;
  padding: 0 !important;
  height: 700px;

  h2,
  p {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }

  /* @media ${mediaQueries.tablet} {
    h2,
    p {
      width: 80%;
    }
  } */
`;

const StatsSections = styled.div`
  display: flex;
  flex-direction: row;
  margin: 150px auto;
  justify-content: center;
  background-image: url('/year-in-review/total-sales-background.svg');
  max-width: 1167.29px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  //   @media ${mediaQueries.largeTablet} {
  //     width: 100%;
  //   }

  @media ${mediaQueries.phone} {
    margin: 80 auto 150px;
    /* background-image: url('/year-in-review/mobile-total-sales-background.svg'); */
    background-size: cover;
    background-position: 50% 50%;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const OnlineOrderStat = styled.div`
  background-color: #e4e1f5;
  width: 306px;
  height: 306px;
  border-radius: 50%;
  font-size: 18px;
  color: #2e365f;
  text-align: center;
  border: 10px solid #ffffff;
  position: relative;
  top: -80px;
  left: 30px;

  p {
    width: 80%;
    line-height: 27px;
    display: inline-block;
  }

  @media ${mediaQueries.largeTablet} {
    min-width: 212.81px;
    max-width: 212.81px;
    height: 212.81px;
    border: 5px solid #ffffff;
    top: -30px;
    left: 70px;

    p {
      width: 90%;
      font-size: 13px;
      line-height: 20px;
    }
  }

  @media ${mediaQueries.phone} {
    top: -30px;
    left: 88px;
  }

  @media ${mediaQueries.iPhone5} {
    top: -30px;
    left: 110px;
  }
`;

const OnlineOrderTotal = styled.div`
  font-weight: bold;
  font-size: 45px;
  margin-bottom: 10px;

  @media ${mediaQueries.largeTablet} {
    font-size: 35px;
    line-height: 43px;
    margin-bottom: 5px;
  }
`;

const OnlineOrderIconBackground = styled.div`
  width: 78.57px;
  height: 78.57px;
  background: #f58f51;
  border: 5px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  right: 20px;
  display: flex;
  align-items: center;
  img {
    margin: auto;
  }

  @media ${mediaQueries.largeTablet} {
    width: 52.75px;
    height: 52.75px;
    border: 3px solid #ffffff;
    top: -30px;
    right: 30px;

    img {
      width: 70%;
    }
  }
`;

const SalesStat = styled.div`
    width: 413px;
    height: 413px;
    background: #868CDD;
    border: 10px solid #FFFFFF;
    border-radius: 50%;
    position:relative;
    line-height: 31px;
    color: #FFFFFF;
    font-size: 24px;
    bottom:-85px;
    left: -70px;

    p {
        width: 85%;
        display: inline-block
        line-height: 31px;
        margin: auto;
    }

    @media ${mediaQueries.largeTablet} {
        min-width: 295.72px;
        max-width: 295.72px;
        height: 295.72px;
        border: 5px solid #ffffff;
        bottom: -120px;
        left: -70px;

        p {
            font-size: 19px;
            line-height: 24px;
        }
      }

      @media ${mediaQueries.phone} {
        bottom: -130px;
      left: -80px;
      }

    @media ${mediaQueries.iPhone5} { 
      bottom: -150px;
      left: -110px;
    }
`;

const TotalSalesStat = styled.div`
  font-size: 60px;
  line-height: 43px;
  font-weight: bold;
  margin-bottom: 30px;

  @media ${mediaQueries.largeTablet} {
    font-size: 45px;
    line-height: 43px;
    margin-bottom: 15px;
  }
`;

const SalesStatIconBackground = styled.div`
  width: 81.43px;
  height: 81.43px;
  background: #26a27b;
  border: 5px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 30px;
  display: flex;
  align-items: center;
  img {
    margin: auto;
  }

  @media ${mediaQueries.largeTablet} {
    width: 54.54px;
    height: 54.54px;
    border: 3px solid #ffffff;

    img {
      width: 80%;
      height: 70%;
    }
  }
`;
