import React, { useState } from 'react';
import styled from 'styled-components';

import { AddCircle } from 'src/svg/add-circle';
import { ImageBannerModal } from '../image-banner-modal';
import { ImageBanner } from '../image-banner.types';

export const TEST_ID_ADD_IMAGE_BANNER = 'add-image-banner';

type AddImageBannerProps = {
  addBanner: (banner: ImageBanner) => void;
};

export function AddImageBanner({ addBanner }: AddImageBannerProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  function addImageBanner(): void {
    setModalOpen(true);
  }

  function closeModal(): void {
    setModalOpen(false);
  }

  return (
    <>
      <AddBox onClick={addImageBanner} data-testid={TEST_ID_ADD_IMAGE_BANNER}>
        <AddCircle fill='none' />
      </AddBox>

      <ImageBannerModal isOpen={modalOpen} onClose={closeModal} addBanner={addBanner} />
    </>
  );
}

const AddBox = styled.div`
  width: 100%;
  height: 62px;
  background: #f3f6f8;
  border: 1px dashed #bccad2;
  border-radius: 4px;
  margin: 0 0 20px 0;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.1s ease-in-out;

  & :hover {
    background: #e1e6eb;
  }
`;
