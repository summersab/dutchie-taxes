import PublicEnv from 'shared/utils/public-env';

export const generateEmbedScript = ({ menuUrl, dispensaryId, menuSectionId, hideTitle, hideViewAllLink }) => {
  const params = new URLSearchParams({ routeRoot: menuUrl });

  if (hideTitle) {
    params.append(`hideTitle`, `true`);
  }
  if (hideViewAllLink) {
    params.append(`hideLink`, `true`);
  }

  return `<div><script async="" id="dutchie--carousel-embed-${menuSectionId}__script" src="${
    PublicEnv.consumerUrl
  }/api/v3/embedded-menu/${dispensaryId}/carousels/${menuSectionId}.js?${params.toString()}"></script></div>`;
};
