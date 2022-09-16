import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import RouteLeavingGuard from 'src/routes/route-leaving-guard';
import PublishModal from 'src/dispensary-admin/publish-modal';
import { Page } from '../components/customize.styles';

import { useMenuBanner } from './hooks';
import { PublishBanner } from '../components/publish-banner';
import { BannerEditor } from './components';
import {
  AGE_VERIFICATION_BANNER_EDITOR_DETAIL_COPY,
  AGE_VERIFICATION_BANNER_EDITOR_TITLE,
  MENU_BANNER_EDITOR_DETAIL_COPY,
  MENU_BANNER_EDITOR_TITLE,
} from './menu-banner.constants';

export const MenuBanner = observer(
  (): JSX.Element => {
    const {
      ageVerificationBannerHtml,
      handleChangeForAgeVerificationBanner,
      handleChangeForMenuBanner,
      handleClickNo,
      handlePublishChanges,
      handleSelectColorForAgeVerificationBanner,
      handleSelectColorForMenuBanner,
      menuBannerHtml,
      selectedAgeVerificationBannerColor,
      selectedMenuBannerColor,
      showAgeVerification,
      unpublishedDispoChanges,
    } = useMenuBanner();

    return (
      <React.Fragment>
        <Page>
          <BannerEditor
            bannerHtml={menuBannerHtml}
            detailCopy={MENU_BANNER_EDITOR_DETAIL_COPY}
            handleChange={handleChangeForMenuBanner}
            handleSelectColor={handleSelectColorForMenuBanner}
            selectedBannerColor={selectedMenuBannerColor}
            title={MENU_BANNER_EDITOR_TITLE}
          />

          {showAgeVerification && (
            <>
              <Spacer />

              <BannerEditor
                bannerHtml={ageVerificationBannerHtml}
                detailCopy={AGE_VERIFICATION_BANNER_EDITOR_DETAIL_COPY}
                handleChange={handleChangeForAgeVerificationBanner}
                handleSelectColor={handleSelectColorForAgeVerificationBanner}
                selectedBannerColor={selectedAgeVerificationBannerColor}
                title={AGE_VERIFICATION_BANNER_EDITOR_TITLE}
              />
            </>
          )}
        </Page>

        {unpublishedDispoChanges && <PublishBanner onPublish={handlePublishChanges} />}

        <RouteLeavingGuard
          when={unpublishedDispoChanges}
          modal={PublishModal}
          handleConfirm={handlePublishChanges}
          handleDeny={handleClickNo}
        />
      </React.Fragment>
    );
  }
);

const Spacer = styled.div`
  height: 40px;
`;
