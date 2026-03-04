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
      className={`bg-sand/30 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] ${className}`}
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
    <div className="bg-paper/50 rounded-xl p-4 border border-sand/30 shadow-sm flex flex-col gap-3">
      <Skeleton height={240} borderRadius="12px" />
      <div className="space-y-2 mt-2">
        <Skeleton height={24} width="80%" />
        <Skeleton height={16} width="60%" />
      </div>
      <div className="mt-auto pt-4 border-t border-sand/30 flex justify-between">
        <Skeleton height={20} width="30%" />
        <Skeleton height={24} width="20%" />
      </div>
    </div>
  );
}

/**
 * 商品列表骨架屏
 */
export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="section min-h-screen py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

/**
 * 購物車項目骨架屏
 */
export function CartItemSkeleton() {
  return (
    <div className="flex items-center p-4 border-b border-sand/30 bg-paper/50 rounded-lg mb-4">
      <Skeleton
        width={100}
        height={100}
        borderRadius="12px"
        className="mr-6 shrink-0"
      />
      <div className="flex-1 space-y-3">
        <Skeleton height={24} width="60%" />
        <Skeleton height={16} width="30%" />
        <Skeleton height={20} width="40%" />
      </div>
      <Skeleton
        width={100}
        height={40}
        borderRadius="20px"
        className="ml-4 shrink-0"
      />
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="section min-h-screen py-12">
      <Skeleton height={40} width="30%" className="mb-8" />
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-4">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
        <div className="lg:w-1/3">
          <div className="bg-paper/50 rounded-2xl p-6 border border-sand/30">
            <Skeleton height={32} width="50%" className="mb-6" />
            <div className="space-y-4 mb-8">
              <Skeleton height={24} width="100%" />
              <Skeleton height={24} width="100%" />
              <Skeleton height={24} width="100%" />
            </div>
            <Skeleton height={50} width="100%" borderRadius="25px" />
          </div>
        </div>
      </div>
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

/**
 * 通用頁面骨架屏
 */
export function PageSkeleton() {
  return (
    <div className="section min-h-screen py-16 max-w-4xl mx-auto">
      <Skeleton height={48} width="40%" className="mb-12" />
      <div className="bg-paper/50 rounded-2xl p-8 border border-sand/30 space-y-8">
        <TextSkeleton lines={5} />
        <Skeleton height={200} borderRadius="16px" className="my-8" />
        <TextSkeleton lines={4} />
      </div>
    </div>
  );
}

/**
 * 首頁專用骨架屏
 */
export function HomepageSkeleton() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section Skeleton */}
      <section className="section pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Skeleton height={32} width="30%" borderRadius="16px" />
            <div className="space-y-4">
              <Skeleton height={64} width="90%" />
              <Skeleton height={64} width="70%" />
            </div>
            <TextSkeleton lines={2} />
            <div className="flex gap-4 pt-4">
              <Skeleton height={48} width={120} borderRadius="24px" />
              <Skeleton height={48} width={120} borderRadius="24px" />
            </div>
          </div>
          <div className="relative">
            <Skeleton height={400} borderRadius="24px" className="rotate-2" />
          </div>
        </div>
      </section>

      {/* Recommended Section Skeleton */}
      <section className="section py-16">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-4 w-1/2">
            <Skeleton height={40} width="60%" />
            <Skeleton height={24} width="40%" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </section>
    </div>
  );
}
