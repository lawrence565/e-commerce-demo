import mainLogo from "../assets/main-logo.svg";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";
import personalIcon from "../assets/personal-icon.svg";
import "../style/navbarStyle_tmp.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex justify-center border-b-2 border-[#a0937d]">
      <div className="nav-bar grid grid-cols-2 w-full max-w-[1200px] ">
        <div className="logo-container">
          <Link to="/">
            <img
              className="h-12"
              src={mainLogo}
              alt="The main logo of the website"
            />
          </Link>
        </div>
        <div className="flex justify-end ">
          <Link className="nav-item " to="/about">
            關於我們
          </Link>
          <Link className="nav-item" to="/stores">
            商店首頁
          </Link>
          <Link className="nav-item" to="/personal">
            個人頁面
          </Link>
          <Link
            className="flex items-center mx-1"
            id="shopping-cart"
            to="/shoppingcart"
          >
            <img
              className="w-8 h-8"
              src={shoppingCartIcon}
              alt="Shopping Cart Icon"
            />
          </Link>
          <Link className="flex items-center mx-1" id="personal" to="/personal">
            <img className="w-8 h-8" src={personalIcon} alt="Personal Icon " />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
