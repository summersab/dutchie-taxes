import React from 'react';

import { ModalContainer, ModalButton, ModalSecondaryHeader, ModalClose, ModalCopy } from 'shared/modals';

export function RemoveMenuSectionModal(props) {
  const { onClose, onRemove, sectionKey } = props;

  function handleSave() {
    onRemove(sectionKey);
  }

  return (
    <ModalContainer isOpen padding='30px 57px 52px' width='462px'>
      <ModalSecondaryHeader lowercase>Warning!</ModalSecondaryHeader>
      <ModalCopy>
        Clicking continue will delete this section from the
        <br /> homepage on your menu.
      </ModalCopy>

      <ModalButton data-cy='continue-with-removal' data-test='continue-with-removal' mt='30px' onClick={handleSave}>
        Continue
      </ModalButton>

      <ModalClose onClick={onClose} />
    </ModalContainer>
  );
}
