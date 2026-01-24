import { NavLink, Link, useLocation } from "react-router-dom";
import mainLogo from "../assets/main-logo.svg";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";
import personalIcon from "../assets/personal-icon.svg";
import { useState, useEffect } from "react";
import { useCartCookie } from "../utils/useCartCookie";

function NavBar() {
  const { cart } = useCartCookie();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-clay-deep ${
      isActive ? "text-clay-deep font-bold" : "text-ink/80"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 text-base font-medium border-b border-sand/30 transition-colors hover:bg-sand/20 ${
      isActive ? "text-clay-deep bg-sand/10" : "text-ink/80"
    }`;

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 w-full h-20 bg-paper/85 backdrop-blur-md border-b border-sand/50 shadow-sm transition-all duration-300">
      <div className="section h-full flex items-center justify-between py-0">
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex-shrink-0 group">
            <img
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              src={mainLogo}
              alt="Cultural Market Logo"
            />
          </Link>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-clay/10 text-clay-deep text-xs font-bold tracking-wide uppercase">
            文創選物
          </span>
        </div>

        {/* Right Side Actions (Nav + Icons) */}
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink className={navLinkClass} to="/about">
              關於我們
            </NavLink>
            <NavLink className={navLinkClass} to="/stores">
              商店首頁
            </NavLink>
            <NavLink className={navLinkClass} to="/login">
              登入
            </NavLink>
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/shoppingcart"
              className={({ isActive }) =>
                `relative group p-2 rounded-full transition-colors hover:bg-clay/10 ${
                  isActive ? "bg-clay/10" : ""
                }`
              }
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <img
                  className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
                  src={shoppingCartIcon}
                  alt="Shopping Cart"
                />
                {cart && cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-sm ring-2 ring-paper">
                    {cart.length}
                  </span>
                )}
              </div>
            </NavLink>

            <Link
              to="/personal"
              className="p-2 rounded-full hover:bg-clay/10 transition-colors group"
              aria-label="Personal Page"
            >
              <img 
                className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" 
                src={personalIcon} 
                alt="User" 
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-clay/10 transition-colors focus:outline-none focus:ring-2 focus:ring-clay/50"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-6 relative flex flex-col justify-center gap-1.5 overflow-hidden">
                <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isOpen ? "translate-x-full opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden absolute left-0 top-20 w-full bg-paper/95 backdrop-blur-xl border-b border-sand/50 shadow-lg overflow-hidden transition-all duration-300 origin-top ${
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-2">
          <NavLink className={mobileNavLinkClass} to="/about">
            關於我們
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/stores">
            商店首頁
          </NavLink>
           <NavLink className={mobileNavLinkClass} to="/personal">
            個人頁面
          </NavLink>
          <NavLink className={mobileNavLinkClass} to="/login">
            登入
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
