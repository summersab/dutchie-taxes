import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

export const Headline = styled.h2`
  font-size: 40px;
  line-height: 40px;
  font-weight: bold;
  margin-bottom: 26px;
  color: #242526;
  font-family: 'proxima-nova', Helvetica, arial, sans-serif;

  @media ${mediaQueries.largeDesktop} {
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 22px;
  }

  @media ${mediaQueries.largeTablet} {
    font-size: 30px;
    line-height: 33px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 25px;
    line-height: 30px;
  }
`;
