/* eslint-disable lodash/matches-prop-shorthand */
/* eslint-disable max-len */
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import styled, { css } from 'styled-components';
import { mediaQueries } from 'shared/styles';
import { Wrapper } from '../../components/wrapper';
import { Headline } from '../../components/headline';
import { LinebreakMobile } from '../../components/linebreak-mobile';
import { formatNumber, formatCurrency } from '../../helpers';

export function BusiestDaySection({ busiestDay, orderTypes }) {
  const { day, totalOrders, totalSales, percentageIncrease } = busiestDay;
  const momentDay = moment(day);
  const shortDay = momentDay.format('MMMM D');
  const pronouncedDay = momentDay.format('MMMM Do');
  const yearDay = momentDay.format('MMMM D, YYYY');
  const percentHigher = Math.round(percentageIncrease);
  const pickupOrderTypes = _.reject(orderTypes, (orderType) => orderType.name === 'delivery');
  const deliveryOrderTypes = _.filter(orderTypes, (orderType) => orderType.name === 'delivery');
  const totalPickupOrders = _.sumBy(pickupOrderTypes, (orderType) => _.parseInt(orderType.orders));
  const totalDeliveryOrders = _.sumBy(deliveryOrderTypes, (orderType) => _.parseInt(orderType.orders));

  return (
    <BusiestDaySectionStyles>
      <Container>
        <Left>
          <BackgroundShapesDesktop src='/year-in-review/busiest-day-background-shapes.svg' />
          <BackgroundShapesMobile src='/year-in-review/mobile-busiest-day-background.svg' />
          <StatsCardsContainer>
            <StatsCardDay>
              <StatsCardDateTitle>{shortDay}</StatsCardDateTitle>
              <StatsCardDateCopyWrapper>
                <StatsCardCopy>
                  Your busiest day of the year was {pronouncedDay}. You processed <b>{formatNumber(totalOrders)}</b>{' '}
                  orders and <b>{formatCurrency(totalSales)}</b> in sales.
                </StatsCardCopy>
              </StatsCardDateCopyWrapper>
              <Bargraph src='/year-in-review/busiest-day-bargraph.svg' />
            </StatsCardDay>

            {totalPickupOrders > 0 && (
              <StatsCardTime>
                <Icon src='/year-in-review/icon-clock-cart.svg' />
                <StatsCardTitle>{formatNumber(totalPickupOrders)} Pickups</StatsCardTitle>
                <StatsCardCopy>
                  You processed a total of {formatNumber(totalPickupOrders)} pickup orders in 2021.
                </StatsCardCopy>
              </StatsCardTime>
            )}
            {totalDeliveryOrders > 0 && (
              <StatsCardDeliveries>
                <Icon src='/year-in-review/icon-clock-delivery.svg' />
                <StatsCardTitle>{formatNumber(totalDeliveryOrders)} Deliveries</StatsCardTitle>
                <StatsCardCopy>You made {formatNumber(totalDeliveryOrders)} total deliveries in 2021.</StatsCardCopy>
              </StatsCardDeliveries>
            )}
          </StatsCardsContainer>
        </Left>
        <Right>
          <Headline>
            Sales were up {percentHigher}% on
            <LinebreakMobile /> your busiest day of the
            <LinebreakMobile /> year.
          </Headline>
          <Copy className='copy'>
            The busiest day for your dispensary was {yearDay}. You did <b>{formatCurrency(totalSales)}</b> in total
            online sales. That's <b>{percentHigher}%</b> over your average daily sales.
          </Copy>
        </Right>
      </Container>
    </BusiestDaySectionStyles>
  );
}

const BusiestDaySectionStyles = styled(Wrapper)`
  padding-bottom: 60px;

  @media ${mediaQueries.largePhone} {
    padding-bottom: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 1155px;
  margin: 10px auto;
  overflow: visible;

  @media ${mediaQueries.desktop} {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const Copy = styled.p`
  font-size: 18px;
  line-height: 28px;
  font-weight: normal;
  color: #4f5d68;
  font-family: 'proxima-nova', Helvetica, arial, sans-serif;
  padding: 0px 5px;
  width: 100%;

  @media ${mediaQueries.largeDesktop} {
    font-size: 17px;
    line-height: 26px;
  }

  @media ${mediaQueries.largeTablet} {
    font-size: 16px;
    line-height: 24px;
    width: 90%;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 15px;
    line-height: 23px;
  }
