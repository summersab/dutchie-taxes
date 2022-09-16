import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

export const LinebreakMobile = styled.br`
  display: none;

  @media ${mediaQueries.desktop} {
    display: block;
  }
`;
