import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  total: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  setTotal: (total: number) => void;
  setSubtotal: (subtotal: number) => void;
  setDiscount: (discount: number) => void;
  setCouponDiscount: (couponDiscount: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const value = {
    total,
    subtotal,
    discount,
    couponDiscount,
    setTotal,
    setSubtotal,
    setDiscount,
    setCouponDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
