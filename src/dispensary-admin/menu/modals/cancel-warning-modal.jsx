import React from 'react';
import { Flex } from 'rebass';

import { ModalButton, ModalContainer, ModalCopy, ModalSecondaryHeader } from 'shared/modals';

export default function CancelWarningModal({ isOpen, onClickYes, onClickNo }) {
  return (
    <ModalContainer width='462px' padding='30px 57px 52px' isOpen={isOpen}>
      <ModalSecondaryHeader fontSize='18px'>JUST A SEC</ModalSecondaryHeader>

      <ModalCopy>Would you like to save your changes before leaving this page?</ModalCopy>

      <Flex mt='10px'>
        <ModalButton buttonContainerWidth='119px' width='102px' onClick={onClickYes}>
          Yes
        </ModalButton>

        <ModalButton inverted buttonContainerWidth='119px' width='102px' onClick={onClickNo}>
          No
        </ModalButton>
      </Flex>
    </ModalContainer>
  );
}
