import white_logo from "../assets/main_logo_white.svg";
import facebook from "../assets/social_logo/facebook.svg";
import instagram from "../assets/social_logo/instagram.svg";
import twitter from "../assets/social_logo/twitter.svg";
import line from "../assets/social_logo/line.svg";
import { Link } from "react-router-dom";
import "../style/footer.scss";

function Footer() {
  return (
    <div className="flex justify-center items-center bg-midBrown h-[25dvh]">
      <div className="bg-midBrown max-w-[1200px] flex ">
        <div id="store-info">
          <div className="logo-container w-fit">
            <img src={white_logo} className="max-w-[300px] w-[15dvw]" />
          </div>
          <div id="social-logo" className="flex">
            <div className="icon-container" id="facebook">
              <img src={facebook} />
            </div>
            <div className="icon-container" id="instagram">
              <img src={instagram} />
            </div>
            <div className="icon-container" id="twitter">
              <img src={twitter} />
            </div>
            <div className="icon-container" id="line">
              <img src={line} />
            </div>
          </div>
        </div>
        <div id="usual-links">
          <h1 className="text-xl font-bold">常用連結</h1>
          <Link to="/Store">商店首頁</Link>
          <Link to="/products/gadgets">隨身用品</Link>
          <Link to="/products/furnitures">手工家具</Link>
          <Link to="/products/decorations">裝飾擺設</Link>
        </div>
        <div id="business-cooperation">
          <h1 className="text-xl  font-bold">招商專區</h1>
          <Link to="/business/apply">申請加入</Link>
          <Link to="/business/owner">商家專區</Link>
          <Link to="/business/how-to-apply">如何加入</Link>
        </div>
        <div id="about-us">
          <h1 className="text-xl  font-bold">關於我們</h1>
          <Link to="/help/faqs">常見問題</Link>
          <Link to="/help/returns-and-exchange">退換貨問題</Link>
          <Link to="/help/contact-us">聯絡我們</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
