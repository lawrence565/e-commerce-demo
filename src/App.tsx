import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import Layout from "./Layout";
import ScrollToTop from "./utils/ScrollToTop";
import "./style/App.css";
import "./style/animations.css";

import { SpinnerProvider } from "./utils/SpinnerContext.tsx";
import { CartProvider } from "./context/CartContext";
import { useCartCookie } from "./utils/useCartCookie";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastProvider } from "./components/Toast";
import { ProductListSkeleton } from "./components/Skeleton";

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

// 頁面載入 Fallback
function PageLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="w-full max-w-[1200px]">
        <ProductListSkeleton count={6} />
      </div>
    </div>
  );
}

function App() {
  useCartCookie();

  return (
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <CookiesProvider>
          <SpinnerProvider>
            <CartProvider>
              <ToastProvider>
                <Suspense fallback={<PageLoadingFallback />}>
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
                      <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                      />
                      <Route path="dashboard" element={<MerchantDashboard />} />
                      <Route path="products" element={<MerchantProducts />} />
                      <Route path="posts" element={<MerchantPosts />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                  </Routes>
                </Suspense>
              </ToastProvider>
            </CartProvider>
          </SpinnerProvider>
        </CookiesProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
