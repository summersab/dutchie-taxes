import React, { useState } from 'react';
import _ from 'lodash';

import { Select } from 'shared/components';
import { ModalContainer, ModalButton, ModalSecondaryHeader, ModalClose, ModalCopy } from 'shared/modals';
import { SubcategoryOptions, CategoryOptions } from 'shared/constants';
import { useStores } from 'src/hooks/use-stores';
import useErnie from 'shared/hooks/use-ernie';
import { allMenuSectionTypes } from 'src/dispensary-admin/customize/homepage/constants';

import { AmplitudeCategory, useAmplitude } from 'src/utils/amplitude';
import createMenuSection from '../graphql/create-menu-section.gql';

export function AddCategoryModal(props) {
  const { menuSections, onToggle, sectionTypeKey } = props;
  const { apolloClient, UI } = useStores();
  const showErnie = useErnie();
  const amplitude = useAmplitude();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const category = sectionTypeKey === 'CATEGORY';
  const allowAdd = category ? !_.isEmpty(selectedCategory) : !_.isEmpty(selectedSubcategory);

  async function handleSave() {
    await apolloClient.mutate({
      mutation: createMenuSection,
      refetchQueries: ['GetMenuSections'],
      variables: {
        menuSection: {
          category: selectedCategory.value,
          dispensaryId: UI.dispensary.id,
          sectionType: sectionTypeKey,
          subcategory: selectedSubcategory.value,
        },
      },
    });

    amplitude.log('Add Homepage Section', {
      description: 'User adds a homepage section on the Customize page',
      category: AmplitudeCategory.customize,
      value: _.find(allMenuSectionTypes, ['key', sectionTypeKey])?.title,
      selectedCategory: selectedCategory.value,
      selectedSubcategory: selectedSubcategory.value,
    });

    showErnie(`Menu section added`, 'success');
    onToggle();
  }

  let visibleCategoryOptions = [];

  if (category) {
    visibleCategoryOptions = _.filter(
      CategoryOptions,
      (categoryOption) =>
        !_.some(menuSections, { category: categoryOption.value }) &&
        categoryOption.value !== 'N/A' &&
        categoryOption.value !== null
    );
  } else {
    visibleCategoryOptions = _.filter(
      CategoryOptions,
      (categoryOption) =>
        categoryOption.value !== 'N/A' &&
        categoryOption.value !== null &&
        !_.isEmpty(SubcategoryOptions[categoryOption.value])
    );
  }

  const visibleSubcategoryOptions = selectedCategory?.value
    ? _.filter(
        SubcategoryOptions[selectedCategory.value],
        (subcategoryOption) => !_.some(menuSections, { subcategory: subcategoryOption.value })
      )
    : [];

  function handleChangeCategory(event) {
    setSelectedCategory(_.find(visibleCategoryOptions, { key: event.target.value }) || '');
    setSelectedSubcategory('');
  }

  function handleChangeSubcategory(event) {
    setSelectedSubcategory(_.find(visibleSubcategoryOptions, { key: event.target.value }) || '');
  }

  return (
    <ModalContainer isOpen padding='30px 57px 52px' width='462px'>
      <ModalSecondaryHeader lowercase>Add Popular {category ? 'Category' : 'Subcategory'}</ModalSecondaryHeader>
      <ModalCopy mb='24px'>Add a {category ? 'category' : 'subcategory'} carousel to your embedded homepage.</ModalCopy>

      <Select fontSize='13px' height={45} onChange={handleChangeCategory} value={selectedCategory.key} width='326px'>
        <option value=''>Select a category</option>
        {_.map(visibleCategoryOptions, (categoryOption) => (
          <option key={categoryOption.key} value={categoryOption.key}>
            {categoryOption.value}
          </option>
        ))}
      </Select>

      {!category && (
        <Select
          disabled={_.isEmpty(selectedCategory)}
          fontSize='13px'
          height={45}
          mt='15px'
          onChange={handleChangeSubcategory}
          value={selectedSubcategory.value}
          width='326px'
        >
          <option value=''>Select a subcategory</option>
          {_.map(visibleSubcategoryOptions, (subcategoryOption) => (
            <option key={subcategoryOption.key} value={subcategoryOption.value}>
              {subcategoryOption.label}
            </option>
          ))}
        </Select>
      )}

      <ModalButton mt='30px' disabled={!allowAdd} width='82px' onClick={handleSave}>
        Add
      </ModalButton>

      <ModalClose onClick={onToggle} />
    </ModalContainer>
  );
}
