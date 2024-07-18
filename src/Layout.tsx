import { Outlet } from "react-router-dom";
import NavBar from "./Components/navbar";
import Footer from "./Components/footer";

function Layout() {
  return (
    <>
      // Navigate Bar part
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
