import banner from "../assets/banner.webp";
import { LazyImage } from "../components/LazyImage";

function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="banner-container h-[25dvh] overflow-hidden relative">
        <LazyImage
          className="relative top-[-70%]"
          src={banner}
          alt="Banner for the brand"
          width={1200}
          height={400}
        />
      </div>
      <div className="max-w-[800px] mb-8 mt-4">
        <h1 className="text-midBrown text-4xl text-center font-bold m-8">
          關於我們
        </h1>
        <h3 className="text-midBrown text-xl font-semibold mt-4">品牌介紹</h3>
        <article className="mb-8">
          文創商品電商平台是一個專注於推廣和銷售優質文創商品的線上電商平台。我們致力於連接消費者與全球各地的創意設計師和工匠，提供多樣化的藝術品、手工製作的家居裝飾、獨特的飾品及其他創意商品。我們的平台是一個充滿創意和靈感的天地，每一件商品都承載著設計師的心血和文化故事。
        </article>
        <h3 className="text-midBrown text-xl font-semibold mt-4">品牌歷史</h3>
        <article className="mb-8">
          文創商品電商平台創立於2015年，由一群熱愛藝術與設計的年輕人共同創辦。我們發現市場上缺乏一個專業的平台來展示和銷售文創商品，同時讓藝術家與消費者有溝通的機會，於是決定創立一個專門的電商平台，讓更多人能夠欣賞到這些精美的創意作品。自成立以來，我們不斷成長，吸引了來自世界各地的設計師和顧客，並成為文創商品領域的重要品牌。
        </article>
        <h3 className="text-midBrown text-xl font-semibold mt-4">品牌理念</h3>
        <article className="mb-8">
          我們相信，每一件文創商品都是一段故事的延續，都是設計師和工匠們心血的結晶。文創商品電商平台致力於推動文化創意產業的發展，為設計師提供展示創意和才華的舞台，同時也為消費者提供獨特、有價值的購物體驗。我們堅持「品質第一，創意無限」的理念，嚴格篩選每一件商品，確保其品質和獨特性，讓每一位顧客都能找到心儀的創意作品。
        </article>
        <h3 className="text-midBrown text-xl font-semibold mt-4">品牌目標</h3>
        <article className="mb-8">
          我們的目標是成為全球最大的文創商品電商平台，除了讓更多人能夠輕鬆地找到並購買到他們喜愛的文創作品，也讓藝術家與消費者能夠真正的互相溝通、傳達理念，而不是普通的買賣雙方而已。我們希望通過我們的努力，讓世界各地的文化創意產業蓬勃發展，讓更多設計師和工匠的作品能夠被欣賞和珍藏。我們致力於打造一個充滿創意和靈感的購物平台，讓每一次購物都成為一場文化和藝術的盛宴。
        </article>
      </div>
    </div>
  );
}

export default About;
