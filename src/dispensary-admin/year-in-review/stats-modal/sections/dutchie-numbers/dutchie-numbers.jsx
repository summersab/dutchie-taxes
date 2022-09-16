import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';
import { Copy } from '../../components/copy';
import { Wrapper } from '../../components/wrapper';
import { Headline } from '../../components/headline';
import { LinebreakMobile } from '../../components/linebreak-mobile';
import { LinebreakDesktop } from '../../components/linebreak-desktop';

export function DutchieNumbersSection() {
  return (
    <DutchieNumbersSectionStyles>
      <Container>
        <Header>
          A look at what Dutchie
          <LinebreakMobile />
          <LinebreakDesktop /> accomplished in 2021.
        </Header>
        <StyledCopy>
          This was a big year for Dutchie as we grew by 178%, solidifying our position as the largest and fast growing
          ecommerce platform in cannabis.
        </StyledCopy>
        {/* <StyledCopy>
          This was a big year for Dutchie as we grew by 2,058% to become the largest and fastest-growing growing
          e-commerce platform in cannabis.
        </StyledCopy> */}
        <NumbersContainer>
          <Numbers src='/year-in-review/dutchie-stats-2021.svg' />
        </NumbersContainer>
      </Container>
    </DutchieNumbersSectionStyles>
  );
}

const DutchieNumbersSectionStyles = styled(Wrapper)`
  margin-bottom: 180px;

  @media ${mediaQueries.largePhone} {
    margin-bottom: 110px;
  }
`;

const Container = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Headline)`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  @media ${mediaQueries.largeTablet} {
    max-width: 500px;
  }
`;

const StyledCopy = styled(Copy)`
  max-width: 585px;
  margin: 30px auto 85px auto;
  text-align: center;

  @media ${mediaQueries.largeDesktop} {
    margin: 5px auto 70px auto;
  }

  @media ${mediaQueries.largePhone} {
    margin: 0 auto 50px auto;
  }
`;

const NumbersContainer = styled.div`
  width: 100%;
  /* overflow: hidden; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media ${mediaQueries.largePhone} {
    display: block;
  }
`;

const Numbers = styled.img`
  width: 100%;
  max-width: 780px;

  @media ${mediaQueries.largeTablet} {
    max-width: 680px;
  }

  @media ${mediaQueries.largePhone} {
    width: 140%;
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
