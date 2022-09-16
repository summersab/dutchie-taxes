import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';
import { flexbox, space } from 'styled-system';

import { mediaQueries } from 'shared/styles';

export const OuterContainer = styled.div`
  background-color: #f4f7fa;
  color: #6d747b;
  flex: 1 0 0%;
  min-width: 0;
  font-size: 13px;
  padding: 53px 28px 68px 28px;

  @media ${mediaQueries.largePhone} {
    padding: 53px 20px 25px 20px;
    ${space}
  }

  ${space}
`;

const InnerContainer = styled(Flex)`
  margin: 0 auto;
  max-width: 1202px;
  padding-bottom: 50px;
  ${flexbox}
`;

export const ContentContainer = (/** @type { any } */ { children, className, px, py, ...props }) => (
  <OuterContainer className={className} px={px} py={py}>
    <InnerContainer {...props}>{children}</InnerContainer>
  </OuterContainer>
);
