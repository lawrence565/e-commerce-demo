interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string;
}

/**
 * 基礎骨架屏組件
 */
export function Skeleton({
    className = "",
    width,
    height,
    borderRadius = "8px",
}: SkeletonProps) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width: typeof width === "number" ? `${width}px` : width || "100%",
                height: typeof height === "number" ? `${height}px` : height || "20px",
                borderRadius,
            }}
        />
    );
}

/**
 * 商品卡片骨架屏
 */
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <Skeleton height={200} className="mb-4" />
            <Skeleton height={24} width="80%" className="mb-2" />
            <Skeleton height={16} width="60%" className="mb-2" />
            <Skeleton height={20} width="40%" />
        </div>
    );
}

/**
 * 商品列表骨架屏
 */
export function ProductListSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
}

/**
 * 購物車項目骨架屏
 */
export function CartItemSkeleton() {
    return (
        <div className="flex items-center p-4 border-b-2 border-gray-200 animate-fade-in">
            <Skeleton width={100} height={75} className="mr-4" />
            <div className="flex-1">
                <Skeleton height={24} width="70%" className="mb-2" />
                <Skeleton height={16} width="30%" />
            </div>
            <Skeleton width={80} height={40} className="ml-4" />
        </div>
    );
}

/**
 * 文字行骨架屏
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    height={16}
                    width={index === lines - 1 ? "60%" : "100%"}
                />
            ))}
        </div>
    );
}

/**
 * 圓形頭像骨架屏
 */
export function AvatarSkeleton({ size = 48 }: { size?: number }) {
    return <Skeleton width={size} height={size} borderRadius="50%" />;
}
