import { useState, useEffect, ImgHTMLAttributes } from "react";

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    placeholderSrc?: string;
    alt: string;
}

/**
 * 漸進式圖片載入組件
 * 
 * 先顯示模糊的低解析度佔位圖，再載入高解析度圖片
 * 提供平滑的淡入過渡效果
 */
export function ProgressiveImage({
    src,
    placeholderSrc,
    alt,
    className = "",
    ...props
}: ProgressiveImageProps) {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHighResLoaded, setIsHighResLoaded] = useState(false);

    useEffect(() => {
        // 預載入高解析度圖片
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
            setIsHighResLoaded(true);
        };
    }, [src]);

    return (
        <div className="relative overflow-hidden">
            <img
                src={imgSrc}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`
          transition-all duration-500
          ${isLoaded ? "opacity-100" : "opacity-0"}
          ${!isHighResLoaded && placeholderSrc ? "blur-sm scale-105" : "blur-0 scale-100"}
          ${className}
        `}
                {...props}
            />
            {/* 載入中的骨架屏 */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 skeleton"
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

/**
 * 使用 Intersection Observer 的懶載入圖片
 * 只有進入視口時才開始載入
 */
export function IntersectionImage({
    src,
    alt,
    className = "",
    threshold = 0.1,
    ...props
}: ProgressiveImageProps & { threshold?: number }) {
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!imgRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(imgRef);

        return () => observer.disconnect();
    }, [imgRef, threshold]);

    return (
        <div className="relative overflow-hidden">
            <img
                ref={setImgRef}
                src={isInView ? src : undefined}
                data-src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                className={`
          transition-opacity duration-300
          ${isLoaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
                {...props}
            />
            {!isLoaded && (
                <div
                    className="absolute inset-0 skeleton"
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

/**
 * 產生低解析度佔位圖的 URL
 * 用於搭配後端圖片處理服務
 */
export function getPlaceholderUrl(originalUrl: string, width: number = 20): string {
    // 假設後端支援查詢參數調整圖片大小
    // 可根據實際 CDN/圖片服務調整
    const url = new URL(originalUrl, window.location.origin);
    url.searchParams.set("w", width.toString());
    url.searchParams.set("q", "10"); // 低品質
    return url.toString();
}
