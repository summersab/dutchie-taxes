/* eslint-disable max-len */
import React from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';

import { mediaQueries } from 'shared/styles';

import { Dots } from '../../components/dots';
import { Copy } from '../../components/copy';
import { Wrapper } from '../../components/wrapper';
import { Headline } from '../../components/headline';
import { LinebreakMobile } from '../../components/linebreak-mobile';
import { LinebreakDesktop } from '../../components/linebreak-desktop';
import { formatMoneyAbbrDontRound } from '../../helpers';

import { Chart } from './components/chart';
import { getColorByIndex } from './helpers';

const orderTypeToNameMap = {
  kiosk: 'Kiosk',
  delivery: 'Delivery',
  pickup: 'In-Store Pickup',
  pickup_curbside: 'Curbside Pickup',
  pickup_drivethru: 'Drive Thru Pickup',
};

export function OrderTypesSection(props) {
  const { orderTypes } = props;

  const topOrderType = _.reduce(orderTypes, (a, b) => (a.value > b.value ? a : b));

  console.log('top order type', topOrderType);

  const filtered = _.filter(orderTypes, (orderType) => orderType.value > 0);
  const count = filtered.length;
  const sorted = _.sortBy(filtered, (orderType) => -orderType.value);

  return (
    <OrderTypesSectionStyles expanded={sorted.length === 5}>
      <Container>
        <Left>
          <StyledDots fill='#EE7B78' />
          <Image>
            <GraphCard>
              <Headline>ORDER TYPES</Headline>
              <Chart orderTypes={sorted} />
            </GraphCard>
            <OrderTypesContainer>
              {_.map(sorted, ({ name, value, percentage }, index) => (
                <OrderTypeCard index={index} key={name}>
                  <Dot color={getColorByIndex(index)} />
                  <CardName>{orderTypeToNameMap[name]}</CardName>
                  <CardValue>{formatMoneyAbbrDontRound(value)}</CardValue>
                  <CardPercentage>({Math.round(percentage)}%)</CardPercentage>
                </OrderTypeCard>
              ))}
            </OrderTypesContainer>
          </Image>
        </Left>
        <Right>
          <Headline>
            {orderTypeToNameMap[topOrderType.name]} <LinebreakDesktop />
            drove the <LinebreakMobile />
            most sales.
          </Headline>
          <StyledCopy>
            You offered customers {count} order type{count > 1 ? 's' : ''}, {count > 1 ? 'including' : ''}{' '}
            {orderTypeToNameMap[topOrderType.name]}, which accounted for {formatMoneyAbbrDontRound(topOrderType.value)}{' '}
            and {Math.round(topOrderType.percentage)}
            %&nbsp;of&nbsp;your&nbsp;overall sales.
          </StyledCopy>
        </Right>
      </Container>
    </OrderTypesSectionStyles>
  );
}

// Shared Styles
const sideStyles = css`
  position: relative;
  flex: 0 0 50%;

  @media ${mediaQueries.desktop} {
    width: 100%;
  }
`;

// Containers
const OrderTypesSectionStyles = styled(Wrapper)`
  margin-bottom: ${(props) => (props.expanded ? '290px' : '200px')};
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1155px;

  @media ${mediaQueries.desktop} {
    align-items: center;
    flex-direction: column-reverse;
  }
`;

const Left = styled.div`
  ${sideStyles}
  padding-top: 0px;

  @media ${mediaQueries.desktop} {
    display: flex;
    justify-content: center;
  }
`;

const Right = styled.div`
  ${sideStyles}
  padding-top: 120px;
  padding-left: 12%;
  // percent vs. fixed?
  /* padding-left: 140px; */

  @media ${mediaQueries.desktop} {
    text-align: center;
    margin-bottom: 60px;
    padding: 0;
  }
`;

// Right Side
const StyledCopy = styled(Copy)`
  max-width: 402px;

  @media ${mediaQueries.desktop} {
    /* max-width: unset; */
    margin: 0 auto;
  }
`;

// Left Side
const Image = styled.div`
  position: relative;
  width: 85%;
  max-width: 493px;
  height: 635px;
  border-radius: 20px;
  background-image: url('/year-in-review/person-with-phone.png');
  background-size: cover;
  background-position: 50% 0;
  z-index: 1;

  @media ${mediaQueries.desktop} {
    width: 100%;
  }

  @media ${mediaQueries.largePhone} {
    height: 435px;
    max-width: 342px;
  }
`;

const StyledDots = styled(Dots)`
  position: absolute;
  top: 0;
  right: 0;

  @media ${mediaQueries.desktop} {
    display: none;
  }
`;

const GraphCard = styled.div`
  position: absolute;
  top: -25px;
  right: -44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 224px;
  width: 232px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 35px 74px rgba(40, 63, 77, 0.17);

  -webkit-print-color-adjust: exact;
  -webkit-filter: opacity(1);

  ${Headline} {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 2px;
    margin-top: 18px;
  }

  @media ${mediaQueries.largePhone} {
    display: none;
  }
`;

const OrderTypesContainer = styled.div`
  position: absolute;
  top: 250px;
  left: 260px;
  width: 100%;
  z-index: 1;

  @media ${mediaQueries.largeDesktop} {
    left: 100px;
    top: 320px;
  }

  @media ${mediaQueries.largePhone} {
    top: 310px;
    left: -8px;
  }
`;

const OrderTypeCard = styled.div`
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 26px;
  width: 100%;
  height: 71px;
  max-width: 381px;
  margin-bottom: 26px;
  margin-left: ${(props) => `${props.index * 60}px`};
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 20px 34px rgba(36, 15, 15, 0.13);

  -webkit-print-color-adjust: exact;
  -webkit-filter: opacity(1);

  @media ${mediaQueries.desktop} {
    width: 67%;
    margin-left: ${(props) => `${props.index * 12}%`};
  }

  @media ${mediaQueries.largePhone} {
    width: 244px;
    height: 43px;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-left: 14px;
    padding-right: 14px;
    margin-left: ${(props) => `${props.index * 8}%`};
  }
`;

const Dot = styled.div`
  height: 13px;
  width: 13px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
  margin-right: 18px;

  @media ${mediaQueries.largePhone} {
    display: none;
  }
`;

const CardName = styled.span`
  font-size: 20px;
  color: #242526;
  font-weight: normal;
  margin-right: auto;
  white-space: nowrap;

  @media ${mediaQueries.largePhone} {
    font-size: 14px;
  }
`;

const CardValue = styled.span`
  font-size: 20px;
  color: #242526;
  font-weight: bold;

  @media ${mediaQueries.largePhone} {
    font-size: 14px;
  }
`;

const CardPercentage = styled.span`
  font-size: 20px;
  color: #242526;
  font-weight: normal;
  margin-left: 5px;

  display: none;

  @media ${mediaQueries.largePhone} {
    font-size: 15px;
    display: block;
  }
`;
