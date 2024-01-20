import { Storage } from '@plasmohq/storage';
import { useStorage } from '@plasmohq/storage/hook';

import { getUrlInfo } from '~utils/domains';

export const DEFAULT_DOMAIN_WHITELIST = ['movie-web.app', 'dev.movie-web.app'];

export const storage = new Storage();

const getDomainWhiteList = async () => {
  const whitelist = await storage.get<string[]>('domainWhitelist');
  if (!whitelist) await storage.set('domainWhitelist', DEFAULT_DOMAIN_WHITELIST);
  return whitelist ?? DEFAULT_DOMAIN_WHITELIST;
};

const domainIsInWhitelist = async (domain: string) => {
  const whitelist = await getDomainWhiteList();
  return whitelist?.some((d) => d.includes(domain)) ?? false;
};

export function useDomainStorage() {
  return useStorage<string[]>('domainWhitelist', (v) => v ?? DEFAULT_DOMAIN_WHITELIST);
}

export const isDomainWhitelisted = async (url: string | undefined) => {
  if (!url) return false;
  const urlInfo = getUrlInfo(url);
  if (!urlInfo) return false;
  return domainIsInWhitelist(urlInfo.origin);
};

export const assertDomainWhitelist = async (url: string) => {
  const isWhiteListed = await isDomainWhitelisted(url);
  if (!isWhiteListed) throw new Error('Domain is not whitelisted');
};
