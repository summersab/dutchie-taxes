import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import useImageUploader from 'shared/hooks/use-image-uploader';

import { ModalContainer, ModalButton, ModalSecondaryHeader, ModalCopy, ModalClose } from 'shared/modals';
import { Flex } from 'rebass';

export function AddFileModal({ onRequestClose, onFileSelect }) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const selectFileRef = useRef(null);
  const uploadImage = useImageUploader();

  const handleSelectFile = () => {
    selectFileRef.current.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadingImage(true);
      const ImageUrl = await uploadImage(file);

      if (ImageUrl) {
        onFileSelect(ImageUrl);
        onRequestClose();
      }

      setUploadingImage(false);
    }
  };

  return (
    <ModalContainer width='468px' padding='40px 35px 47px 35px' isOpen onRequestClose={onRequestClose}>
      <ModalClose onClick={onRequestClose} />

      <StyledModalSecondaryHeader fontSize='16px'>Important!</StyledModalSecondaryHeader>

      <ModalCopyContainer>
        <StyledModalCopy>
          Photos should be against a <b>white background.</b>
          <br />
          Dimensions are <b>320px x 170px</b> at <b>72ppi</b>
        </StyledModalCopy>
      </ModalCopyContainer>

      <DownloadLink href='/dutchie-category-photo-template.pdf' download='dutchie-category-photo-template'>
        Download template
      </DownloadLink>

      <StyledModalButton width='117px' mt='24px' loading={uploadingImage} onClick={handleSelectFile}>
        <HiddenInput type='file' id='file' ref={selectFileRef} onChange={handleFile} />
        Select File
      </StyledModalButton>
    </ModalContainer>
  );
}

const StyledModalButton = styled(ModalButton)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalSecondaryHeader = styled(ModalSecondaryHeader)`
  text-transform: capitalize;
`;

const ModalCopyContainer = styled(Flex)`
  height: 62px;
  width: 100%;
  background: #fffdeb;
  border: 1px solid #d8d5ba;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const StyledModalCopy = styled(ModalCopy)`
  color: #75725b;
  line-height: 20px;
`;

const DownloadLink = styled.a`
  margin-top: 21px;
  font-size: 13px;
`;

const HiddenInput = styled.input`
  display: none;
`;
