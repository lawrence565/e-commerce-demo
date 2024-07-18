import mainLogo from "../assets/main-logo.svg";
import shoppingKartIcon from "../assets/shopping-kart-icon.svg";
import personalIcon from "../assets/personal-icon.svg";
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
      <div>
        <Link id="shopping-kart" to="/shoppingkart">
          <img src={shoppingKartIcon} alt="Shopping Kart Icon" />
        </Link>
        <Link id="personal" to="/personal">
          <img src={personalIcon} alt="Personal Icon " />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
