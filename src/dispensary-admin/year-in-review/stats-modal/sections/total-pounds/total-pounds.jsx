import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

import { formatNumber } from '../../helpers';
import { Wrapper } from '../../components/wrapper';

export function TotalPoundsSection({ totalPounds = 0 }) {
  return (
    <TotalPoundsSectionStyles>
      <Container>
        <Text>
          In 2021, you <Green>sold</Green> roughly:
        </Text>
        <Weight>{formatNumber(Math.ceil(totalPounds / 10) * 10)}&nbsp;lbs</Weight>
        <Text>
          of cannabis through the <Bold>Dutchie Ecommerce</Bold> platform.
        </Text>
        <Image src='/year-in-review/flower-2.png' />
      </Container>
    </TotalPoundsSectionStyles>
  );
}

const TotalPoundsSectionStyles = styled(Wrapper)`
  margin-bottom: 170px;

  @media ${mediaQueries.largePhone} {
    margin-bottom: 75px;
  }
`;

const Container = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 25px;
  line-height: 33px;
  text-align: center;
  color: #4f5d68;

  @media ${mediaQueries.largePhone} {
    font-size: 19px;
  }
`;

const Green = styled.span`
  color: #43ab92;
  font-weight: bold;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Weight = styled.div`
  font-size: 68px;
  line-height: 43px;
  text-align: center;
  color: #242526;
  margin: 30px 0 25px 0;

  @media ${mediaQueries.largePhone} {
    font-size: 58px;
    margin: 20px 0;
  }
`;

const Image = styled.img`
  width: 80%;
  max-width: 1155px;

  @media ${mediaQueries.largePhone} {
    width: 100%;
    margin-top: 25px;
  }
`;
