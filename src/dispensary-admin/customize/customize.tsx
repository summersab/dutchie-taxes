import React, { useEffect, useState, ChangeEvent } from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useDispensaryFlag from 'shared/hooks/use-dispensary-flag';

import { ContentContainer } from 'src/components/content-container';
import { useStores } from 'src/hooks/use-stores';

import { MenuBanner } from './menu-banner';
import { MenuBannerV2 } from './menu-banner-v2';
import { ImageBanner } from './image-banner';
import { Homepage } from './homepage';
import { Embed } from './embed';
import { ColorsAndFonts } from './colors-and-fonts';
import { CategoryPhotos } from './category-photos';
import { LegalDisclaimer } from './legal-disclaimer';
import { AgeVerification } from './age-verification';
import { getTabs, getSelectedTab } from './customize.utils';

export function Customize({ match, location, history }: RouteComponentProps): JSX.Element {
  const { UI } = useStores();
  const selectedTabFromURL = location.pathname.split('/').slice(-1)[0];
  const isEnabledMenuBannerLivePreview = useDispensaryFlag('rollout.menu-banner-live-preview', UI.dispensary.id);
  // Slider banner is re-named to Image banner
  const isEnabledImageBanner = useDispensaryFlag('rollout.slider-banner', UI.dispensary.id);
  const isEnabledAgeVerification = useDispensaryFlag(
    'hard-age-gate.age-verification-feature-by-dispensary',
    UI.dispensary.id
  );

  const availableTabs = getTabs({
    isEnabledImageBanner,
    isEnabledMenuBannerLivePreview,
    isEnabledAgeVerification,
  });
  const selectedTab = getSelectedTab(selectedTabFromURL, availableTabs);
  const [tab, setTab] = useState(selectedTab);

  const handleChange = (_event: ChangeEvent<HTMLInputElement>, newValue: string): void => {
    setTab(newValue);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    history.push(`/dispensaries/${UI.dispensary.id}/customize/${newValue}`);
  };

  useEffect(() => {
    setTab(selectedTab);
  }, [selectedTab]);

  return (
    <ContentContainer alignItems='flex-start' flexDirection='column' justifyContent='flex-start'>
      <Background>
        <TabContainer data-cy='customize-tab-container' data-test='customize-tab-container'>
          <StyledTabs orientation='vertical' value={tab} onChange={handleChange}>
            {availableTabs.map(({ key, label, icon }) => (
              <StyledTab key={key} label={label} value={key} icon={icon && <Tag>{icon}</Tag>} />
            ))}
          </StyledTabs>
        </TabContainer>

        <Content>
          <Switch>
            <Route path={`${match.path}/homepage`} component={Homepage} />
            <Route path={`${match.path}/colors`} component={ColorsAndFonts} />
            {isEnabledImageBanner && <Route path={`${match.path}/image-banner`} component={ImageBanner} />}
            <Route
              path={`${match.path}/menu-banner`}
              component={isEnabledMenuBannerLivePreview ? MenuBannerV2 : MenuBanner}
            />
            {isEnabledMenuBannerLivePreview && isEnabledAgeVerification && (
              <Route path={`${match.path}/age-verification`} component={AgeVerification} />
            )}
            <Route path={`${match.path}/legal-disclaimer`} component={LegalDisclaimer} />
            <Route path={`${match.path}/category-photos`} component={CategoryPhotos} />
            <Route path={`${match.path}/embed`} component={Embed} />

            <Redirect to={`${match.path}/homepage`} />
          </Switch>
        </Content>
      </Background>
    </ContentContainer>
  );
}

const Background = styled.div`
  align-items: stretch;
  background: #ffffff;
  border-radius: 9px;
  border: 1px solid #d3d8de;
  display: flex;
  min-height: 725px;
  width: 100%;
`;

const TabContainer = styled.div`
  border-right: 1px solid #d3d8de;
  flex: 0 0 auto;
  min-height: 100%;
  min-width: 0;
  padding: 27px 0px 0px 0;
  width: 215px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0%;
  min-width: 0;
`;

const StyledTabs = styled(Tabs)`
  border-bottom: none;
  transform: translate(1px, 0);
  width: 100%;

  .PrivateTabIndicator-root-1 {
    transition: all 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const StyledTab = styled(Tab)`
  font-size: 14px;
  height: 33px;
  min-height: 33px;
  line-height: 16px;
  margin: 6px 0;
  opacity: 1;
  padding-left: 42px;
  text-align: left;

  ${({ selected }) => `color: ${selected ? '#0B99E6' : '#4F5D68'};`}
  ${({ selected }) => `font-weight: ${selected ? 'bold' : 'normal'};`}

  span {
    display: block;
  }

  :hover {
    text-decoration: underline;
    ${({ selected }) => `color: ${selected ? '#0B99E6' : '#4F5D68'};`}
  }
`;

export const Tag = styled.span`
  background: #ffd3b8;
  width: 28px;
  height: 16px;
  font-weight: 700;
  font-size: 9px;
  line-height: initial;
  padding: 0 4px;
  color: #2e3538;
  position: absolute;
  right: 16px;
  border-radius: 4px;
  display: grid !important;
  align-items: center;
`;
