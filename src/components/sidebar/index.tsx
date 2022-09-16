import React from 'react';

import { SidebarContainer } from 'src/components/sidebar/container';
import { SidebarHeader } from 'src/components/sidebar/header';
import { SidebarLinks } from 'src/components/sidebar/links';
import type { SectionLink } from 'src/models/section-links';

type Props = {
  imageSrc?: string;
  links: SectionLink[];
  title: string;
};

export default function AdminSidebar(props: Props): JSX.Element {
  const { imageSrc, links, title } = props;

  return (
    <SidebarContainer>
      <SidebarHeader imageSrc={imageSrc} title={title} />
      <SidebarLinks links={links} />
    </SidebarContainer>
  );
}
