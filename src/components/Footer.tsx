import white_logo from "../assets/main_logo_white.svg";
import facebook from "../assets/social_logo/facebook.svg";
import instagram from "../assets/social_logo/instagram.svg";
import twitter from "../assets/social_logo/twitter.svg";
import line from "../assets/social_logo/line.svg";
import { Link } from "react-router-dom";
import "../style/FooterStyle.scss";

function Footer() {
  return (
    <div className="flex justify-center items-center bg-midBrown min-h-[25dvh] h-fit w-full">
      <div className="max-w-[1200px] w-full">
        <div className="bg-midBrown w-100% mb-8 sm:my-4 flex flex-col-reverse md:flex-row items-center justify-center">
          <div
            id="store-info"
            className="flex-1 flex flex-col justify-center items-center p-4 max-w-[450px]"
          >
            <div className="logo-container w-full flex justify-center items-center">
              <img
                src={white_logo}
                className="w-[60dvw] sm:w-[22dvw] sm:min-w-[250px] max-w-[300px]"
              />
            </div>
            <div
              id="social-logo"
              className="flex w-[60dvw] md:w-[25dvw] justify-between max-w-[300px]"
            >
              <div
                className="w-[18dvw] m-2 mb-4 md:m-4 max-w-[35px] md:min-w-[40px] aspect-square"
                id="facebook"
              >
                <a href="https://www.facebook.com/facebook/?brand_redir=103274306376166">
                  <img src={facebook} />
                </a>
              </div>
              <div
                className="w-[18dvw] m-2 mb-4 md:m-4 max-w-[35px] md:min-w-[40px] aspect-square"
                id="instagram"
              >
                <a href="https://www.instagram.com/instagram/">
                  <img src={instagram} />
                </a>
              </div>
              <div
                className="w-[18dvw] m-2 mb-4 md:m-4 max-w-[35px] md:min-w-[40px] aspect-square"
                id="twitter"
              >
                <a href="https://x.com/X">
                  <img src={twitter} />
                </a>
              </div>
              <div
                className="w-[18dvw] m-2 mb-4 md:m-4 max-w-[35px] md:min-w-[40px] aspect-square"
                id="line"
              >
                <a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=line">
                  <img src={line} />
                </a>
              </div>
            </div>
            <div id="store-contact" className="mx-4">
              <p id="address" className="text-sm text-white">
                地址：台北市中正區重慶南路一段122號
              </p>
              <p id="tel" className="text-sm text-white">
                電話：02-1234-5678
              </p>
            </div>
          </div>
          <div
            id="usual-links"
            className="flex-1 text-white flex md:flex-row justify-end m-2 sm:mx-4 p-4 max-w-[450px]"
          >
            <div className="flex-1 text-white flex flex-col items-center sm:items-start mx-4">
              <h1 className="text-xl font-semibold mb-2">常用連結</h1>
              <Link to="/stores" className="text-base">
                商店首頁
              </Link>
              <Link to="/stores/gadgets" className="text-base">
                隨身用品
              </Link>
              <Link to="/stores/furnitures" className="text-base">
                手工家具
              </Link>
              <Link to="/stores/decorations" className="text-base">
                裝飾擺設
              </Link>
            </div>
            <div
              id="business-cooperation"
              className="flex-1 text-white flex flex-col mx-4 items-center sm:items-start "
            >
              <h1 className="text-xl font-semibold mb-2">招商專區</h1>
              <Link to="/business/apply" className="text-base">
                申請加入
              </Link>
              <Link to="/business/owner" className="text-base">
                商家專區
              </Link>
              <Link to="/business/how-to-apply" className="text-base">
                如何加入
              </Link>
            </div>
            <div
              id="about-us"
              className="flex-1 text-white flex flex-col mx-4 items-center sm:items-start "
            >
              <h1 className="text-xl font-semibold mb-2">關於我們</h1>
              <Link to="/help/faqs" className="text-base">
                常見問題
              </Link>
              <Link to="/help/returns-and-exchange" className="text-base">
                退換貨問題
              </Link>
              <Link to="/help/contact-us" className="text-base">
                聯絡我們
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
