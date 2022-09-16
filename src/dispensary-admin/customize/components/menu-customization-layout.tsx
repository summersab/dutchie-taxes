import React from 'react';
import styled from 'styled-components';

import RouteLeavingGuard from 'src/routes/route-leaving-guard';
import PublishModal from 'src/dispensary-admin/publish-modal';
import RichTextHtmlWrapper from 'shared/components/rich-text-html-wrapper';

import { ContentContainer, Detail, Page, Title } from './customize.styles';
import { PublishBanner } from './publish-banner';

type MenuCustomizationLayoutProps = {
  headerText: string;
  subHeaderText: string;
  isDirty: boolean;
  handlePublish: () => void;
  handleReset: () => void;
  children: React.ReactNode | React.ReactNode[];
  previewComponent?: JSX.Element;
};

export function MenuCustomizationLayout({
  headerText,
  subHeaderText,
  isDirty,
  handlePublish,
  handleReset,
  previewComponent,
  children,
}: MenuCustomizationLayoutProps): JSX.Element {
  return (
    <>
      <Page>
        <Container>
          <LeftColumn>
            <Title>{headerText}</Title>
            <Detail>
              <RichTextHtmlWrapper html={subHeaderText} className='menu-customization-layout' />
            </Detail>

            <ContentContainer>{children}</ContentContainer>
          </LeftColumn>

          {previewComponent && <RightColumn>{previewComponent}</RightColumn>}
        </Container>
      </Page>

      {isDirty && <PublishBanner onPublish={handlePublish} />}

      <RouteLeavingGuard when={isDirty} modal={PublishModal} handleConfirm={handlePublish} handleDeny={handleReset} />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  width: calc(100% - 400px);
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 30px;
  width: 370px;
`;
