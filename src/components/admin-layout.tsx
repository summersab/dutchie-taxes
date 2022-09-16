import { LoadableClassComponent } from '@loadable/component';
import _ from 'lodash';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import type { SectionLink } from 'src/models/section-links';
import AdminSidebar from 'src/components/sidebar';
import { MainContent } from 'src/components/main-content';
import { MainHeader } from 'src/components/main-header';
import { ErrorFallback } from 'src/errors';

import { FullPageLoader } from 'shared/components';

type Props = {
  imageSrc?: string;
  links: SectionLink[];
  loading?: boolean;
  loadableRoute: LoadableClassComponent<any>;
  redirectPath: string;
  title: string;
};

export function AdminLayout(props: Props): JSX.Element {
  const { imageSrc, links, loading = false, loadableRoute: RouteComponent, redirectPath, title } = props;

  return (
    <Container>
      <AdminSidebar imageSrc={imageSrc} links={links} title={title} />

      <MainContent>
        <MainHeader links={links} />

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {!loading && (
            <Switch>
              {_.map(links, (link) => (
                <Route
                  key={link.key}
                  path={link.routePath}
                  render={(routeProps): JSX.Element => (
                    <RouteComponent fallback={<FullPageLoader />} filePath={link.filePath} {...routeProps} />
                  )}
                />
              ))}

              <Redirect to={redirectPath} />
            </Switch>
          )}
        </ErrorBoundary>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;
