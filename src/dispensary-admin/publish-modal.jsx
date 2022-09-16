import React from 'react';
import { Flex } from 'rebass';

import { ModalContainer, ModalButton, ModalSecondaryHeader, ModalCopy, ModalClose } from 'shared/modals';

export default function PublishModal(props) {
  const { onClickNo, onClickYes, onClose, isOpen = true } = props;

  return (
    <ModalContainer width='482px' padding='30px 57px 52px' isOpen={isOpen}>
      <ModalSecondaryHeader fontSize='18px'>YOU HAVE UNPUBLISHED CHANGES!</ModalSecondaryHeader>
      <ModalCopy>
        These changes will not be visible to dutchie customers until they're published.
        <b> Would you like to publish these changes??</b>
      </ModalCopy>
      <Flex mt='10px'>
        <ModalButton buttonContainerWidth='119px' width='102px' onClick={onClickYes}>
          Yes
        </ModalButton>
        <ModalButton inverted buttonContainerWidth='119px' width='102px' onClick={onClickNo}>
          No
        </ModalButton>
      </Flex>
      <ModalClose onClick={onClose} />
    </ModalContainer>
  );
}
