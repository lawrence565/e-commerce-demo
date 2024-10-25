import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Spinner from "./utils/Spinner.tsx";

function Layout() {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Spinner />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
