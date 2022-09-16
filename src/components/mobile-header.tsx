import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';

import { MobileDrawer } from 'src/components/mobile-drawer';
import type { SectionLink } from 'src/models/section-links';

type Props = {
  links: SectionLink[];
};

export function MobileHeader(props: Props): JSX.Element {
  const { links } = props;
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = (): void => setIsOpen(false);

  return (
    <React.Fragment>
      <Header>
        <Container>
          <OpenMenuButton onClick={() => setIsOpen(true)} />
          <Divider />
          <img src='/icons/dutchie-wordmark-white.svg' alt='Dutchie Logo' style={{ width: 70 }} />
        </Container>
      </Header>

      <MobileDrawer links={links} open={isOpen} onClose={closeDrawer} />
    </React.Fragment>
  );
}

const Header = styled(Flex)`
  width: 100vw;
  padding: 0 22px;
  height: 56px;
  background-color: #70a38c;
  align-items: center;
`;

const Container = styled(Flex)`
  align-items: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 33px;
  background-color: #5f937b;
  margin: 0 18px 0 20px;
`;

const OpenMenuButton = styled(({ ...props }) => <img src='/icons/menu-icon-white-v2.svg' {...props} />)`
  width: 24px;
  height: 17px;
  cursor: pointer;
`;