`;

const Left = styled.div`
  display: flex;
  position: relative;
  flex: 0 0 60%;
  height: 664px;
  width: 100%;
  max-width: 701px;

  @media ${mediaQueries.desktop} {
    flex: auto;
  }

  @media ${mediaQueries.largePhone} {
    height: 651px;
    max-width: 500px;
  }
`;

const Right = styled.div`
  display: flex;
  flex: 0 1 38%;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  margin-left: 85px;
  width: 100%;
  padding-top: 172px;

  ${Copy} {
    max-width: 402px;

    @media ${mediaQueries.desktop} {
      margin: 0 auto;
    }
  }

  @media ${mediaQueries.largeDesktop} {
    margin-left: 50px;
  }

  @media ${mediaQueries.desktop} {
    padding-top: 0;
    margin: 0 auto 80px auto;
    text-align: center;
  }
`;

const BackgroundShapesDesktop = styled.img`
  position: absolute;
  top: 50px;
  right: 93px;
  width: 100%;
  max-width: 542px;

  @media ${mediaQueries.largePhone} {
    display: none;
  }
`;

const BackgroundShapesMobile = styled.img`
  display: none;
  position: absolute;
  top: 95px;
  left: 50%;
  min-width: 500px;
  transform: translateX(-54%);

  @media ${mediaQueries.largePhone} {
    display: block;
  }
`;

const StatsCardsContainer = styled.div`
  max-width: 400px;
`;

const StatsCardStyles = css`
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.17);
  position: absolute;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  -webkit-print-color-adjust: exact;
  -webkit-filter: opacity(1);

  @media ${mediaQueries.largeTablet} {
    padding: 20px 18px;
  }
`;

const StatsCardTime = styled.div`
  ${StatsCardStyles}
  width: 250px;
  height: 270px;
  bottom: -50px;
  left: -45px;

  bottom: 0;
  left: 0;

  @media ${mediaQueries.largePhone} {
    width: 205px;
    height: 220px;
  }
`;

const StatsCardDay = styled.div`
  ${StatsCardStyles}
  width: 396px;
  height: 353px;
  /* bottom: 140px; */
  /* left: 80px; */

  top: 115px;
  left: 50%;
  transform: translateX(-55%);

  @media ${mediaQueries.largeDesktop} {
    transform: translateX(-61%);
  }

  @media ${mediaQueries.largePhone} {
    top: 165px;
    width: 318px;
    height: 307px;
    transform: translateX(-50%);
  }
`;

const StatsCardDeliveries = styled.div`
  ${StatsCardStyles}
  width: 250px;
  height: 240px;
  top: -50px;
  right: -30px;

  top: 0;
  right: 0;

  @media ${mediaQueries.largePhone} {
    width: 205px;
    height: 193px;
  }
`;

const Icon = styled.img`
  width: 90px;

  @media ${mediaQueries.largePhone} {
    width: 73.28px;
    height: 73.28px;
  }

  @media ${mediaQueries.smallPhone} {
    width: 53.28px;
    height: 53.28px;
  }
`;

const Bargraph = styled.img`
  align-self: center;
  width: 100%;

  @media ${mediaQueries.iPhone5} {
    width: 257.11px;
  }
`;

const StatsCardTitle = styled.h3`
  font-size: 25px;
  font-weight: 700;
  color: #242526;

  @media ${mediaQueries.largePhone} {
    font-size: 20px;
    line-height: 27px;
  }
`;

const StatsCardCopy = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  color: #4f5d68;

  b {
    font-weight: bold;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 14px;
    line-height: 21px;
  }
`;

const StatsCardDateTitle = styled.h2`
  font-size: 36px;
  line-height: 43px;
  color: #242526;
  font-weight: 500;

  @media ${mediaQueries.largePhone} {
    font-size: 20px;
    line-height: 27px;
    font-weight: bold;
  }
`;

const StatsCardDateCopyWrapper = styled.div`
  width: 67%;

  @media ${mediaQueries.largePhone} {
    font-size: 14px;
    line-height: 21px;
  }

  @media ${mediaQueries.largePhone} {
    width: 100%;
  }
`;
