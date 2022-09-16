import styled, { css } from 'styled-components';
import { mediaQueries } from 'shared/styles';

const shared = css`
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  position: absolute;
  background: linear-gradient(180.3deg, rgba(255, 211, 184, 0.12) 5.46%, rgba(215, 187, 236, 0.22) 71.45%);
  z-index: 0;
`;

export const BackgroundTop = styled.div`
  ${shared};
  transform: skewY(-5.5deg) translateY(-290px);

  @media ${mediaQueries.largePhone} {
    transform: skewY(-5.5deg) translateY(-160px);
  }
`;

export const BackgroundBottom = styled.div`
  ${shared};
  transform: skewY(-6deg) translateY(-275px);

  @media ${mediaQueries.largePhone} {
    transform: skewY(-5.5deg) translateY(-200px);
  }
`;
