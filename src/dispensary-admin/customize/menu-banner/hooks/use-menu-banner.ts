import useErnie from 'shared/hooks/use-ernie';
import useDispensaryFlag from 'shared/hooks/use-dispensary-flag';
import { useDispensary } from 'src/hooks/use-dispensary';
import { useStores } from 'src/hooks/use-stores';

import { useMenuBannerEditor, UseMenuBannerEditorReturn } from './use-menu-banner-editor';
import {
  useAgeVerificationBannerEditor,
  UseAgeVerificationBannerEditorReturn,
} from './use-age-verification-banner-editor';

type UseMenuBannerReturn = Omit<UseAgeVerificationBannerEditorReturn, 'ageVerificationBannerColor'> &
  Omit<UseMenuBannerEditorReturn, 'menuBannerColor'> & {
    handleClickNo: () => Promise<void>;
    handlePublishChanges: () => Promise<void>;
    showAgeVerification: boolean;
    unpublishedDispoChanges: boolean;
  };

export function useMenuBanner(): UseMenuBannerReturn {
  const { UI } = useStores();
  const { unpublishedDispoChanges } = UI;
  const showErnie = useErnie();
  const { id: dispensaryId } = useDispensary();
  const showAgeVerification = useDispensaryFlag(`hard-age-gate.age-verification-feature-by-dispensary`, dispensaryId);

  const {
    handleChangeForMenuBanner,
    handleSelectColorForMenuBanner,
    menuBannerColor,
    menuBannerHtml,
    selectedMenuBannerColor,
  } = useMenuBannerEditor();

  const {
    ageVerificationBannerColor,
    ageVerificationBannerHtml,
    handleChangeForAgeVerificationBanner,
    handleSelectColorForAgeVerificationBanner,
    selectedAgeVerificationBannerColor,
  } = useAgeVerificationBannerEditor();

  async function handlePublishChanges(): Promise<void> {
    try {
      UI.updateDispensaryProperty('menuBannerHtml', menuBannerHtml);
      UI.updateDispensaryProperty('menuBannerColor', menuBannerColor);
      if (showAgeVerification) {
        UI.updateDispensaryProperty('ageVerificationBannerHtml', ageVerificationBannerHtml);
        UI.updateDispensaryProperty('ageVerificationBannerColor', ageVerificationBannerColor);
      }
      await UI.saveDispensaryInfo();
      showErnie('Your menu banner settings have been updated', 'success');
      UI.unpublishedDispoChanges = false;
    } catch (error) {
      showErnie('Something went wrong, please try again.', 'danger');
    }
  }

  async function handleClickNo(): Promise<void> {
    await UI.fetchDispensary();
    UI.unpublishedDispoChanges = false;
  }

  return {
    ageVerificationBannerHtml,
    handleChangeForAgeVerificationBanner,
    handleChangeForMenuBanner,
    handleClickNo,
    handlePublishChanges,
    handleSelectColorForAgeVerificationBanner,
    handleSelectColorForMenuBanner,
    menuBannerHtml,
    selectedAgeVerificationBannerColor,
    selectedMenuBannerColor,
    showAgeVerification,
    unpublishedDispoChanges,
  };
}
