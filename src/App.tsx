import { Routes, Route, HashRouter } from "react-router-dom";
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
import { CookiesProvider, useCookies } from "react-cookie";
import "./style/App.css";

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
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="about" element={<About />} />
              <Route path="personal" element={<Personal />} />
              <Route path="stores" element={<Store />}>
                <Route path=":category" element={<Store />} />
              </Route>
              <Route path="stores/:category/:itemId" element={<Product />} />
              <Route path="shoppingcart" element={<ShopppingCart />} />
              <Route path="checkout" element={<CheckoutInfo />} />
              <Route path="finishOrder" element={<FinishOrder />} />
            </Route>
          </Routes>
        </CookiesProvider>
      </HashRouter>
    </>
  );
}

export default App;
