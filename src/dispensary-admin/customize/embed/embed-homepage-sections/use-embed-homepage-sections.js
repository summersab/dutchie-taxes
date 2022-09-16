import { useState, useEffect } from 'react';
import _ from 'lodash';

import { useStores } from 'src/hooks/use-stores';
import useDebounce from 'shared/hooks/use-debounce';
import { generateEmbedScript } from './embed-homepage-sections.utils';

export function useEmbedHomepageSections({ dispensary, menuSections }) {
  const { UI } = useStores();
  const [currentSection, setCurrentSection] = useState(menuSections[0]);
  const [hideTitle, setHideTitle] = useState(false);
  const [hideViewAllLink, setHideViewAllLink] = useState(false);
  const [menuUrl, setMenuUrl] = useState(dispensary.menuUrl);
  const [menuUrlInputError, setMenuUrlInputError] = useState(false);
  const debouncedMenuUrl = useDebounce(menuUrl, 2000);
  const sectionHasViewAllLink = !_.includes(['Top Sellers', 'Staff Picks'], currentSection?.value);

  const isValidUrl = (string) => {
    try {
      // eslint-disable-next-line no-new
      new URL(string);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleMenuUrlChange = (e) => {
    setMenuUrl(e.target.value);
    if (isValidUrl(e.target.value)) {
      setMenuUrlInputError(false);
    } else {
      setMenuUrlInputError(true);
    }
  };

  const handleSectionSelect = (e) => {
    setCurrentSection(_.find(menuSections, { value: e.target.value }));
  };

  useEffect(() => {
    if (isValidUrl(debouncedMenuUrl) && debouncedMenuUrl !== dispensary.menuUrl) {
      setMenuUrlInputError(false);
      UI.updateDispensaryProperty('menuUrl', debouncedMenuUrl);
      UI.saveDispensaryInfo();
    }
  }, [debouncedMenuUrl]);

  const script = generateEmbedScript({
    menuUrl,
    dispensaryId: dispensary.id,
    menuSectionId: currentSection.id,
    hideViewAllLink: hideViewAllLink && sectionHasViewAllLink,
    hideTitle,
  });

  return {
    currentSection,
    handleMenuUrlChange,
    handleSectionSelect,
    hideTitle,
    hideViewAllLink,
    isValidUrl,
    menuUrl,
    menuUrlInputError,
    script,
    sectionHasViewAllLink,
    setHideTitle,
    setHideViewAllLink,
  };
}
