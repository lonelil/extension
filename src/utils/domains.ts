export function getUrlInfo(url: string): { domain: string; origin: string } | null {
  try {
    const u = new URL(url);
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    return {
      domain: u.host.toLowerCase(),
      origin: u.origin.toLowerCase(),
    };
  } catch {
    return null;
  }
}

export function getUrlHost(url: string): string | null {
  const info = getUrlInfo(url);
  return info?.domain ?? null;
}
