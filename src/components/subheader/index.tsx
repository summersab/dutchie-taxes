import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { mediaQueries } from 'shared/styles';
import type { SectionLink } from 'src/models/section-links';
import Link from './link';

type Props = {
  links: SectionLink[];
};

export default function Subheader(props: Props): JSX.Element | null {
  const { links } = props;
  const { pathname } = useLocation<{ pathname: string }>();
  const activeLink = links.find((link) => pathname.includes(link.to));

  if (!activeLink?.subHeaders) {
    return null;
  }

  const activeSubHeaders = activeLink.subHeaders.filter((subHeader) => subHeader.visible);

  if (activeSubHeaders.length === 0) {
    return null;
  }

  return (
    <Container data-cy='subheader' data-test='subheader'>
      {activeSubHeaders.map((link) => (
        <Link
          key={`${link.to}-${link.label}`}
          label={link.label}
          onClick={link.onClick}
          to={link.to}
          superAdminOnly={link.superAdminOnly}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  background-color: #e0e6ec;
  display: flex;
  flex-shrink: 0;
  height: 50px;
  position: sticky;
  top: 72px;
  width: 100%;
  z-index: 5;

  @media ${mediaQueries.largePhone} {
    overflow-x: scroll;
    top: 106px;

    :after {
      content: '';
      height: 1px;
      padding-right: 28px;
    }
  }
`;
