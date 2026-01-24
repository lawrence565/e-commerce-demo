import white_logo from "../assets/main_logo_white.svg";
import facebook from "../assets/social_logo/facebook.svg";
import instagram from "../assets/social_logo/instagram.svg";
import twitter from "../assets/social_logo/twitter.svg";
import line from "../assets/social_logo/line.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        <div className="footer-grid items-start">
          <div className="space-y-4">
            <img
              src={white_logo}
              className="w-[220px]"
              alt="Cultural Market"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              集結文創品牌與職人工藝，提供獨特生活選物與在地故事。
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/facebook/?brand_redir=103274306376166"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <img src={facebook} />
              </a>
              <a
                href="https://www.instagram.com/instagram/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <img src={instagram} />
              </a>
              <a
                href="https://x.com/X"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <img src={twitter} />
              </a>
              <a
                href="https://liff.line.me/1645278921-kWRPP32q/?accountId=line"
                aria-label="Line"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <img src={line} />
              </a>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-base font-semibold">常用連結</h2>
            <div className="flex flex-col gap-2 text-white/70">
              <Link to="/stores">商店首頁</Link>
              <Link to="/stores/gadgets">隨身用品</Link>
              <Link to="/stores/furnitures">手工家具</Link>
              <Link to="/stores/decorations">裝飾擺設</Link>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-base font-semibold">招商專區</h2>
            <div className="flex flex-col gap-2 text-white/70">
              <Link to="/business/apply">申請加入</Link>
              <Link to="/business/owner">商家專區</Link>
              <Link to="/business/how-to-apply">如何加入</Link>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-base font-semibold">聯絡我們</h2>
            <p className="text-white/70">
              地址：台北市中正區重慶南路一段122號
            </p>
            <p className="text-white/70">電話：02-1234-5678</p>
            <div className="pt-2">
              <Link
                to="/help/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                線上客服
              </Link>
            </div>
          </div>
        </div>
        <div className="text-xs text-white/50">
          © 2026 Cultural Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
