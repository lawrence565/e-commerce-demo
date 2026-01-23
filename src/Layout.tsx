import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import NavBar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

import { useSpinnerStore } from "./store/appStore";
import Spinner from "./utils/Spinner.tsx";

function Layout() {
  const { isLoading } = useSpinnerStore();

  return (
    <>
      {isLoading && <Spinner />}
      <NavBar />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default Layout;
