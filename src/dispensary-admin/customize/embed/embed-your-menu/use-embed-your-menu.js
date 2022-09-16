import { useState } from 'react';
import { MENU_TYPES } from './embed-your-menu.constants';
import { generateEmbedScript } from './embed-your-menu.utils';

export function useEmbedYourMenu({ dispensary }) {
  const [viewingAdvancedSettingsModal, setViewingAdvancedSettingsModal] = useState(false);
  const [viewingLearnModal, setViewingLearnModal] = useState(false);
  const [menuType, setMenuType] = useState(MENU_TYPES.standard.value);

  const { id: dispensaryId } = dispensary;

  const availableMenuTypes = [MENU_TYPES.standard, MENU_TYPES.viewOnly];

  if (dispensary.recDispensary) {
    availableMenuTypes.push(MENU_TYPES.rec);
  }

  if (dispensary.medicalDispensary) {
    availableMenuTypes.push(MENU_TYPES.med);
  }

  if (dispensary.chain) {
    availableMenuTypes.push(MENU_TYPES.multiLocation);

    if (dispensary.orderTypesConfig.delivery.enabled) {
      availableMenuTypes.push(MENU_TYPES.dynamicDelivery);
    }
  }

  const handleMenuTypeSelect = (e) => {
    setMenuType(e.target.value);
  };

  const script = generateEmbedScript(dispensaryId, menuType);

  return {
    availableMenuTypes,
    handleMenuTypeSelect,
    menuType,
    script,
    setViewingAdvancedSettingsModal,
    setViewingLearnModal,
    viewingAdvancedSettingsModal,
    viewingLearnModal,
  };
}
