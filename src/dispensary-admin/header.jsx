import _ from 'lodash';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Image } from 'rebass';
import styled from 'styled-components';

import { mediaQueries, mediaSizes } from 'shared/styles';
import { useUI } from 'src/hooks/use-ui';
import { BackArrow } from 'src/svg/back-arrow';
import MenuScore from 'src/dispensary-admin/components/menu-score';
import PreviewLink from 'src/dispensary-admin/components/preview-link';
import { MobileHeader } from 'src/components/mobile-header';

const Header = styled.div`
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #c8ced4;
  box-shadow: 0px 3px 2px 0 rgba(37, 37, 37, 0.05);
  display: flex;
  flex-shrink: 0;
  height: 72px;
  justify-content: space-between;
  width: 100%;
  @media ${mediaQueries.largePhone} {
    height: 50px;
  }
`;

const Wrapper = styled(Flex)`
  flex-shrink: 0;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 90;
  flex-direction: column;
`;

const HeaderTitle = styled(Text)`
  color: #9fa6ad;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  margin-left: 13px;
  vertical-align: middle;
  @media ${mediaQueries.largePhone} {
    font-size: 16px;
  }
`;

const HeaderTitleObject = ({ iconSrc, children }) => {
  let width = '16px';
  if (children === 'Menu') {
    width = '19px';
  } else if (children === 'Promote') {
    width = '20px';
  } else if (children === 'Analytics' || children === 'Settings' || children === 'Reporting') {
    width = '22px';
  }

  return (
    <Flex alignItems='center' pl={['20px', '20px', '20px', '34px']}>
      <Image src={iconSrc} width={width} />
      <HeaderTitle>{children}</HeaderTitle>
    </Flex>
  );
};

const StyledRouterLink = styled(RouterLink)`
  cursor: pointer;
  font-size: 18px;
  color: #4597e0;
  font-weight: bold;
  margin-left: 35px;

  &:hover {
    text-decoration: none !important;
  }

  @media ${mediaQueries.largePhone} {
    margin-left: 20px;
  }
`;

function BackLink({ children, ...props }) {
  return (
    <StyledRouterLink {...props}>
      <BackArrow fill='#4597e0' style={{ verticalAlign: 'middle' }} />
      {children}
    </StyledRouterLink>
  );
}

const Separator = styled.div`
  background-color: #e5e9ec;
  content: ' ';
  height: 37px;
  margin: 0 22px;
  width: 1px;
`;

const DisplayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 34px;
  @media ${mediaQueries.largePhone} {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  @media only screen and (min-width: ${mediaSizes.desktop + 2}px) {
    display: none;
  }
`;

function HeaderWrapper(props) {
  const { children, links } = props;
  const UI = useUI();

  return (
    <Wrapper>
      <MobileWrapper>
        <MobileHeader links={links} />
      </MobileWrapper>
      <Header>
        {children}

        {!_.isEmpty(UI.dispensary) && (
          <DisplayWrapper>
            <MenuScore
              dispensaryId={UI.dispensary.id}
              menuScore={UI.dispensary.menuScore}
              menuScoresByCategory={UI.dispensary.menuScoresByCategory}
            />

            <Separator />

            <PreviewLink cName={UI.dispensary.cName} />
          </DisplayWrapper>
        )}
      </Header>
    </Wrapper>
  );
}

export default {
  BackLink,
  Title: HeaderTitleObject,
  Wrapper: HeaderWrapper,
};
