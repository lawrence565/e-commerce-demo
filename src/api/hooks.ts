import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getSingleProduct,
    getProducts,
    getCart,
    postCart,
    deleteCartItem,
    editCartItem,
    syncCart,
} from "./productApi";
import { queryKeys } from "./queryClient";
import { CartItem } from "../types";

// ============ Product Hooks ============

/**
 * 取得單一商品
 */
export function useProduct(category: string, id: number) {
    return useQuery({
        queryKey: queryKeys.products.single(category, id),
        queryFn: () => getSingleProduct(category, id),
        enabled: !!category && !!id,
    });
}

/**
 * 取得分類商品列表
 */
export function useProducts(category: string) {
    return useQuery({
        queryKey: queryKeys.products.byCategory(category),
        queryFn: () => getProducts(category),
        enabled: !!category,
    });
}

// ============ Cart Hooks ============

/**
 * 取得購物車內容
 */
export function useCart() {
    return useQuery({
        queryKey: queryKeys.cart.all,
        queryFn: getCart,
        staleTime: 1 * 60 * 1000, // 購物車資料 1 分鐘內視為新鮮
    });
}

/**
 * 新增商品到購物車
 */
export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItem: CartItem) => postCart(cartItem),
        onSuccess: () => {
            // 成功後使購物車快取失效，觸發重新請求
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
        },
        onError: (error) => {
            console.error("Failed to add item to cart:", error);
        },
    });
}

/**
 * 從購物車移除商品
 */
export function useRemoveFromCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCartItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
        },
    });
}

/**
 * 更新購物車商品數量
 */
export function useUpdateCartItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
            editCartItem(id, quantity),
        onMutate: async ({ id, quantity }) => {
            // 樂觀更新
            await queryClient.cancelQueries({ queryKey: queryKeys.cart.all });
            const previousCart = queryClient.getQueryData<CartItem[]>(queryKeys.cart.all);

            if (previousCart) {
                queryClient.setQueryData<CartItem[]>(queryKeys.cart.all, (old) =>
                    old?.map((item) =>
                        item.productId === id ? { ...item, quantity } : item
                    )
                );
            }

            return { previousCart };
        },
        onError: (_err, _variables, context) => {
            // 發生錯誤時回滾
            if (context?.previousCart) {
                queryClient.setQueryData(queryKeys.cart.all, context.previousCart);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
        },
    });
}

/**
 * 同步購物車
 */
export function useSyncCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cart: CartItem[]) => syncCart(cart),
        onSuccess: (data) => {
            if (data) {
                queryClient.setQueryData(queryKeys.cart.all, data);
            }
        },
    });
}
