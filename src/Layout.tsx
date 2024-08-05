import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navbar_tmp.tsx";
import Footer from "./Components/Footer_tmp.tsx";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
