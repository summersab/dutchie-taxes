import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import RouteLeavingGuard from 'src/routes/route-leaving-guard';
import PublishModal from 'src/dispensary-admin/publish-modal';
import { DutchieQuill } from 'src/components/dutchie-quill';
import { useLegalDisclaimer } from './use-legal-disclaimer';
import { ContentContainer, Detail, Page, Title } from '../components/customize.styles';
import { PublishBanner } from '../components/publish-banner';

export const LegalDisclaimer = observer(() => {
  const {
    disclaimerTextHtml,
    handleChange,
    handlePublishChanges,
    handleClickNo,
    unpublishedDispoChanges,
  } = useLegalDisclaimer();

  return (
    <React.Fragment>
      <Page>
        <Title>Legal Disclaimer</Title>
        <Detail>
          The disclaimer will be shown at the bottom of your embedded menu. You can use this to include a legal
          disclaimer or a message to your customers.
        </Detail>

        <ContentContainer>
          <InputContainer>
            <DutchieQuill htmlValue={disclaimerTextHtml} onChange={handleChange} />
          </InputContainer>
        </ContentContainer>
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
});

const InputContainer = styled.div`
  width: 465px;
`;
