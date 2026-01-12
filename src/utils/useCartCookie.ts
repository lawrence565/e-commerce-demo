import { useCookies } from "react-cookie";
import { useEffect } from "react";

export const useCartCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const cart = Array.isArray(cookies.cart) ? cookies.cart : [];

  useEffect(() => {
    if (!Array.isArray(cookies.cart)) {
      setCookie("cart", [], { path: "/" });
    }
  }, [cookies.cart, setCookie]);

  return {
    cart,
    setCartCookie: setCookie,
    removeCartCookie: () => removeCookie("cart"),
  };
};
