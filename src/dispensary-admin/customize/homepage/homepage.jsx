import React from 'react';
import _ from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import styled from 'styled-components';

import { SmallLoader } from 'shared/components/loading';
import { Detail, Page, Title } from '../components/customize.styles';
import { SmallOption } from './components/small-option';
import { DraggableOption } from './components/draggable-option';
import { AddCategoryModal } from './modals/add-category-modal';
import { CustomModal } from './modals/custom-modal';
import { RemoveMenuSectionModal } from './modals/remove-menu-section-modal';
import { useHomepage } from './use-hompage';
import { BrandModal } from './modals/brand-modal';

export function Homepage() {
  const {
    loading,
    mobile,
    localMenuSections,
    handleDrop,
    handleMoveOption,
    handleOpenRemoveModal,
    handleEditSection,
    showOffersCarousel,
    availableMenuSectionTypes,
    handleAddSection,
    showCategoryModal,
    menuSections,
    handleCloseModal,
    showModalType,
    showBrandModal,
    showCustomModal,
    currentSection,
    products,
    menuSectionIdToRemove,
    handleCloseRemoveModal,
    handleRemoveMenuSection,
  } = useHomepage();

  return (
    <DndProvider backend={mobile ? TouchBackend : HTML5Backend}>
      <Page>
        <Content data-cy='customize-content' data-test='customize-content'>
          <SelectedSections>
            <Title>Homepage</Title>
            <Detail>Drag and drop to reorder the sections on your homepage.</Detail>

            {loading && <SmallLoader />}

            {!loading &&
              _.map(localMenuSections, (menuSection, index) => (
                <DraggableOption
                  key={menuSection.id}
                  index={index}
                  menuSection={menuSection}
                  onDrop={handleDrop}
                  onMove={handleMoveOption}
                  onRemove={handleOpenRemoveModal}
                  onEdit={handleEditSection}
                  title={!showOffersCarousel && menuSection.sectionType === `SPECIALS` ? `Specials` : menuSection.label}
                />
              ))}
          </SelectedSections>

          <AvailableSections data-cy='available-sections' data-test='available-sections'>
            <SmallTitle>Add Sections</SmallTitle>

            {loading && <SmallLoader />}

            {!loading &&
              _.map(availableMenuSectionTypes, (sectionType) => (
                <SmallOption
                  key={sectionType.key}
                  onAddSection={() => handleAddSection(sectionType.key, sectionType.title)}
                  tooltipCopy={sectionType.tooltip}
                  title={!showOffersCarousel && sectionType.key === `SPECIALS` ? `Specials` : sectionType.title}
                />
              ))}
          </AvailableSections>
        </Content>
      </Page>

      {showCategoryModal && (
        <AddCategoryModal menuSections={menuSections} onToggle={handleCloseModal} sectionTypeKey={showModalType} />
      )}

      {showBrandModal && (
        <BrandModal onToggle={handleCloseModal} menuSections={menuSections} sectionTypeKey={showModalType} />
      )}

      {showCustomModal && (
        <CustomModal
          onToggle={handleCloseModal}
          menuSection={currentSection}
          menuSections={menuSections}
          products={products}
          sectionTypeKey={showModalType}
        />
      )}

      {menuSectionIdToRemove && (
        <RemoveMenuSectionModal
          data-cy='continue-with-removal'
          data-test='continue-with-removal'
          onClose={handleCloseRemoveModal}
          onRemove={handleRemoveMenuSection}
          sectionKey={menuSectionIdToRemove}
        />
      )}
    </DndProvider>
  );
}

const Content = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

const SelectedSections = styled.div`
  flex: 1 0 0%;
  min-width: 0;
  padding-right: 59px;
`;

const AvailableSections = styled.div`
  border-radius: 10px;
  border: 1px dashed #969ea5;
  box-sizing: border-box;
  flex: 0 0 245px;
  min-width: 0;
  padding: 21px;
`;

const SmallTitle = styled.div`
  color: #4f5d68;
  font-size: 14px;
  font-weight: bold;
  padding: 0 0 12px 12px;
`;
