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
import {
  HomepageSkeleton,
  PageSkeleton,
  ProductListSkeleton,
  ProductCardSkeleton,
  CartPageSkeleton,
} from "./components/Skeleton";

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
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<HomepageSkeleton />}>
                        <Homepage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="about"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <About />
                      </Suspense>
                    }
                  />
                  <Route
                    path="personal"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Personal />
                      </Suspense>
                    }
                  />
                  <Route
                    path="stores"
                    element={
                      <Suspense fallback={<ProductListSkeleton count={9} />}>
                        <Store />
                      </Suspense>
                    }
                  >
                    <Route path=":category" element={<Store />} />
                  </Route>
                  <Route
                    path="stores/:category/:itemId"
                    element={
                      <Suspense
                        fallback={
                          <div className="section mt-12">
                            <ProductCardSkeleton />
                          </div>
                        }
                      >
                        <Product />
                      </Suspense>
                    }
                  />
                  <Route
                    path="business/:function"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Business />
                      </Suspense>
                    }
                  ></Route>
                  <Route
                    path="help/:functions"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <Helps />
                      </Suspense>
                    }
                  ></Route>
                  <Route
                    path="shoppingcart"
                    element={
                      <Suspense fallback={<CartPageSkeleton />}>
                        <ShopppingCart />
                      </Suspense>
                    }
                  />
                  <Route
                    path="checkout"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <CheckoutInfo />
                      </Suspense>
                    }
                  />
                  <Route
                    path="finishOrder"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <FinishOrder />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="merchant"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <MerchantLayout />
                    </Suspense>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route
                    path="dashboard"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <MerchantDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="products"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <MerchantProducts />
                      </Suspense>
                    }
                  />
                  <Route
                    path="posts"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <MerchantPosts />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="login"
                  element={
                    <Suspense fallback={<PageSkeleton />}>
                      <Login />
                    </Suspense>
                  }
                />
              </Routes>
            </ToastProvider>
          </CartProvider>
        </CookiesProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
