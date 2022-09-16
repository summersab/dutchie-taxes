import PublicEnv from 'shared/utils/public-env';
import { MENU_TYPES } from './embed-your-menu.constants';

export const generateEmbedScript = (dispensaryId, menuType) => {
  const identifier = dispensaryId;
  let params = '';

  switch (menuType) {
    case MENU_TYPES.viewOnly.value:
      params = new URLSearchParams({ viewOnlyMode: true });
      break;
    case MENU_TYPES.rec.value:
      params = new URLSearchParams({ menuType: `rec` });
      break;
    case MENU_TYPES.med.value:
      params = new URLSearchParams({ menuType: `med` });
      break;
    case MENU_TYPES.multiLocation.value:
      params = new URLSearchParams({ chainLocations: true });
      break;
    case MENU_TYPES.dynamicDelivery.value:
      params = new URLSearchParams({ chainLocations: true });
      params.append(`searchMethod`, `deliveryArea`);
      break;
    default:
      params = new URLSearchParams();
      break;
  }

  const paramsString = params.toString().length ? `?${params.toString()}` : ``;

  // eslint-disable-next-line max-len
  return `<div><script async="" id="dutchie--embed__script" src="${PublicEnv.consumerUrl}/api/v2/embedded-menu/${identifier}.js${paramsString}"></script></div>`;
};
