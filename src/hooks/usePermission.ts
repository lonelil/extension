import { useCallback } from 'react';

import { getUrlHost } from '~utils/domains';

import { useDomainWhitelist } from './useDomainWhitelist';

export async function hasPermission(origin: string) {
  console.log(origin);
  const originWithSlash = origin.endsWith('/') ? origin : `${origin}/`;
  console.log(originWithSlash);

  return chrome.permissions.contains({
    origins: [originWithSlash],
  });
}

export function usePermission() {
  const { addDomain } = useDomainWhitelist();

  const grantPermission = useCallback(async (origin: string) => {
    const granted = await chrome.permissions.request({
      origins: [origin],
    });
    const domain = getUrlHost(origin);
    if (granted && domain) addDomain(domain);
    return granted;
  }, []);

  const checkPermission = useCallback(async (origin: string) => {
    return hasPermission(origin);
  }, []);

  return {
    checkPermission,
    grantPermission,
  };
}
