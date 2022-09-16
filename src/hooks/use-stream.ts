import { useObserver } from 'mobx-react-lite';
import { useStores } from 'src/hooks/use-stores';
import { StreamState } from 'src/state/stream';

export function useStream(): StreamState {
  const stores = useStores();
  return useObserver(() => stores.Stream);
}
