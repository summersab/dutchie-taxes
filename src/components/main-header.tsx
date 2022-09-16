/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import _ from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';

import SubHeader from 'src/components/subheader';
import Header from 'src/dispensary-admin/header';
import type { SectionLink } from 'src/models/section-links';

type Props = {
  links: SectionLink[];
};

export function MainHeader(props: Props): JSX.Element | null {
  const { links } = props;
  const location = useLocation();

  const { pathname } = location;
  const activeLink = _.find(links, (link) => pathname.includes(link.to)) as SectionLink;

  return activeLink === undefined ? null : (
    <React.Fragment>
      <Header.Wrapper links={links}>
        {activeLink.backlink && <Header.BackLink to={`${activeLink.backlink}`}>{activeLink.label}</Header.BackLink>}
        {!activeLink.backlink && activeLink.icon && (
          <Header.Title iconSrc={`/icons/${activeLink.icon}-big.svg`}>{activeLink.label}</Header.Title>
        )}
        {activeLink.headerComponent && <activeLink.headerComponent />}
      </Header.Wrapper>
      <SubHeader links={links} />
    </React.Fragment>
  );
}
