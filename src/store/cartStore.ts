import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "../types";
import { syncCart as syncCartApi, getCart } from "../api/productApi";

interface CartState {
    // 狀態
    items: CartItem[];
    subtotal: number;
    discount: number;
    couponDiscount: number;
    total: number;
    isLoading: boolean;
    appliedCoupons: number[];

    // Actions
    setItems: (items: CartItem[]) => void;
    addItem: (item: CartItem) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    setDiscount: (discount: number) => void;
    setCouponDiscount: (couponDiscount: number) => void;
    applyCoupon: (couponId: number, discount: number) => void;
    removeCoupon: (couponId: number, discount: number) => void;
    syncWithServer: () => Promise<void>;
    fetchCart: () => Promise<void>;
    recalculateTotal: () => void;
}

// 計算折扣的輔助函數
const calculateDiscount = (subtotal: number): number => {
    if (subtotal >= 5000) return 500;
    if (subtotal >= 3000) return 200;
    if (subtotal >= 1000) return 50;
    return 0;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            // 初始狀態
            items: [],
            subtotal: 0,
            discount: 0,
            couponDiscount: 0,
            total: 0,
            isLoading: false,
            appliedCoupons: [],

            setItems: (items) => {
                set({ items });
                get().recalculateTotal();
            },

            addItem: (item) => {
                const { items } = get();
                const existingIndex = items.findIndex(
                    (i) => i.productId === item.productId
                );

                if (existingIndex !== -1) {
                    // 更新數量
                    const updated = [...items];
                    updated[existingIndex].quantity += item.quantity;
                    set({ items: updated });
                } else {
                    set({ items: [...items, item] });
                }
                get().recalculateTotal();
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.productId !== productId),
                }));
                get().recalculateTotal();
            },

            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.productId === productId ? { ...item, quantity } : item
                    ),
                }));
                get().recalculateTotal();
            },

            clearCart: () => {
                set({
                    items: [],
                    subtotal: 0,
                    discount: 0,
                    couponDiscount: 0,
                    total: 0,
                    appliedCoupons: [],
                });
            },

            setDiscount: (discount) => {
                set({ discount });
                get().recalculateTotal();
            },

            setCouponDiscount: (couponDiscount) => {
                set({ couponDiscount });
                get().recalculateTotal();
            },

            applyCoupon: (couponId, discount) => {
                const { appliedCoupons, couponDiscount } = get();
                if (!appliedCoupons.includes(couponId)) {
                    set({
                        appliedCoupons: [...appliedCoupons, couponId],
                        couponDiscount: couponDiscount + discount,
                    });
                    get().recalculateTotal();
                }
            },

            removeCoupon: (couponId, discount) => {
                const { appliedCoupons, couponDiscount } = get();
                set({
                    appliedCoupons: appliedCoupons.filter((id) => id !== couponId),
                    couponDiscount: Math.max(0, couponDiscount - discount),
                });
                get().recalculateTotal();
            },

            recalculateTotal: () => {
                const { items, couponDiscount } = get();
                // 這裡需要商品價格資訊，暫時只計算數量
                // 實際使用時應該從商品資料中取得價格
                const subtotal = items.reduce((acc, item) => acc + item.quantity * 100, 0); // 假設價格
                const discount = calculateDiscount(subtotal);
                const total = Math.max(0, subtotal - discount - couponDiscount);
                set({ subtotal, discount, total });
            },

            syncWithServer: async () => {
                const { items } = get();
                set({ isLoading: true });
                try {
                    const mergedCart = await syncCartApi(items);
                    if (mergedCart) {
                        set({ items: mergedCart });
                        get().recalculateTotal();
                    }
                } catch (error) {
                    console.error("Failed to sync cart:", error);
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchCart: async () => {
                set({ isLoading: true });
                try {
                    const cart = await getCart();
                    set({ items: cart });
                    get().recalculateTotal();
                } catch (error) {
                    console.error("Failed to fetch cart:", error);
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                items: state.items,
                appliedCoupons: state.appliedCoupons,
            }),
        }
    )
);
