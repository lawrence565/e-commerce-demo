export function getPlaceholderUrl(originalUrl: string, width: number = 20): string {
  const url = new URL(originalUrl, window.location.origin);
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", "10");
  return url.toString();
}
