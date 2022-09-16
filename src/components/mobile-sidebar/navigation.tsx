import React from 'react';
import { useLocation } from 'react-router-dom';

import { SidebarLink } from 'src/components/sidebar/link';
import type { SectionLink } from 'src/models/section-links';

type MobileSidebarNavigationProps = {
  links: SectionLink[];
  onClose: () => unknown;
};

export function MobileSidebarNavigation(props: MobileSidebarNavigationProps): JSX.Element {
  const { links, onClose } = props;
  const location = useLocation();

  const renderedLinks = links
    .filter((link) => link.visible)
    .map((link) => {
      const active = location.pathname.includes(link.to);
      return (
        <SidebarLink
          {...link}
          key={link.key}
          onClick={() => {
            onClose();
          }}
          active={active}
        />
      );
    });

  return <div>{renderedLinks}</div>;
}
