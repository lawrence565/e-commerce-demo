import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import Spinner from "./utils/Spinner";
import Layout from "./Layout";
import ScrollToTop from "./utils/ScrollToTop";

import { CartProvider } from "./context/CartProvider";
import { useCartCookie } from "./utils/useCartCookie";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastProvider } from "./components/Toast";

// Lazy loaded pages
const Homepage = lazy(() => import("./pages/Homepage"));
const Store = lazy(() => import("./pages/Store"));
const Product = lazy(() => import("./pages/Product"));
const About = lazy(() => import("./pages/About"));
const Personal = lazy(() => import("./pages/Personal"));
const ShopppingCart = lazy(() => import("./pages/ShoppingCart"));
const CheckoutInfo = lazy(() => import("./pages/CheckoutInfo"));
const FinishOrder = lazy(() => import("./pages/FinishOrder"));
const Helps = lazy(() => import("./pages/Helps"));
const Business = lazy(() => import("./pages/Business"));
const MerchantLayout = lazy(() => import("./pages/Merchant/MerchantLayout"));
const MerchantDashboard = lazy(() => import("./pages/Merchant/Dashboard"));
const MerchantProducts = lazy(() => import("./pages/Merchant/Products"));
const MerchantPosts = lazy(() => import("./pages/Merchant/Posts"));
const Login = lazy(() => import("./pages/Login"));

function CartCookieSync() {
  useCartCookie();
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <CookiesProvider>
          <CartCookieSync />
          <CartProvider>
            <ToastProvider>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="about" element={<About />} />
                    <Route path="personal" element={<Personal />} />
                    <Route path="stores" element={<Store />}>
                      <Route path=":category" element={<Store />} />
                    </Route>
                    <Route
                      path="stores/:category/:itemId"
                      element={<Product />}
                    />
                    <Route
                      path="business/:function"
                      element={<Business />}
                    ></Route>
                    <Route path="help/:functions" element={<Helps />}></Route>
                    <Route path="shoppingcart" element={<ShopppingCart />} />
                    <Route path="checkout" element={<CheckoutInfo />} />
                    <Route path="finishOrder" element={<FinishOrder />} />
                  </Route>
                  <Route path="merchant" element={<MerchantLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<MerchantDashboard />} />
                    <Route path="products" element={<MerchantProducts />} />
                    <Route path="posts" element={<MerchantPosts />} />
                  </Route>
                  <Route path="login" element={<Login />} />
                </Routes>
              </Suspense>
            </ToastProvider>
          </CartProvider>
        </CookiesProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
