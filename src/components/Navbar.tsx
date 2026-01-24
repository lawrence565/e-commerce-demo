import { Link } from "react-router-dom";
import mainLogo from "../assets/main-logo.svg";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";
import personalIcon from "../assets/personal-icon.svg";
import { useState } from "react";
import { useCartCookie } from "../utils/useCartCookie";

function NavBar() {
  const { cart } = useCartCookie();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <nav className="nav-shell">
      <div className="nav-inner flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link className="w-fit" to="/">
            <img
              className="h-9 sm:h-10 cursor-pointer"
              src={mainLogo}
              alt="The main logo of the website"
            />
          </Link>
          <span className="hidden sm:inline-flex chip">文創選物</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link className="nav-link" to="/about">
            關於我們
          </Link>
          <Link className="nav-link" to="/stores">
            商店首頁
          </Link>
          <Link className="nav-link" to="/login">
            登入
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            className="nav-pill flex items-center gap-2 relative"
            id="shopping-cart"
            to="/shoppingcart"
          >
            <img
              className="w-6 h-6"
              src={shoppingCartIcon}
              alt="Shopping Cart Icon"
            />
            <span className="hidden sm:inline text-sm font-semibold">
              購物車
            </span>
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-[#d34f4f] text-white w-5 h-5 text-[11px] flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <Link className="nav-pill flex items-center gap-2" to="/personal">
            <img className="w-6 h-6" src={personalIcon} alt="Personal Icon" />
            <span className="hidden sm:inline text-sm font-semibold">
              個人頁
            </span>
          </Link>
          <button
            className="md:hidden nav-pill focus-ring"
            id="menu-button"
            aria-label="Toggle navigation"
            onClick={handleOpen}
          >
            <svg
              className="h-5 w-5 text-midBrown"
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

      <div
        className={`md:hidden absolute left-0 top-full w-full transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="mx-4 mb-4 surface-card flex flex-col overflow-hidden">
          <Link
            className="nav-link py-3 px-4"
            to="/about"
            onClick={() => setIsOpen(false)}
          >
            關於我們
          </Link>
          <Link
            className="nav-link py-3 px-4"
            to="/stores"
            onClick={() => setIsOpen(false)}
          >
            商店首頁
          </Link>
          <Link
            className="nav-link py-3 px-4"
            to="/personal"
            onClick={() => setIsOpen(false)}
          >
            個人頁面
          </Link>
          <Link
            className="nav-link py-3 px-4"
            to="/login"
            onClick={() => setIsOpen(false)}
          >
            登入
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
