import React, { useState } from 'react';
import _ from 'lodash';

import BrandSelect from 'src/components/brand-select';
import { ModalContainer, ModalButton, ModalSecondaryHeader, ModalClose, ModalCopy } from 'shared/modals';
import { useStores } from 'src/hooks/use-stores';
import useErnie from 'shared/hooks/use-ernie';

import { AmplitudeCategory, useAmplitude } from 'src/utils/amplitude';
import { allMenuSectionTypes } from 'src/dispensary-admin/customize/homepage/constants';
import createMenuSection from '../graphql/create-menu-section.gql';

export function BrandModal(props) {
  const { onToggle, menuSections, sectionTypeKey } = props;
  const { apolloClient, UI } = useStores();
  const showErnie = useErnie();
  const amplitude = useAmplitude();
  const [selectedBrand, setSelectedBrand] = useState('');
  const disabledBrandIds = _.compact(_.map(menuSections, 'brandId'));

  async function handleSave() {
    await apolloClient.mutate({
      mutation: createMenuSection,
      refetchQueries: ['GetMenuSections'],
      variables: {
        menuSection: {
          brandId: selectedBrand.id,
          dispensaryId: UI.dispensary.id,
          sectionType: 'BRAND',
        },
      },
    });

    amplitude.log('Add Homepage Section', {
      description: 'User adds a homepage section on the Customize page',
      category: AmplitudeCategory.customize,
      value: _.find(allMenuSectionTypes, ['key', sectionTypeKey])?.title,
      selectedBrandId: selectedBrand.id,
      selectedBrandName: selectedBrand.name,
    });

    showErnie(`Menu section added`, 'success');
    onToggle();
  }

  function handleChangeBrand(brandOption) {
    setSelectedBrand(brandOption.value);
  }

  return (
    <ModalContainer isOpen padding='30px 57px 52px' width='462px'>
      <ModalSecondaryHeader lowercase>Add a Brand</ModalSecondaryHeader>
      <ModalCopy mb='24px'>Select a brand to show their products in a section on your homepage.</ModalCopy>

      <BrandSelect
        brand={selectedBrand}
        disabledBrandIds={disabledBrandIds}
        onChange={handleChangeBrand}
        placeholder='Select a brand'
        width={300}
      />

      <ModalButton mt='30px' width='82px' onClick={handleSave}>
        Add
      </ModalButton>

      <ModalClose onClick={onToggle} />
    </ModalContainer>
  );
}
