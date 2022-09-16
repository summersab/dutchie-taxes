/* eslint-disable arrow-body-style */
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

const competition = [
  {
    name: 'Best Buy',
    rate: 0.011,
    logo: '/year-in-review/best-buy-logo.svg',
  },
  {
    name: 'Target',
    rate: 0.0227,
    logo: '/year-in-review/target-logo.svg',
    mobileLogo: '/year-in-review/target-mobile-logo.svg',
  },
  {
    name: 'Walmart',
    rate: 0.029,
    logo: '/year-in-review/walmart-logo.svg',
    mobileLogo: '/year-in-review/walmart-mobile-logo.svg',
  },
  {
    name: 'Ebay',
    rate: 0.0589,
    logo: '/year-in-review/ebay-logo.svg',
  },
  {
    name: 'Amazon',
    rate: 0.13,
    logo: '/year-in-review/amazon-logo.svg',
    mobileLogo: '/year-in-review/amazon-mobile-logo.svg',
  },
];

export function ConversionRateSection(props) {
  const { conversionRate = 0 } = props;
  const topRate = Math.max(0.13, conversionRate);

  const getConversionRateIncrease = (rate) => {
    const increase = (rate * 100 - 2.38) / 2.38;
    return increase * 100;
  };
  return (
    <ConversionRateSectionStyles>
      <Container>
        <Headline>
          Your conversion rate
          <LinebreakMobile /> was {Math.round(getConversionRateIncrease(conversionRate))}% higher than
          <LinebreakMobile />
          <LinebreakDesktop /> the global average for
          <LinebreakMobile /> ecommerce.
        </Headline>
        <StyledCopy>
          Your conversion rate is one of the most important
          <LinebreakMobile /> metrics in assessing the performance
          <LinebreakDesktop /> of your
          <LinebreakMobile /> online store. Let's check out your conversion rate
          <LinebreakMobile /> for 2021.
        </StyledCopy>

        <Graphic>
          <StyledDots fill='#572E83' />

          <Card>
            <CardText>
              <Headline>How do you stack up?</Headline>
              <Copy>
                Let's see how your conversion
                <LinebreakMobile /> rate compares to
                <LinebreakDesktop /> some of the
                <LinebreakMobile /> largest ecommerce companies
                <LinebreakMobile /> on
                <LinebreakDesktop /> the internet.
              </Copy>
            </CardText>

            <ChartGroup>
              <Chart>
                {_.map(competition, (retailer) => {
                  return (
                    <Bar key={retailer.name} rate={retailer.rate} multiplier={parseFloat(retailer.rate) / topRate} />
                  );
                })}
                <Bar dutchie rate={conversionRate} multiplier={conversionRate / topRate} />
              </Chart>
              <ChartLegend>
                {_.map(competition, (retailer) => {
                  return (
                    <ChartLabel name={retailer.name} key={retailer.name}>
                      <Logo src={retailer.logo} className={_.kebabCase(retailer.name)} />
                      {retailer.mobileLogo && (
                        <MobileLogo src={retailer.mobileLogo} className={_.kebabCase(retailer.name)} />
                      )}
                    </ChartLabel>
                  );
                })}
                <ChartLabel>
                  Your Dutchie
                  <LinebreakDesktop /> store
                </ChartLabel>
              </ChartLegend>
            </ChartGroup>
          </Card>

          <PinkCircle>
            <Headline>2.58%</Headline>
            <Copy>
              The average global
              <br /> ecommerce conversion
              <LinebreakDesktop /> rate
              <LinebreakMobile /> was 2.58%.
            </Copy>
          </PinkCircle>

          <PurpleCircle>
            <Headline>{(conversionRate * 100).toFixed(2)}%</Headline>
            <Copy>
              Your average
              <LinebreakDesktop /> conversion
              <LinebreakMobile /> rate with
              <LinebreakDesktop /> Dutchie Ecommerce was
              <LinebreakMobile /> {(conversionRate * 100).toFixed(2)}%.
            </Copy>
          </PurpleCircle>
        </Graphic>
      </Container>
    </ConversionRateSectionStyles>
  );
}

