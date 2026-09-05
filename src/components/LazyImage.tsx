import {
  useEffect,
  useState,
  useRef,
  ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";
import { getAssetUrl, getResponsiveImage } from "../utils/imageUtils";

type SkeletonAnimationType = "shimmer" | "pulse" | "spin" | "wave";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  skeletonAnimation?: SkeletonAnimationType;
  placeholderSrc?: string;
}

/**
 * 懶載入圖片組件
 * - 自動加入 loading="lazy"
 * - 載入失敗時使用 fallback 圖片
 * - 使用 aspect-ratio-padding-hack 避免排版亂跳
 * - 顯示 skeleton placeholder
 */
export function LazyImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className = "",
  width,
  height,
  fill = false,
  skeletonAnimation = "shimmer",
  onLoad,
  onError,
  srcSet,
  sizes = "100vw",
  placeholderSrc,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    setIsLoaded(true);
    onError?.(event);
  };

  const paddingTop =
    !fill && width && height ? `${(height / width) * 100}%` : undefined;

  // Use getAssetUrl to resolve the path correctly
  const responsive = src ? getResponsiveImage(src) : undefined;
  const normalizedSrc = responsive?.src ?? (src ? getAssetUrl(src) : undefined);
  const processedFallback = fallbackSrc ? getAssetUrl(fallbackSrc) : undefined;
  const placeholder = placeholderSrc ?? responsive?.placeholder;

  const roundedClass = className
    .split(" ")
    .filter((token) => token.startsWith("rounded"))
    .join(" ");
  const getSkeletonAnimationClass = () => {
    switch (skeletonAnimation) {
      case "pulse":
        return "skeleton skeleton-pulse";
      case "spin":
        return "skeleton skeleton-spin";
      case "wave":
        return "skeleton skeleton-wave";
      case "shimmer":
      default:
        return "skeleton skeleton-shimmer";
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    // Check if image is already cached and complete
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, [normalizedSrc]);

  return (
    <div
      className={`relative overflow-hidden ${roundedClass} ${fill ? "w-full h-full" : ""}`}
      style={paddingTop ? { paddingTop } : undefined}
    >
      {!isLoaded && (
        <div
          className={`absolute inset-0 ${placeholder ? "blur-sm scale-105" : getSkeletonAnimationClass()}`}
          style={{
            borderRadius: "inherit",
            backgroundImage: placeholder ? `url("${placeholder}")` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={hasError ? processedFallback : normalizedSrc}
        srcSet={hasError ? undefined : (srcSet ?? responsive?.srcSet)}
        sizes={sizes}
        alt={alt || "圖片"}
        loading="lazy"
        decoding="async"
        width={width ?? responsive?.width}
        height={height ?? responsive?.height}
        onLoad={handleLoad}
        onError={handleError}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className} `}
        style={{ borderRadius: "inherit" }}
        {...props}
      />
    </div>
  );
}

/**
 * 產品圖片專用組件
 * 預設使用產品 fallback 圖片
 */
export function ProductImage({
  category,
  name,
  alt,
  className = "",
  width,
  height,
  ...props
}: {
  category: string;
  name: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height">) {
  // src needs to be just the path, LazyImage handles the base URL
  const imagePath = `${category}s/${name}.webp`;

  return (
    <LazyImage
      src={imagePath}
      alt={alt || name}
      fallbackSrc="/placeholder.svg"
      className={className}
      width={width}
      height={height}
      {...props}
    />
  );
}
