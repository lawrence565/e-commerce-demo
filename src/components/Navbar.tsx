import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import mainLogo from "../assets/main-logo.svg";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";
import personalIcon from "../assets/personal-icon.svg";
import "../style/NavbarStyle.scss";
import { useEffect } from "react";

function NavBar() {
  const [cookie, setCookie] = useCookies(["cart"]);
  useEffect(() => {
    if (cookie.cart === undefined) {
      setCookie("cart", []);
    } else cookie.cart;
  });

  return (
    <div className="flex justify-center h-fit border-b-2 border-[#a0937d] min-h-[5dvh]">
      <div className="nav-bar grid grid-cols-2 w-full max-w-[1200px] my-2">
        <div className="logo-container">
          <Link className="w-fit" to="/">
            <img
              className="h-12 cursor-pointer m-0"
              src={mainLogo}
              alt="The main logo of the website"
            />
          </Link>
        </div>
        <div className="flex justify-end ">
          <Link className="nav-item" to="/about">
            關於我們
          </Link>
          <Link className="nav-item" to="/stores">
            商店首頁
          </Link>
          <Link className="nav-item" to="/personal">
            個人頁面
          </Link>
          <Link
            className="flex items-center mx-1 relative"
            id="shopping-cart"
            to="/shoppingcart"
          >
            <img
              className="w-8 h-8"
              src={shoppingCartIcon}
              alt="Shopping Cart Icon"
            />
            {cookie.cart && cookie.cart.length > 0 && (
              <span className="absolute top-0 right-[-20%] rounded-lg bg-red-600 w-[1rem] aspect-square flex items-center justify-center">
                <p className="text-[0.8rem] text-white">{cookie.cart.length}</p>
              </span>
            )}
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
