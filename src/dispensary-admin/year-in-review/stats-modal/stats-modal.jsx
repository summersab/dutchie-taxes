import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { mediaQueries } from 'shared/styles';
import _ from 'lodash';

import { FullPageSpinner } from 'src/components/full-page-spinner';
import { HeroSection } from './sections/hero-section';
import { DutchieTotals } from './sections/dutchie-totals';
import { OrderTypesSection } from './sections/order-types-section';
import { CategorySpotlightSection } from './sections/category-spotlight';
import { ConversionRateSection } from './sections/conversion-rate-section';
import { BusiestDaySection } from './sections/busiest-day-section';
import { TotalPoundsSection } from './sections/total-pounds';
import { DutchieNumbersSection } from './sections/dutchie-numbers';
// import { TimelineSection } from './sections/timeline-section/timeline-section';
import { TopSellerLargestOrder } from './sections/top-seller-largest-order';
import { ThankYouSection } from './sections/thank-you';
import { BackgroundTop, BackgroundBottom } from './components/background';

const fadeTime = 3;

export function StatsModal({
  categories,
  orderTypes,
  conversionRate,
  totalPounds,
  totalSales,
  topSeller,
  largestOrder,
  busiestDay,
}) {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const handleImgLoad = () => {
    setLoading(false);
    _.delay(() => {
      setReady(true);
    }, fadeTime * 1000 + 500);
  };
  const shouldShowConversionRateSection = conversionRate > 0.03 && conversionRate < 0.3;
  const shouldShowOrderTypesSection = _.filter(orderTypes, (orderType) => orderType.percentage > 0).length > 1;
  return (
    <React.Fragment>
      {ready && <Ready id='loaded' />}
      {loading && <FullPageSpinner />}
      <Container hide={loading}>
        <HeroSection handleImgLoad={handleImgLoad} />
        <DutchieTotals totalSales={totalSales} />
        {shouldShowOrderTypesSection && <OrderTypesSection orderTypes={orderTypes} />}
        {!shouldShowOrderTypesSection && <Spacer />}
        <Thing addPadding={!shouldShowConversionRateSection}>
          <BackgroundTop height='1800px' y='-250px' />
          <CategorySpotlightSection categories={categories} />
          {shouldShowConversionRateSection && <ConversionRateSection conversionRate={conversionRate} />}
        </Thing>
        <BusiestDaySection busiestDay={busiestDay} orderTypes={orderTypes} />
        <TopSellerLargestOrder topSeller={topSeller} largestOrder={largestOrder} />
        <TotalPoundsSection totalPounds={totalPounds} />
        <Thing addPadding>
          <BackgroundBottom height='2500px' />
          <DutchieNumbersSection />
          {/* <TimelineSection /> */}
        </Thing>
        <ThankYouSection />
      </Container>
    </React.Fragment>
  );
}

const Ready = styled.div`
  height: 1px;
  width: 1px;
  position: absolute;
  top: 0;
  left: 0;
`;

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;
const Container = styled.div`
  animation: ${fadeIn} ease ${fadeTime}s;
  background-color: #ffffff;
  overflow: hidden;
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

const Thing = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: ${({ addPadding }) => (addPadding ? '300px' : 'inherit')};

  @media ${mediaQueries.largePhone} {
    padding-bottom: ${({ addPadding }) => (addPadding ? '150px' : 'inherit')};
  }
`;

const Spacer = styled.div`
  height: 240px;

  @media ${mediaQueries.largePhone} {
    height: 150px;
  }
`;
