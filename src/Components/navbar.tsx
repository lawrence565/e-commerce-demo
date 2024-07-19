import mainLogo from "../assets/main-logo.svg";
import shoppingKartIcon from "../assets/shopping-kart-icon.svg";
import personalIcon from "../assets/personal-icon.svg";
import "../style/navbarStyle.scss";
import { Link } from "react-router-dom";

function NavBar(): JSX.Element {
  return (
    <div className="nav-bar grid grid-cols-2 justify-center items-center">
      <div className="logo-container ">
        <img
          className="h-12"
          src={mainLogo}
          alt="The main logo of the website"
        />
      </div>
      <div className="flex justify-end">
        <Link className="nav-item flex items-center mx-2" to="/about">
          關於我們
        </Link>
        <Link className="nav-item flex items-center mx-2" to="/store">
          商店首頁
        </Link>
        <Link className="nav-item flex items-center mx-2" to="/personal">
          個人頁面
        </Link>
        <Link id="shopping-kart" to="/shoppingkart">
          <img
            className="w-12 h-12"
            src={shoppingKartIcon}
            alt="Shopping Kart Icon"
          />
        </Link>
        <Link id="personal" to="/personal">
          <img className="w-12 h-12" src={personalIcon} alt="Personal Icon " />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
