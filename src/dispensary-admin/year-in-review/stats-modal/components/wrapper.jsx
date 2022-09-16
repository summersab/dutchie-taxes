import styled from 'styled-components';
import { mediaQueries } from 'shared/styles';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;

  @media ${mediaQueries.largeTablet} {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
