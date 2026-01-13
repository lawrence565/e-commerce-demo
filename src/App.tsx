import { Routes, Route, HashRouter } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import { useState } from "react";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Store from "./pages/Store";
import Product from "./pages/Product";
import About from "./pages/About";
import Personal from "./pages/Personal";
import ShopppingCart from "./pages/ShoppingCart";
import CheckoutInfo from "./pages/CheckoutInfo";
import FinishOrder from "./pages/FinishOrder";
import ScrollToTop from "./utils/ScrollToTop";
import StillBuilding from "./pages/StillBuilding";
import Helps from "./pages/Helps";
import "./style/App.css";

import { SpinnerProvider } from "./utils/SpinnerContext.tsx";
import Blank from "./pages/blank.tsx";

type SubtotalInfo = {
  total: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  setTotal: (total: number) => void;
  setSubtotal: (subtotal: number) => void;
  setDiscount: (discount: number) => void;
  setCouponDiscount: (couponDiscount: number) => void;
};

type Subtotal = {
  total: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
};

function App() {
  const [cookie, setCookie] = useCookies(["cart"]);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const subtotalInfo: SubtotalInfo = {
    total: total,
    subtotal: subtotal,
    discount: discount,
    couponDiscount: couponDiscount,
    setTotal: setTotal,
    setSubtotal: setSubtotal,
    setDiscount: setDiscount,
    setCouponDiscount: setCouponDiscount,
  };
  const subtotalData: Subtotal = {
    total: total,
    subtotal: subtotal,
    discount: discount,
    couponDiscount: couponDiscount,
  };

  if (cookie.cart === undefined) {
    setCookie("cart", []);
  } else cookie.cart;

  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <CookiesProvider>
          <SpinnerProvider>
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
                  element={<ShopppingCart subtotalInfo={subtotalInfo} />}
                />
                <Route
                  path="checkout"
                  element={<CheckoutInfo subtotalData={subtotalData} />}
                />
                <Route path="finishOrder" element={<FinishOrder />} />
                <Route path="blank" element={<Blank />} />
              </Route>
            </Routes>
          </SpinnerProvider>
        </CookiesProvider>
      </HashRouter>
    </>
  );
}

export default App;
