import React from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

import { linkColors, navigationBarColors } from '../helpers';
import { MenuCustomizationLayout } from '../components/menu-customization-layout';
import { ColorPicker } from '../components/color-picker';
import { Preview } from '../components/preview';

import { FontSelector } from './fonts-selector';
import { useColorsAndFontsForm } from './use-colors-and-fonts-form';
import { ColorsAndFontsFormProps } from './colors-and-fonts.types';

const navigationBarColorsOptions = Object.values(navigationBarColors);
const linkColorsOptions = Object.values(linkColors);

export function ColorsAndFontsForm(props: ColorsAndFontsFormProps): JSX.Element {
  const { control, handlePublish, handleReset, isDirty, previewData } = useColorsAndFontsForm(props);

  return (
    <MenuCustomizationLayout
      headerText='Colors and Fonts'
      subHeaderText='Select colors to express your brand.'
      isDirty={isDirty}
      handlePublish={handlePublish}
      handleReset={handleReset}
      previewComponent={<Preview.ProductDetailsPage data={previewData} />}
    >
      <Inputs>
        <Input>
          <Controller
            name='navBarColor'
            control={control}
            render={({ onChange, value }) => (
              <ColorPicker
                label='Navigation Bar'
                colors={navigationBarColorsOptions}
                onSelect={onChange}
                selectedColor={value}
              />
            )}
          />
        </Input>

        <Input>
          <Controller
            name='linkColor'
            control={control}
            render={({ onChange, value }) => (
              <ColorPicker
                label='Links and Buttons'
                colors={linkColorsOptions}
                onSelect={onChange}
                selectedColor={value}
              />
            )}
          />
        </Input>

        <Input>
          <Controller
            name='font'
            control={control}
            render={({ onChange, value }) => (
              <FontSelector label='Menu Font' selectedOption={value} onChange={onChange} />
            )}
          />
        </Input>
      </Inputs>
    </MenuCustomizationLayout>
  );
}

const Inputs = styled.div`
  flex: 0 0 auto;
  min-width: 0;
`;

const Input = styled.div`
  margin-bottom: 20px;
`;
