import React from 'react';
import styled from 'styled-components';
import _map from 'lodash/map';
import { observer } from 'mobx-react-lite';

import { getCategoryPhoto } from 'shared/helpers/dispensaries';

import CancelWarningModal from 'src/dispensary-admin/menu/modals/cancel-warning-modal';
import { SmallLoader } from 'shared/components/loading';
import { ContentContainer, Detail, Page, Title } from '../components/customize.styles';
import AddFileModal from './modals/add-file-modal';
import PhotoSelectionModal from './modals/photo-selection-modal';
import CategoryTile from './category-tile';
import { useCategoryPhotos } from './use-category-photos';

export const CategoryPhotos = observer(() => {
  const {
    addCustomPhoto,
    categories,
    categoryToEdit,
    customCategoryPhotos,
    dispensary,
    handleClosePhotoSelectionModal,
    handleEditClick,
    handleSavePhotoSelection,
    handleWarningClickNo,
    handleWarningClickYes,
    initialSelection,
    loading,
    openAddFileModal,
    openModal,
    openPhotoSelectionModal,
    selectedPhotoSrc,
    setSelectedPhotoSrc,
  } = useCategoryPhotos();

  return (
    <Page>
      <Title>Category Photos</Title>
      <Detail>Customize the category photos that will appear on your menu.</Detail>

      <ContentContainer>
        {loading && <SmallLoader style={{ marginTop: '200px' }} />}

        {!loading && (
          <Grid>
            {_map(categories, (category) => (
              <CategoryTile
                imgSrc={getCategoryPhoto(dispensary, category)}
                key={category.key}
                label={category.label}
                onEditButtonClick={() => handleEditClick(category)}
                showEditButtonOnHover
                width='100%'
                maxWidth='100% !important'
                height='100% !important'
              />
            ))}
          </Grid>
        )}
      </ContentContainer>

      {openModal === 'cancel-warning' && (
        <CancelWarningModal isOpen onClickYes={handleWarningClickYes} onClickNo={handleWarningClickNo} />
      )}

      {openModal === 'add-file' && (
        <AddFileModal onFileSelect={addCustomPhoto} onRequestClose={openPhotoSelectionModal} />
      )}

      {openModal === 'photo-selection' && (
        <PhotoSelectionModal
          category={categoryToEdit}
          customCategoryPhotos={customCategoryPhotos}
          initialSelection={initialSelection}
          onOpenAddFileModal={openAddFileModal}
          onPhotoSelect={(src) => setSelectedPhotoSrc(src)}
          onRequestClose={handleClosePhotoSelectionModal}
          onSave={handleSavePhotoSelection}
          selectedPhotoSrc={selectedPhotoSrc}
        />
      )}
    </Page>
  );
});

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 187px;
  row-gap: 23px;
  column-gap: 25px;
  max-width: 692px;
  margin-bottom: 40px;
`;
