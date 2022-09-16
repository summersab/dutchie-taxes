import React from 'react';
import styled from 'styled-components';

import type { SectionLink } from 'src/models/section-links';
import { mediaQueries } from 'shared/styles';
import { NavChunk } from './nav-chunk';

type MobileSidebarProps = {
  links: SectionLink[];
  onClose: () => unknown;
};

export function MobileSidebar(props: MobileSidebarProps): JSX.Element {
  const { links, onClose } = props;

  return (
    <Container>
      <NavChunk links={links} onClose={onClose} />
    </Container>
  );
}

const Container = styled.div`
  background-color: #70a38c;
  height: 100vh;
  padding: 0px;
  position: relative;
  width: 375px;

  @media ${mediaQueries.phone} {
    width: 100vw;
  }
`;
