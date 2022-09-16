import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';

import type { SectionLink } from 'src/models/section-links';
import { SidebarFooter } from 'src/components/sidebar/footer';
import { useUser } from 'src/hooks/use-user';
import { mediaQueries } from 'shared/styles';
import { MobileSidebarNavigation } from './navigation';
import { MobileSidebarHeader } from './header';

type NavChunkProps = {
  links: SectionLink[];
  onClose: () => unknown;
};

export function NavChunk(props: NavChunkProps): JSX.Element {
  const { links, onClose } = props;
  const User = useUser();

  return (
    <Container>
      <Flex flexDirection='column' justifyContent='space-between' height='100vh'>
        <Box>
          {(User.isSuperAdmin || User.isChainAdmin) && (
            <Link to='/'>
              <BackButton>
                <SuperIcon src='/icons/back-arrow-white.svg' />
                {User.isSuperAdmin ? 'Super Admin' : 'Chain Admin'}
              </BackButton>
            </Link>
          )}
          <CloseButton onClick={onClose} />
          <MobileSidebarHeader />
          <MobileSidebarNavigation onClose={onClose} links={links} />
        </Box>

        <Box>
          <SidebarFooter />
        </Box>
      </Flex>
    </Container>
  );
}

const Container = styled.div`
  width: 375px;
  height: 100%;
  position: relative;
  @media ${mediaQueries.phone} {
    width: 100%;
  }
`;

const BackButton = styled.div`
  cursor: pointer;
  padding: 18px 22px;
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
  color: #ffffff;
`;

const CloseButton = styled.img.attrs(() => ({
  src: '/icons/menu-icon-close-white.svg',
}))`
  position: absolute;
  top: 10px;
  right: 22px;
  width: 20px;
  height: 35px;
  object-fit: contain;
`;

const SuperIcon = styled.img`
  height: 13px;
  margin-right: 10px;
`;
