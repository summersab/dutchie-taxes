import useStores from './use-stores';
/**
 * @returns {(msg?: string, type?: 'danger' | 'error' | 'info' | 'success', timeout?: number) => void}
 */
export default function useErnie() {
  const stores = useStores();
  return stores?.UI?.showErnie;
}
