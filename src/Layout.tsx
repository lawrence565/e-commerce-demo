import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <div>
          <div className="logo">
            <img />
          </div>
          <div className="navbar">
            <Link to="/store">商店首頁</Link>
            <Link to="/about">關於我們</Link>
            <Link to="/personal">個人頁面</Link>
          </div>
        </div>
      </nav>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default Layout;
