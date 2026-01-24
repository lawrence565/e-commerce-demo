import { useState, ReactNode } from "react";
import { CartContext } from "./cartContext";

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
