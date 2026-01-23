import { useState, ImgHTMLAttributes } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    width: number;
    height: number;
    fill?: boolean;
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

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHasError(true);
        setIsLoaded(true);
        onError?.(event);
    };

    const paddingTop = fill ? undefined : `${(height / width) * 100}%`;
    const normalizedSrc = src?.startsWith("./") ? src.replace("./", "/") : src;
    const roundedClass = className
        .split(" ")
        .filter((token) => token.startsWith("rounded"))
        .join(" ");

    return (
        <div
            className={`relative overflow-hidden ${roundedClass} ${fill ? "w-full h-full" : ""}`}
            style={paddingTop ? { paddingTop } : undefined}
        >
            {!isLoaded && (
                <div
                    className="absolute inset-0 skeleton"
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
                className={`
                    absolute inset-0 w-full h-full object-cover
                    transition-opacity duration-300
                    ${isLoaded ? "opacity-100" : "opacity-0"}
                    ${className}
                `}
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
