import React from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

import { DutchieQuill } from 'src/components/dutchie-quill';

import { MenuCustomizationLayout } from '../components/menu-customization-layout';
import { ColorPicker } from '../components/color-picker';

import { Preview } from '../components/preview';
import { menuBannerColors } from '../helpers';

import { MenuBannerFormProps } from './menu-banner.types';
import { useMenuBannerForm } from './use-menu-banner-form';

export const menuBannerColorOptions = Object.values(menuBannerColors);

export function MenuBannerForm({ data }: MenuBannerFormProps): JSX.Element {
  const { isDirty, control, handlePublish, handleReset, previewData } = useMenuBannerForm({
    data,
  });

  return (
    <MenuCustomizationLayout
      headerText='Text Banner'
      subHeaderText='Display a message above your menu with important information for customers.'
      isDirty={isDirty}
      handlePublish={handlePublish}
      handleReset={handleReset}
      previewComponent={<Preview.HomePage data={previewData} />}
    >
      <DutchieQuillContainer>
        <Controller
          name='menuBannerHtml'
          control={control}
          render={({ onChange, value }) => <DutchieQuill htmlValue={value} onChange={onChange} />}
        />
      </DutchieQuillContainer>

      <Controller
        name='menuBannerColor'
        control={control}
        render={({ onChange, value }) => (
          <ColorPicker label='Banner Color' colors={menuBannerColorOptions} onSelect={onChange} selectedColor={value} />
        )}
      />
    </MenuCustomizationLayout>
  );
}

const DutchieQuillContainer = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;
