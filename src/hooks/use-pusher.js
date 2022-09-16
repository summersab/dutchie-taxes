import { useObserver } from 'mobx-react-lite';
import { useStores } from 'src/hooks/use-stores';

export default function usePusher() {
  const stores = useStores();
  return useObserver(() => stores.Pusher);
}
