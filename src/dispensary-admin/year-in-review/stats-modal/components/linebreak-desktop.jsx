import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

export const LinebreakDesktop = styled.br`
  @media ${mediaQueries.desktop} {
    display: none;
  }
`;
