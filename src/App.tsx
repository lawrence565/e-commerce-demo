import { Routes, Route, HashRouter } from "react-router-dom";
import { lazy } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useState } from "react";
import Layout from "./Layout";
import ScrollToTop from "./utils/ScrollToTop";
import "./style/App.css";

import { SpinnerProvider } from "./utils/SpinnerContext.tsx";
import { CartProvider } from "./context/CartContext";

const Homepage = lazy(() => import("./pages/Homepage"));
const Store = lazy(() => import("./pages/Store"));
const Product = lazy(() => import("./pages/Product"));
const About = lazy(() => import("./pages/About"));
const Personal = lazy(() => import("./pages/Personal"));
const ShopppingCart = lazy(() => import("./pages/ShoppingCart"));
const CheckoutInfo = lazy(() => import("./pages/CheckoutInfo"));
const FinishOrder = lazy(() => import("./pages/FinishOrder"));
const StillBuilding = lazy(() => import("./pages/StillBuilding"));
const Helps = lazy(() => import("./pages/Helps"));

function App() {
  const [cookie, setCookie] = useCookies(["cart"]);

  if (cookie.cart === undefined) {
    setCookie("cart", []);
  } else cookie.cart;

  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <CookiesProvider>
          <SpinnerProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Homepage />} />
                  <Route path="about" element={<About />} />
                  <Route path="personal" element={<Personal />} />
                  <Route path="stores" element={<Store />}>
                    <Route path=":category" element={<Store />} />
                  </Route>
                  <Route path="stores/:category/:itemId" element={<Product />} />
                  <Route
                    path="business/:function"
                    element={<StillBuilding />}
                  ></Route>
                  <Route path="help/:functions" element={<Helps />}></Route>
                  <Route
                    path="shoppingcart"
                    element={<ShopppingCart />}
                  />
                  <Route
                    path="checkout"
                    element={<CheckoutInfo />}
                  />
                  <Route path="finishOrder" element={<FinishOrder />} />
                </Route>
              </Routes>
            </CartProvider>
          </SpinnerProvider>
        </CookiesProvider>
      </HashRouter>
    </>
  );
}

export default App;
