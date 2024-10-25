import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

import { useSpinner } from "./utils/SpinnerContext.tsx";
import Spinner from "./utils/Spinner.tsx";

function Layout() {
  const { isLoading } = useSpinner();

  return (
    <>
      {isLoading && <Spinner />}
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
