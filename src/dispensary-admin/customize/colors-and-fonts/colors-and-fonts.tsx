import React from 'react';
import { FullPageLoader } from 'shared/components/loading';
import { useGetMenuCustomization } from '../data-access';
import { ColorsAndFontsForm } from './colors-and-fonts-form';

export function ColorsAndFonts(): JSX.Element | null {
  const { data, loading } = useGetMenuCustomization();

  if (loading) {
    return <FullPageLoader />;
  }

  if (data) {
    return <ColorsAndFontsForm data={data} />;
  }

  console.error(new Error(`missing web customization data`));
  return null;
}
