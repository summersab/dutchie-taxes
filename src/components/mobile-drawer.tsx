import { DrawerProps } from '@material-ui/core';
import React from 'react';

import { Drawer } from 'src/components/drawer';
import { MobileSidebar } from 'src/components/mobile-sidebar';
import type { SectionLink } from 'src/models/section-links';

type MobileDrawerProps = DrawerProps & {
  links: SectionLink[];
  onClose: () => unknown;
};

export function MobileDrawer(props: MobileDrawerProps): JSX.Element {
  const { links, onClose } = props;

  return (
    <Drawer {...props}>
      <MobileSidebar links={links} onClose={onClose} />
    </Drawer>
  );
}
