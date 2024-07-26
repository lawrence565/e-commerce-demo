import { Outlet } from "react-router-dom";
import NavBar from "./Components/navbar";
import Footer from "./Components/Footer";

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
