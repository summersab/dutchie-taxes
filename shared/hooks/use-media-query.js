import { useState, useEffect } from 'react';
import window from 'global/window';

const useMediaQuery = (query) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    if (typeof window?.matchMedia !== 'function') {
      return undefined;
    }
    const matchObject = window.matchMedia(query);
    const updateMatch = () => setMatch(matchObject.matches);

    updateMatch();
    if (matchObject.addEventListener) {
      matchObject.addEventListener('change', updateMatch);
      return () => {
        matchObject.removeEventListener('change', updateMatch);
      };
    }

    matchObject.addListener(updateMatch);
    return () => {
      matchObject.removeListener(updateMatch);
    };
  }, [query, typeof window?.matchMedia]);

  return match;
};

export default useMediaQuery;
