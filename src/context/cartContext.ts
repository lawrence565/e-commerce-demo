import { createContext } from "react";

export type CartContextType = {
  total: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  setTotal: (total: number) => void;
  setSubtotal: (subtotal: number) => void;
  setDiscount: (discount: number) => void;
  setCouponDiscount: (couponDiscount: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
