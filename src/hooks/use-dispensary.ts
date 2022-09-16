import { useObserver } from 'mobx-react-lite';
import { EmptyObject } from 'shared/utils/type-utils';
import { useStores } from 'src/hooks/use-stores';
import { GqlDispensaries } from 'types/graphql';

export function useDispensary(): EmptyObject | GqlDispensaries {
  const stores = useStores();
  return useObserver(() => stores.UI.dispensary);
}
