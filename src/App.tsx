import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Store from "./pages/Store";
import Product from "./pages/Product";
import About from "./pages/About";
import Personal from "./pages/Personal";
import ShopppingCart from "./pages/ShoppingCart";
import CheckoutInfo from "./pages/CheckoutInfo";
import ScrollToTop from "./utils/ScrollToTop";
import "./style/App.css";

function App() {
  return (
    <>
      <HashRouter>
        <ScrollToTop />
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
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
