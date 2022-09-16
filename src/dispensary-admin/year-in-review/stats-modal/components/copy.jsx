import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

export const Copy = styled.p`
  font-size: 18px;
  line-height: 28px;
  font-weight: normal;
  color: #4f5d68;
  font-family: 'proxima-nova', Helvetica, arial, sans-serif;

  @media ${mediaQueries.largeDesktop} {
    font-size: 17px;
    line-height: 26px;
  }

  @media ${mediaQueries.largeTablet} {
    font-size: 16px;
    line-height: 24px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 15px;
    line-height: 23px;
  }
`;
