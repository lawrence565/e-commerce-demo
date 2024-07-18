import { Outlet } from "react-router-dom";
import NavBar from "./Components/navbar";

function Layout() {
  return (
    <>
      // Navigate Bar part
      <NavBar />
      <Outlet />
      <footer></footer>
    </>
  );
}

export default Layout;
