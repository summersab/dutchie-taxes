import React from 'react';
import { ModalButton, ModalSecondaryHeader, ModalClose, ModalCopy } from 'shared/modals';
import { CustomModalStyles, EditContainer, Field, DisplayContainer } from './custom-modal.style';
import { SmallText } from './components/small-text';
import { DragLayer } from './components/drag-layer';
import { ProductList } from './components/product-list';
import { Instructions } from './components/instructions';
import { SectionNameInput } from './components/section-name-input';
import { ProductSelectInput } from './components/product-select-input';

import { useCustomModal } from './use-custom-modal';

export function CustomModal(props) {
  const { menuSection, onToggle, products = [], sectionTypeKey } = props;
  const {
    handleMoveOption,
    handleProductSelectChange,
    handleRemoveProduct,
    handleSave,
    handleSectionNameChange,
    loading,
    sectionName,
    selectedProducts,
    showProductList,
  } = useCustomModal({
    menuSection,
    onToggle,
    products,
    sectionTypeKey,
  });

  return (
    <React.Fragment>
      <CustomModalStyles isOpen noPadding height='438px' width='100%' maxWidth='830px'>
        <EditContainer onSubmit={handleSave}>
          <ModalSecondaryHeader mb='5px' lowercase>
            Add a Custom Section
          </ModalSecondaryHeader>
          <ModalCopy mb='32px'>Create a custom homepage section with any products.</ModalCopy>
          <Field>
            <SmallText>SECTION NAME</SmallText>
            <SectionNameInput value={sectionName} onChange={handleSectionNameChange} />
          </Field>
          <Field>
            <SmallText>ADD PRODUCTS</SmallText>
            <ProductSelectInput options={products} value={selectedProducts} onChange={handleProductSelectChange} />
          </Field>
          <ModalButton
            width={[1, 1, 1, '100%']}
            buttonContainerWidth='87px'
            mt='0'
            alignItems='flex-start'
            size='medium'
            loading={loading}
          >
            Save
          </ModalButton>
        </EditContainer>
        <DisplayContainer>
          {showProductList ? (
            <ProductList products={selectedProducts} handleMove={handleMoveOption} handleRemove={handleRemoveProduct} />
          ) : (
            <Instructions />
          )}
        </DisplayContainer>
        <ModalClose onClick={onToggle} />
      </CustomModalStyles>
      <DragLayer />
    </React.Fragment>
  );
}
