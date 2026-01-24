import { useEffect, useState, ImgHTMLAttributes } from "react";

type SkeletonAnimationType = "shimmer" | "pulse" | "spin" | "wave";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  skeletonAnimation?: SkeletonAnimationType;
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
  fallbackSrc = "/placeholder.webp",
  className = "",
  width,
  height,
  fill = false,
  skeletonAnimation = "shimmer",
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    setHasError(true);
    setIsLoaded(true);
    onError?.(event);
  };

  const paddingTop =
    !fill && width && height ? `${(height / width) * 100}%` : undefined;
  const normalizedSrc = src?.startsWith("./") ? src.replace("./", "/") : src;
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
  }, [normalizedSrc]);

  return (
    <div
      className={`relative overflow-hidden ${roundedClass} ${fill ? "w-full h-full" : ""}`}
      style={paddingTop ? { paddingTop } : undefined}
    >
      {!isLoaded && (
        <div
          className={`absolute inset-0 ${getSkeletonAnimationClass()}`}
          style={{ borderRadius: "inherit" }}
          aria-hidden="true"
        />
      )}
      <img
        src={hasError ? fallbackSrc : normalizedSrc}
        alt={alt || "圖片"}
        loading="lazy"
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
  return (
    <LazyImage
      src={`./${category}s/${name}.webp`}
      alt={alt || name}
      fallbackSrc="/placeholder.webp"
      className={className}
      width={width}
      height={height}
      {...props}
    />
  );
}
