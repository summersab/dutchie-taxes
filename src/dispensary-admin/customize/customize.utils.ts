export type TabsData = {
  label: string;
  key: string;
  icon?: string;
};

type GetTabsProps = {
  isEnabledImageBanner: boolean;
  isEnabledMenuBannerLivePreview: boolean;
  isEnabledAgeVerification: boolean;
};

export function getSelectedTab(currentTab: string, tabs: TabsData[]): string {
  return tabs.map((t) => t.key).some((t) => t === currentTab) ? currentTab : tabs[0].key;
}

export function getTabs({
  isEnabledImageBanner,
  isEnabledMenuBannerLivePreview,
  isEnabledAgeVerification,
}: GetTabsProps): TabsData[] {
  const tabs: TabsData[] = [
    {
      label: 'Homepage',
      key: 'homepage',
    },
    {
      label: 'Colors & Fonts',
      key: 'colors',
    },
  ];

  if (isEnabledImageBanner) {
    tabs.push({
      label: 'Image Banner',
      key: 'image-banner',
      icon: 'NEW',
    });
  }

  if (isEnabledMenuBannerLivePreview) {
    tabs.push({
      label: 'Text Banner',
      key: 'menu-banner',
    });

    if (isEnabledAgeVerification) {
      tabs.push({
        label: 'Age Verification',
        key: 'age-verification',
      });
    }
  } else {
    tabs.push({
      label: 'Menu Banner',
      key: 'menu-banner',
    });
  }

  tabs.push(
    {
      label: 'Legal Disclaimer',
      key: 'legal-disclaimer',
    },
    {
      label: 'Category Photos',
      key: 'category-photos',
    },
    {
      label: 'Embed',
      key: 'embed',
    }
  );

  return tabs;
}
