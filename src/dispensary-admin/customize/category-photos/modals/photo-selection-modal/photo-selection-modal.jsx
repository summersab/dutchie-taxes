import React from 'react';
import styled from 'styled-components';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _sortBy from 'lodash/sortBy';

import { ModalContainer, ModalButton, ModalSecondaryHeader, ModalClose } from 'shared/modals';
import CategoryTile from 'src/dispensary-admin/customize/category-photos/category-tile';
import { EmblaCarousel as Carousel } from './carousel';
import stockPhotos from './stock-photos';

export function PhotoSelectionModal({
  category,
  customCategoryPhotos,
  initialSelection,
  onOpenAddFileModal,
  onPhotoSelect,
  onRequestClose,
  onSave,
  selectedPhotoSrc,
}) {
  const allPhotos = [
    ...stockPhotos[category.value],
    ..._map(_filter(customCategoryPhotos, { category: category.value }), 'url'),
  ];

  const photosSorted = _sortBy(allPhotos, (src) => src !== initialSelection);

  return (
    <ModalContainer isOpen onRequestClose={onRequestClose} padding='40px 83px' borderRadius='13px'>
      <ModalClose onClick={onRequestClose} />

      <StyledModalSecondaryHeader fontSize='16px' mb={10}>
        {`${category.label} Stock Photo`}
      </StyledModalSecondaryHeader>

      <ModalSubText>Select a photo from the dutchie library or upload your own.</ModalSubText>

      <Carousel>
        {_map(photosSorted, (src) => (
          <TileContainer key={src}>
            <CategoryTile
              imgSrc={src}
              width='100%'
              label={category.label}
              onClick={() => onPhotoSelect(src)}
              selected={selectedPhotoSrc === src}
            />
          </TileContainer>
        ))}
      </Carousel>

      <UploadLink onClick={onOpenAddFileModal}>Or upload your own</UploadLink>

      <ModalButton width='117px' mt='28px' onClick={onSave}>
        Save Photo
      </ModalButton>
    </ModalContainer>
  );
}

const StyledModalSecondaryHeader = styled(ModalSecondaryHeader)`
  text-transform: capitalize;
`;

const TileContainer = styled.div`
  height: 187px;
  min-width: 239px;
  padding: 0 12.5px;
  display: flex;
  justify-content: center;
`;

const UploadLink = styled.a`
  margin-top: 15px;
  font-size: 13px;
`;

const ModalSubText = styled.p`
  margin-top: 10px;
  margin-bottom: 30px;
  color: #6d747b;
  font-size: 13px;
`;
