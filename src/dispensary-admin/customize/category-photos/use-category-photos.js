import { useState } from 'react';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import useDispensaryCategoriesSubcategories from 'src/hooks/use-dispensary-categories-subcategories';
import { useStores } from 'src/hooks/use-stores';
import { getCategoryPhoto } from 'shared/helpers/dispensaries';
import { getCategoriesForMenuForState } from 'shared/helpers/products';
import useErnie from 'shared/hooks/use-ernie';

export function useCategoryPhotos() {
  const showErnie = useErnie();
  const {
    UI: { dispensary, saveDispensaryInfo, updateDispensaryProperty },
  } = useStores();
  const categoryPhotos = dispensary.categoryPhotos || [];
  const customCategoryPhotos = dispensary.customCategoryPhotos || [];

  const { categories: categoriesFromHook, loading } = useDispensaryCategoriesSubcategories({
    dispensaryId: dispensary?.id,
  });

  const categoriesForMenu = getCategoriesForMenuForState(dispensary?.location?.state);

  const categories = _map(categoriesFromHook, (categoryFromHook) =>
    _find(categoriesForMenu, { value: categoryFromHook.key })
  );

  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const initialSelection = categoryToEdit ? getCategoryPhoto(dispensary, categoryToEdit) : null;
  const [selectedPhotoSrc, setSelectedPhotoSrc] = useState(initialSelection);

  const [openModal, setOpenModal] = useState(null);
  const openAddFileModal = () => setOpenModal('add-file');
  const openPhotoSelectionModal = () => setOpenModal('photo-selection');
  const openCancelWarningModal = () => setOpenModal('cancel-warning');
  const closeModals = () => {
    setSelectedPhotoSrc(null);
    setCategoryToEdit(null);
    setOpenModal(null);
  };

  const savePhotoSelection = async (src) => {
    updateDispensaryProperty('categoryPhotos', [
      ..._filter(categoryPhotos, ({ category }) => category !== categoryToEdit.value),
      { src, category: categoryToEdit.value },
    ]);

    const success = await saveDispensaryInfo();

    if (success) {
      setSelectedPhotoSrc(src);
      showErnie(`The category photo for ${categoryToEdit.label} has been successfully updated!`, 'success');
    } else {
      showErnie(`There was a problem saving your selection.`, 'error');
    }
  };

  const addCustomPhoto = (url) => {
    updateDispensaryProperty('customCategoryPhotos', [
      ...customCategoryPhotos,
      { url, category: categoryToEdit.value },
    ]);
    savePhotoSelection(url);
  };

  const handleEditClick = (category) => {
    setSelectedPhotoSrc(getCategoryPhoto(dispensary, category));
    setCategoryToEdit(category);
    openPhotoSelectionModal();
  };

  const handleClosePhotoSelectionModal = () => {
    if (selectedPhotoSrc !== initialSelection) {
      openCancelWarningModal();
    } else {
      closeModals();
    }
  };

  const handleSavePhotoSelection = () => {
    savePhotoSelection(selectedPhotoSrc);
    closeModals();
  };

  const handleWarningClickYes = () => {
    handleSavePhotoSelection();
    closeModals();
  };

  const handleWarningClickNo = () => {
    closeModals();
  };

  return {
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
  };
}
