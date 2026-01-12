import { QueryClient } from "@tanstack/react-query";

// React Query 全域配置
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 資料在 5 分鐘內視為新鮮，不會重新請求
            staleTime: 5 * 60 * 1000,
            // 快取保留 30 分鐘
            gcTime: 30 * 60 * 1000,
            // 失敗時最多重試 2 次
            retry: 2,
            // 視窗重新聚焦時不自動重新請求
            refetchOnWindowFocus: false,
            // 網路恢復時自動重新請求
            refetchOnReconnect: true,
        },
        mutations: {
            // mutation 失敗時重試 1 次
            retry: 1,
        },
    },
});

// 常用的 query key 工廠函數
export const queryKeys = {
    products: {
        all: ["products"] as const,
        byCategory: (category: string) => ["products", category] as const,
        single: (category: string, id: number) => ["products", category, id] as const,
    },
    cart: {
        all: ["cart"] as const,
    },
    user: {
        profile: ["user", "profile"] as const,
        orders: ["user", "orders"] as const,
    },
} as const;