// Shared Styled
const circleStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 10px solid #f6f0fb;
`;

// Containers
const ConversionRateSectionStyles = styled(Wrapper)`
  padding-bottom: 200px;

  @media ${mediaQueries.largePhone} {
    padding-bottom: 80px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
`;

// Text
const StyledCopy = styled(Copy)`
  max-width: 710px;
`;

// Content
const Graphic = styled.div`
  position: relative;
  width: 100%;
  padding-top: 33px;
  padding-bottom: 80px;
  margin-top: 68px;

  @media ${mediaQueries.desktop} {
    padding-top: 380px;
  }

  @media ${mediaQueries.largePhone} {
    padding-top: 300px;
    padding-bottom: 0;
  }
`;

const StyledDots = styled(Dots)`
  position: absolute;
  bottom: 135px;
  left: 26px;

  @media ${mediaQueries.desktop} {
    display: none;
  }
`;

// Card
const Card = styled.div`
  height: 465px;
  width: 852px;
  width: calc(100% - 228px);
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 30px 44px rgba(36, 15, 15, 0.12);
  position: relative;
  margin-left: auto;

  -webkit-print-color-adjust: exact;
  -webkit-filter: opacity(1);

  @media ${mediaQueries.desktop} {
    height: 600px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    padding: 50px 10px;
  }

  @media ${mediaQueries.largePhone} {
    height: 525px;
    max-width: 350px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
  }
`;

const CardText = styled.div`
  position: absolute;
  top: 56px;
  left: 150px;
  text-align: left;

  ${Headline} {
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 12px;
  }

  ${Copy} {
    font-size: 16px;
    line-height: 23px;
  }

  @media ${mediaQueries.desktop} {
    top: 195px;
    left: 45px;
  }

  @media ${mediaQueries.largePhone} {
    top: 170px;
    left: 26px;

    ${Copy} {
      font-size: 14px;
      line-height: 21px;
    }
  }
`;

// Chart
const ChartGroup = styled.div`
  position: absolute;
  bottom: 50px;
  right: 33px;
  width: 67%;
  max-width: calc(100% - 260px);

  @media ${mediaQueries.desktop} {
    position: relative;
    right: unset;
    bottom: unset;
    width: 100%;
    max-width: unset;
  }
`;

const Chart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const Bar = styled.div`
  position: relative;
  width: 30px;
  height: ${(props) => `${_.clamp(props.multiplier * 254, 0, 254)}px`};
  border-radius: 50px;
  background-color: ${(props) => (props.dutchie ? '#5DCC7F' : '#dad1e1')};

  &::before {
    content: ${(props) => `'${(props.rate * 100).toFixed(2)}%'`};
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => (props.dutchie ? '#118A67' : '#242526')};
  }

  @media ${mediaQueries.largePhone} {
    width: 12px;

    &::before {
      top: -28px;
      font-size: 13px;
    }
  }
`;

const ChartLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 25px;

  @media ${mediaQueries.largePhone} {
    padding-top: 15px;
  }
`;

const ChartLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 30px; */
  width: 100%;
  max-width: 80px;

  font-weight: bold;
  font-size: 12px;
  line-height: 120%;
`;

const Logo = styled.img`
  display: block;

  &.best-buy {
    width: 46px;
  }

  &.target {
    width: 72px;
  }

  &.walmart {
    width: 70px;
  }

  &.ebay {
    width: 58px;
  }

  &.amazon {
    width: 57px;
  }

  @media ${mediaQueries.largePhone} {
    &.best-buy {
      width: 35px;
    }

    &.ebay {
      width: 40px;
    }

    &.target,
    &.walmart,
    &.amazon {
      display: none;
    }
  }
`;

const MobileLogo = styled.img`
  display: none;

  @media ${mediaQueries.largePhone} {
    display: block;
    &.target {
      width: 19px;
    }

    &.walmart {
      width: 26px;
    }

    &.amazon {
      width: 24px;
    }
  }
`;

// Circles
const PinkCircle = styled.div`
  ${circleStyles}
  position: absolute;
  top: 0;
  left: 0;
  height: 297px;
  width: 297px;
  background-color: #efd2e1;

  ${Headline} {
    color: #4f1c4a;
    font-size: 54px;
    line-height: 22px;
  }

  ${Copy} {
    color: #4f1c4a;
    font-size: 17px;
    line-height: 25px;
  }

  @media ${mediaQueries.desktop} {
    /* display: none; */
    top: 0;
    left: 50%;
    transform: translateX(-25%);
  }

  @media ${mediaQueries.largePhone} {
    /* display: none; */
    top: 0;
    left: 50%;
    transform: translateX(-25%);

    height: 226px;
    width: 226px;
    padding-bottom: 20px;

    ${Headline} {
      font-size: 35px;
      line-height: 43px;
      margin-bottom: 8px;
    }

    ${Copy} {
      font-size: 13px;
      line-height: 20px;
    }
  }
`;

const PurpleCircle = styled.div`
  ${circleStyles}
  position: absolute;
  bottom: 0;
  left: 81px;
  height: 368px;
  width: 368px;
  background-color: #6c72bb;

  ${Headline} {
    color: #ffffff;
    font-size: 60px;
    line-height: 43px;
  }

  ${Copy} {
    color: #ffffff;
    font-size: 24px;
    line-height: 31px;
  }

  @media ${mediaQueries.desktop} {
    /* display: none; */
    top: 200px;
    left: 50%;
    transform: translateX(-75%);
  }

  @media ${mediaQueries.largePhone} {
    /* display: none; */
    top: 159px;
    left: 50%;
    transform: translateX(-62%);

    height: 280px;
    width: 280px;

    ${Headline} {
      font-size: 45px;
      margin-bottom: 15px;
    }

    ${Copy} {
      font-size: 19px;
      line-height: 24px;
    }
  }
`;
