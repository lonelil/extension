import { useEffect, useState } from 'react';

import { getUrlHost } from '~utils/domains';
import { listenToTabChanges, queryCurrentDomain, stopListenToTabChanges } from '~utils/tabs';

export function useDomain(): null | string {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    const listen = () => queryCurrentDomain(setDomain);
    listen();
    listenToTabChanges(listen);
    return () => {
      stopListenToTabChanges(listen);
    };
  }, []);

  return getUrlHost(domain);
}
