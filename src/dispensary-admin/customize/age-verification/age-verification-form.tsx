import React from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

import { DutchieQuill } from 'src/components/dutchie-quill';

import { MenuCustomizationLayout } from '../components/menu-customization-layout';
import { ColorPicker } from '../components/color-picker';

import { menuBannerColors } from '../helpers';

import { AgeVerificationFormProps } from './age-verification.types';
import { useAgeVerificationForm } from './use-age-verification-form';

export const menuBannerColorOptions = Object.values(menuBannerColors);

export function AgeVerificationForm({ data }: AgeVerificationFormProps): JSX.Element {
  const { isDirty, control, handlePublish, handleReset } = useAgeVerificationForm({
    data,
  });

  return (
    <MenuCustomizationLayout
      headerText='Age Verification'
      subHeaderText='Display a message to customers who are pending review for age verification.'
      isDirty={isDirty}
      handlePublish={handlePublish}
      handleReset={handleReset}
    >
      <DutchieQuillContainer>
        <Controller
          name='ageVerificationBannerHtml'
          control={control}
          render={({ onChange, value }) => <DutchieQuill htmlValue={value} onChange={onChange} />}
        />
      </DutchieQuillContainer>

      <Controller
        name='ageVerificationBannerColor'
        control={control}
        render={({ onChange, value }) => (
          <ColorPicker
            label='Age Verification Banner'
            colors={menuBannerColorOptions}
            onSelect={onChange}
            selectedColor={value}
          />
        )}
      />
    </MenuCustomizationLayout>
  );
}

const DutchieQuillContainer = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;
