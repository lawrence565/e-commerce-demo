import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import mainLogo from "../assets/main-logo.svg";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";
import personalIcon from "../assets/personal-icon.svg";
import "../style/NavbarStyle.scss";
import { useEffect, useState } from "react";

function NavBar() {
  const [cookie, setCookie] = useCookies(["cart"]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (cookie.cart === undefined) {
      setCookie("cart", []);
    } else cookie.cart;
  });

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <nav className="min-h-[5dvh] h-fit border-b-2 border-[#a0937d] flex justify-center relative">
      <div className="nav-bar grid grid-cols-2 w-full max-w-[1200px] z-20">
        <div className="logo-container flex items-center">
          <Link className="w-fit" to="/">
            <img
              className="h-9 sm:h-10 cursor-pointer mx-4 sm:m-2"
              src={mainLogo}
              alt="The main logo of the website"
            />
          </Link>
        </div>
        <div id="normal-navbar" className="flex justify-end mr-4">
          <div className="hidden md:flex justify-end">
            <Link className="nav-item" to="/about">
              關於我們
            </Link>
            <Link className="nav-item" to="/stores">
              商店首頁
            </Link>
          </div>

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
              <span className="absolute top-[10%] right-[-20%] rounded-lg bg-red-600 w-[1rem] aspect-square flex items-center justify-center">
                <p className="text-[0.8rem] text-white">{cookie.cart.length}</p>
              </span>
            )}
          </Link>
          <Link className="flex items-center mx-1" id="personal" to="/personal">
            <img className="w-8 h-8" src={personalIcon} alt="Personal Icon " />
          </Link>
          <div className="flex lg:hidden justify-end">
            <button
              className="text-midBrown focus:outline-none"
              id="menu-button"
              aria-label="Toggle navigation"
              onClick={handleOpen}
            >
              <svg
                className="h-6 w-6 text-midBrown"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-[100%] w-full border-b-4 border-midBrown rounded-md flex flex-col items-center bg-white shadow-lg transition-all transform ${
          isOpen
            ? "translate-y-0 opacity-100 z-10 ease-in"
            : "-translate-y-full opacity-0 -z-10 ease-out"
        }`}
      >
        <Link
          className="nav-item text-xl w-full p-2 flex justify-center"
          to="/about"
          onClick={() => setIsOpen(false)}
        >
          關於我們
        </Link>
        <Link
          className="nav-item text-xl w-full p-2 flex justify-center"
          to="/stores"
          onClick={() => setIsOpen(false)}
        >
          商店首頁
        </Link>
        <Link
          className="nav-item text-xl w-full p-2 flex justify-center"
          to="/personal"
          onClick={() => setIsOpen(false)}
        >
          個人頁面
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
