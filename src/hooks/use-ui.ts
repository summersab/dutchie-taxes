import { useObserver } from 'mobx-react-lite';
import { useStores } from 'src/hooks/use-stores';
import { UIState } from 'src/state/ui';

export function useUI(): UIState {
  const stores = useStores();
  return useObserver(() => stores.UI);
}
