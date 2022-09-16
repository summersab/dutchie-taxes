import { useObserver } from 'mobx-react-lite';
import { useStores } from 'src/hooks/use-stores';
import type { UserState } from '../state/user';

export function useUser(): UserState {
  const stores = useStores();
  return useObserver(() => stores.User);
}
