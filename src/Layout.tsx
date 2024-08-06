import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

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
