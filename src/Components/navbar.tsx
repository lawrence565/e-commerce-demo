import mainLogo from "../assets/main-logo.svg";
import "../style/navbarStyle.scss";
import { Link } from "react-router-dom";

function NavBar(): JSX.Element {
  return (
    <div className="nav-bar">
      <div className="logo-container">
        <img src={mainLogo} alt="The main logo of the website" />
      </div>
      <div className="navbar">
        <Link className="nav-item" to="/about">
          關於我們
        </Link>
        <Link className="nav-item" to="/store">
          商店首頁
        </Link>
        <Link className="nav-item" to="/personal">
          個人頁面
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
