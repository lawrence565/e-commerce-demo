import { create } from "zustand";

// 使用者狀態類型
interface User {
    id: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
}

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user, error: null }),
    clearUser: () => set({ user: null }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));

// UI 狀態類型
interface UIState {
    isMobileMenuOpen: boolean;
    isCartDrawerOpen: boolean;
    isSearchOpen: boolean;
    activeModal: string | null;
    isLoading: boolean; // Spinner 狀態

    // Actions
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (isOpen: boolean) => void;
    toggleCartDrawer: () => void;
    setCartDrawerOpen: (isOpen: boolean) => void;
    toggleSearch: () => void;
    openModal: (modalId: string) => void;
    closeModal: () => void;
    showSpinner: () => void;
    hideSpinner: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isCartDrawerOpen: false,
    isSearchOpen: false,
    activeModal: null,
    isLoading: false,

    toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    toggleCartDrawer: () =>
        set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
    setCartDrawerOpen: (isOpen) => set({ isCartDrawerOpen: isOpen }),
    toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
    openModal: (modalId) => set({ activeModal: modalId }),
    closeModal: () => set({ activeModal: null }),
    showSpinner: () => set({ isLoading: true }),
    hideSpinner: () => set({ isLoading: false }),
}));

/**
 * 相容性 hook - 用於逐步遷移
 * 與原有 useSpinner 介面相同
 */
export const useSpinnerStore = () => {
    const { isLoading, showSpinner, hideSpinner } = useUIStore();
    return { isLoading, showSpinner, hideSpinner };
};

