import _ from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { SidebarLink } from 'src/components/sidebar/link';
import type { SectionLink } from 'src/models/section-links';

type Props = {
  links: SectionLink[];
};

export function SidebarLinks(props: Props): JSX.Element {
  const { links } = props;
  const location = useLocation();

  return (
    <Container>
      {_.map(links, (link) => {
        const active = location.pathname.includes(link.to);

        return (
          <SidebarLink
            active={active}
            badge={link.badge}
            icon={link.icon}
            key={link.key}
            label={link.label}
            to={link.to}
            status={link.status}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  flex: 1 0 0%;
  justify-content: flex-start;
  min-height: 0;
`;
