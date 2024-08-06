import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import Store from "./pages/Store.tsx";
import Product from "./pages/Product.tsx";
import About from "./pages/About.tsx";
import Personal from "./pages/Personal.tsx";
import ShopppingCart from "./pages/ShoppingCart.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
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
            <Route path="stores/:category/:productName" element={<Product />} />
            <Route path="shoppingcart" element={<ShopppingCart />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
