import white_logo from "../assets/main_logo_white.svg";
import facebook from "../assets/social_logo/facebook.svg";
import instagram from "../assets/social_logo/instagram.svg";
import twitter from "../assets/social_logo/twitter.svg";
import line from "../assets/social_logo/line.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#2c2722] text-paper mt-8">
      <div className="section w-full max-w-[1200px] mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src={white_logo}
              className="w-[220px]"
              alt="Cultural Market"
            />
            <p className="text-sm text-paper/70 leading-relaxed">
              集結文創品牌與職人工藝，提供獨特生活選物與在地故事。
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img src={instagram} alt="Instagram" />
              </a>
              <a
                href="https://twitter.com/"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img src={twitter} alt="Twitter" />
              </a>
              <a
                href="https://line.me/"
                aria-label="Line"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img src={line} alt="Line" />
              </a>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-base font-semibold font-serif">常用連結</h2>
            <div className="flex flex-col gap-2 text-paper/70">
              <Link to="/stores" className="hover:text-paper transition-colors">商店首頁</Link>
              <Link to="/stores/gadgets" className="hover:text-paper transition-colors">隨身用品</Link>
              <Link to="/stores/furnitures" className="hover:text-paper transition-colors">手工家具</Link>
              <Link to="/stores/decorations" className="hover:text-paper transition-colors">裝飾擺設</Link>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-base font-semibold font-serif">招商專區</h2>
            <div className="flex flex-col gap-2 text-paper/70">
              <Link to="/business/apply" className="hover:text-paper transition-colors">申請加入</Link>
              <Link to="/business/owner" className="hover:text-paper transition-colors">商家專區</Link>
              <Link to="/business/how-to-apply" className="hover:text-paper transition-colors">如何加入</Link>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h2 className="text-base font-semibold font-serif">聯絡我們</h2>
            <p className="text-paper/70">
              地址：台北市中正區重慶南路一段122號
            </p>
            <p className="text-paper/70">電話：02-1234-5678</p>
            <div className="pt-2">
              <Link
                to="/help/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-4 py-2 text-sm text-paper hover:bg-paper/10 transition-colors"
              >
                線上客服
              </Link>
            </div>
          </div>
        </div>
        <div className="text-xs text-paper/50 pt-8 border-t border-paper/10 text-center">
          © 2026 Cultural Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
