/* eslint-disable lodash/prefer-lodash-method */
/* eslint-disable arrow-body-style */
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';
import { Headline } from '../../components/headline';
import { Wrapper } from '../../components/wrapper';
import { Copy } from '../../components/copy';
import { Dots } from '../../components/dots';
import { Category } from './components/category';
import { formatMoneyAbbr } from '../../helpers';

export function CategorySpotlightSection({ categories }) {
  const sortedCategories = categories.sort((a, b) => {
    return b.sales - a.sales;
  });
  sortedCategories.forEach((category) => {
    category.sales = Math.round(category.sales);
    category.salesPercent = Math.round(category.salesPercent);

    if (category.category.toLowerCase() === 'edible') {
      category.category = 'Edibles';
    }
  });
  const [first, second, third] = sortedCategories;
  const secondClause = `, followed by `;
  const thirdClause = `, then `;

  return (
    <CategorySpotlightSectionStyles>
      <Container>
        <Left>
          <HeaderBox>
            <Headline>
              {`${_.upperFirst(first.category)} took the top spot`}
              {second && secondClause}
              {second && <NoWrap>{_.toLower(second.category)}</NoWrap>}
              {third && `${thirdClause}${_.toLower(third.category)}`}.
            </Headline>
          </HeaderBox>
          <CopyBox>
            <Copy>{`${_.upperFirst(first.category)} was the big winner this year accounting for ${formatMoneyAbbr(
              first.sales
            )} and ${first.salesPercent}% of your overall online sales in 2021.`}</Copy>
          </CopyBox>
        </Left>
        <Right>
          <DotsBox>
            <Dots />
          </DotsBox>
          <DualCategory>
            <Category category={first} place='first' />
            {third && <Category category={third} place='third' />}
          </DualCategory>
          {second && <Category category={second} place='second' />}
        </Right>
      </Container>
    </CategorySpotlightSectionStyles>
  );
}

const CategorySpotlightSectionStyles = styled(Wrapper)`
  margin-bottom: 200px;

  @media ${mediaQueries.largeTablet} {
    margin-bottom: 200px;
  }

  @media ${mediaQueries.largePhone} {
    margin-bottom: 150px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* padding: 0 40px; */

  @media ${mediaQueries.largePhone} {
    flex-direction: column;
    padding: 0 20px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 0 0 45%;

  @media ${mediaQueries.largeDesktop} {
    flex: 0 1 50%;
  }

  @media ${mediaQueries.largeTablet} {
    padding-right: 60px;
  }

  @media ${mediaQueries.largePhone} {
    text-align: center;
    flex: 0 0 100%;
    padding-right: 0px;
  }
`;

const NoWrap = styled.span`
  white-space: nowrap;
`;

const CopyBox = styled.div`
  max-width: 402px;
`;

const HeaderBox = styled.div`
  max-width: 380px;
  @media ${mediaQueries.largePhone} {
    max-width: 280px;
    margin: 0 auto;
  }
`;

const Right = styled.div`
  display: flex;
  flex: 0 0 55%;
  align-items: center;
  justify-content: center;
  position: relative;

  @media ${mediaQueries.largeDesktop} {
    flex: 0 0 50%;
  }

  @media ${mediaQueries.largePhone} {
    flex: 0 0 100%;
    margin-top: 54px;
  }
`;

const DualCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 624px;

  @media ${mediaQueries.largeDesktop} {
    height: 580px;
  }

  @media ${mediaQueries.desktop} {
    height: 520px;
  }

  @media ${mediaQueries.largeTablet} {
    height: 460px;
  }

  @media ${mediaQueries.largePhone} {
    height: 350px;
    padding-left: 10px;
  }
`;

const DotsBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 37.5%;
  transform: translate(-50%, 35%);
  z-index: 0;

  @media ${mediaQueries.largeTablet} {
    transform: translate(-50%, 34%) scale(0.7);
  }

  @media ${mediaQueries.largePhone} {
    transform: translate(-50%, 41%) scale(0.6);
  }
`;
