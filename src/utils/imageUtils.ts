import imageManifest from "../generated/images.json";

interface ResponsiveImage {
  width: number;
  height: number;
  src: string;
  variants: { src: string; width: number; bytes: number }[];
  placeholder: string;
}

// Remote/API image URLs pass through unchanged. Only known local assets have variants.
export function getResponsiveImage(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  const key = (base !== "/" && path.startsWith(base) ? path.slice(base.length) : path)
    .replace(/^[./]+/, "");
  const image = (imageManifest as Record<string, ResponsiveImage>)[key];
  if (!image) return undefined;
  return {
    ...image,
    src: getAssetUrl(image.src),
    srcSet: image.variants.map((variant) => `${getAssetUrl(variant.src)} ${variant.width}w`).join(", "),
  };
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
