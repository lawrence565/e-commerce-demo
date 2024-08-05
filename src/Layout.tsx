import { Outlet } from "react-router-dom";
import NavBar from "/Components/Navbar.tsx";
import Footer from "/Components/Footer.tsx";

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
