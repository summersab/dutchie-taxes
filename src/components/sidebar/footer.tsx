import _ from 'lodash';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { isSuperAdmin, isChainAdmin } from 'shared/helpers/users';
import { mediaQueries } from 'shared/styles';
import PublicEnv from 'shared/utils/public-env';
import { useUser } from 'src/hooks/use-user';
import { openZendeskWidget } from 'shared/helpers/tools';
import { useAccessYir } from 'src/dispensary-admin/year-in-review/use-access-yir';

export function SidebarFooter(): JSX.Element {
  const location = useLocation();
  const user = useUser();
  const canAccessYir = useAccessYir();
  const routeMatch = useRouteMatch<{ dispensaryId: string }>('/dispensaries/:dispensaryId');
  const showDebugInfo = _.includes(['qa', 'staging'], window.location.host);

  const shouldShowStar =
    ((isSuperAdmin(user) && !(_.includes(location.pathname, '/super/') || location.pathname === '/super')) ||
      (isChainAdmin(user) && !(_.includes(location.pathname, '/chains/') || location.pathname === '/chains'))) &&
    !window.matchMedia(mediaQueries.desktop).matches;

  const shouldShowYir = canAccessYir && location.pathname.includes('/dispensaries');

  useEffect(() => {
    const headway = window.Headway;
    if (headway) {
      _.delay(() => {
        headway.init({
          selector: '#headway',
          account: '7X9QqJ',
          position: {
            x: 'right',
          },
        });
      }, 0);
    }
  }, []);

  return (
    <Container>
      {shouldShowStar && (
        <Link to='/'>
          <StarImage src='/images/superadmin-icon.svg' />
        </Link>
      )}

      <HeadWayContainer id='headway'>
        <Image src='/icons/dutchie-wordmark-white.svg' alt='Dutchie Logo' />
      </HeadWayContainer>

      <Section>
        <StyledLink onClick={openZendeskWidget}>Support</StyledLink>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <StyledLink href='https://status.dutchie.com' target='_BLANK'>
          Status
        </StyledLink>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <StyledLink onClick={() => user.logout()}>Logout</StyledLink>
      </Section>

      {shouldShowYir && routeMatch && (
        <ButtonContainer>
          <YIRButton to={`/dispensaries/${routeMatch.params.dispensaryId}/year-in-review`} target='_blank'>
            <YIRImage src='/year-in-review/button.svg' />
          </YIRButton>
        </ButtonContainer>
      )}

      {showDebugInfo && (
        <Section>
          <StyledLink
            href={`https://github.com/GetDutchie/Dutchie/commit/${PublicEnv.herokuSlugCommit}`}
            target='_BLANK'
          >
            {PublicEnv.appEnv}
          </StyledLink>
        </Section>
      )}
    </Container>
  );
}

const HeadWayContainer = styled.div`
  position: relative;
  #HW_badge_cont {
    position: absolute;
    top: 50%;
    right: 50%;
    margin-right: -61px;
    margin-top: -22px;
  }
`;

const Container = styled.div`
  margin-bottom: 22px;
`;

const StarImage = styled.img`
  display: block;
  margin: 0 auto 10px auto;
  width: 140px;

  @media ${mediaQueries.desktop} {
    width: 90%;
  }
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 67px;

  @media ${mediaQueries.desktop} {
    width: 58px;
  }
`;

const Section = styled.div`
  font-size: 12px;
  margin-top: 11px;
  text-align: center;
  span {
    color: #5f937b;
  }
`;

const StyledLink = styled.a`
  color: #ceebe0;
  cursor: pointer;

  &:hover {
    color: #ceebe0;
    text-decoration: none;
  }
`;

const Link = styled(RouterLink)`
  color: #ceebe0;
  cursor: pointer;

  &:hover {
    color: #ceebe0;
    text-decoration: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 5px 0;
`;

const YIRButton = styled(Link)`
  height: 37px;
  width: 153px;
  background-color: #5b63c0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(79, 87, 185);
  }
`;

const YIRImage = styled.img`
  width: 117px;
`;
