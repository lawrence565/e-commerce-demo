export function getPlaceholderUrl(originalUrl: string, width: number = 20): string {
  const url = new URL(originalUrl, window.location.origin);
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", "10");
  return url.toString();
}

/**
 * Resolves the correct asset URL based on the deployment base path.
 * Handles both development and production (GitHub Pages) environments.
 */
export function getAssetUrl(path: string): string {
  // If path is absolute URL (http/https), return as is
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || "/";
  
  // If path already starts with baseUrl (and baseUrl is not just root), 
  // it's likely an already resolved imported asset. Return as is.
  // Note: logic handles both "/app/" and "/app" formats
  if (baseUrl !== "/" && path.startsWith(baseUrl)) {
    return path;
  }

  // Remove leading slash or dot-slash to normalize
  // This converts "/foo.png" or "./foo.png" to "foo.png"
  const cleanPath = path.replace(/^[./]+/, "");
  
  // Ensure baseUrl ends with slash
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return `${cleanBaseUrl}${cleanPath}`;
}
