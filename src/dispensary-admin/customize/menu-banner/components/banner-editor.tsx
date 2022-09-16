import React from 'react';
import styled from 'styled-components';

import { DutchieQuill } from 'src/components/dutchie-quill';

import { ContentContainer, Detail, Title } from '../../components/customize.styles';
import { ColorPicker } from '../../components/color-picker';
import { Color } from '../../helpers';
import { bannerColors } from '../menu-banner.utils';

type BannerEditorProps = {
  bannerHtml: string;
  detailCopy: string;
  handleChange: (html: string) => void;
  handleSelectColor: (color: Color) => void;
  selectedBannerColor: Color;
  title: string;
};

export function BannerEditor({
  bannerHtml,
  detailCopy,
  handleChange,
  handleSelectColor,
  selectedBannerColor,
  title,
}: BannerEditorProps): JSX.Element {
  return (
    <>
      <Title>{title}</Title>
      <Detail>{detailCopy}</Detail>

      <ContentContainer>
        <TextareaContainer>
          <DutchieQuill htmlValue={bannerHtml} onChange={handleChange} />
        </TextareaContainer>

        <div>
          <ColorPicker
            colors={bannerColors}
            label='Banner Color'
            onSelect={handleSelectColor}
            selectedColor={selectedBannerColor}
            textPreview
          />
        </div>
      </ContentContainer>
    </>
  );
}

const TextareaContainer = styled.div`
  width: 465px;
  margin-bottom: 25px;
`;
