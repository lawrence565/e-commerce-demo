import { useState, ImgHTMLAttributes } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

/**
 * 懶載入圖片組件
 * - 自動加入 loading="lazy"
 * - 載入失敗時使用 fallback 圖片
 * - 加入淡入動畫效果
 */
export function LazyImage({
    src,
    alt,
    fallbackSrc = "/placeholder.webp",
    className = "",
    ...props
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <img
            src={hasError ? fallbackSrc : src}
            alt={alt || "圖片"}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            className={`
        transition-opacity duration-300
        ${isLoaded ? "opacity-100" : "opacity-0"}
        ${className}
      `}
            {...props}
        />
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
    ...props
}: {
    category: string;
    name: string;
    alt?: string;
    className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src">) {
    return (
        <LazyImage
            src={`./${category}s/${name}.webp`}
            alt={alt || name}
            fallbackSrc="/placeholder.webp"
            className={className}
            {...props}
        />
    );
}
