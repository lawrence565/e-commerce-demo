import { Outlet } from "react-router-dom";
import NavBar from "./Components/navbar_tmp.tsx";
import Footer from "./Components/footer_tmp.tsx";

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
