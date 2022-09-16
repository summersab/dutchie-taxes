import React from 'react';

import { FullPageLoader } from 'shared/components/loading';
import { useGetMenuCustomization } from '../data-access';

import { AgeVerificationForm } from './age-verification-form';

export function AgeVerification(): JSX.Element | null {
  const { data, loading } = useGetMenuCustomization();

  if (loading) {
    return <FullPageLoader />;
  }

  if (data) {
    return <AgeVerificationForm data={data} />;
  }

  return null;
}
