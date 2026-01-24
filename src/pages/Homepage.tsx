import { Link } from "react-router-dom";
import Carousel from "../components/Carousel.tsx";
import ProductRecomanned from "../components/ProductRecommand.tsx";
import ReviewCarousel from "../components/ReviewCarousel.tsx";
import down_arrow from "../assets/down_arrow.svg";
import Stores from "../assets/stores.json";
import { LazyImage } from "../components/LazyImage";
import Modal from "../components/Modal.tsx";
import { useState, type ReactElement } from "react";

function Homepage(): ReactElement {
  const [storeClicked, setStoreClicked] = useState(false);

  const showStoredModal = () => {
    setStoreClicked(true);
  };

  const handleStoreClicked = () => {
    setStoreClicked(false);
  };

  return (
    <>
      <Modal
        isOpen={storeClicked}
        onClose={handleStoreClicked}
        type="info"
        title="功能開發中"
      >
        <p>功能製作中，敬請期待</p>
      </Modal>
      <div className="homepage-contanier">
        <section className="section">
          <div className="hero-grid">
            <div className="hero-card space-y-4">
              <span className="chip">Cultural Market 2026</span>
              <h1 className="section-title headline-serif">
                用設計與工藝，打造日常的溫度
              </h1>
              <p className="section-subtitle">
                探索在地創作者的作品與故事。從生活小物到手工家具，讓每個角落都更有品味。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/stores" className="cta-primary">
                  立即選購
                </Link>
                <Link to="/about" className="cta-secondary">
                  了解品牌
                </Link>
              </div>
            </div>
            <div className="surface-card p-4 md:p-6">
              <Carousel />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="section-title">精選推薦</h2>
              <p className="section-subtitle">編輯嚴選，快速找到本月熱門。</p>
            </div>
            <Link to="/stores" className="cta-secondary flex items-center gap-2">
              查看全部
              <img src={down_arrow} className="w-5" />
            </Link>
          </div>
          <div className="mt-6">
            <ProductRecomanned
              key="0"
              title="隨身用品"
              category="gadgets"
              url="/stores/gadgets"
            />
            <ProductRecomanned
              key="1"
              title="手工家具"
              category="furnitures"
              url="/stores/furnitures"
            />
            <ProductRecomanned
              key="2"
              title="裝飾擺設"
              category="decorations"
              url="/stores/decorations"
            />
          </div>
        </section>

        <section className="section">
          <div className="surface-card p-6 md:p-10 bg-[#2c2722] text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="section-title headline-serif text-white">
                  顧客心聲
                </h2>
                <p className="section-subtitle text-white/70">
                  真實好評，讓你安心選購。
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ReviewCarousel key="0" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="section-title">職人商家</h2>
              <p className="section-subtitle">
                每一家都有自己的風格與故事。
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Stores.map((store, index: number) => {
              return (
                <button
                  className="surface-card p-5 text-left transition-transform hover:-translate-y-1 focus-ring"
                  key={index}
                  onClick={showStoredModal}
                >
                  <h3 className="text-lg font-semibold">{store.name}</h3>
                  <div className="mt-3 rounded-xl overflow-hidden">
                    <LazyImage
                      src={store.img}
                      alt={store.name}
                      width={400}
                      height={300}
                      skeletonAnimation="wave"
                    />
                  </div>
                  <p className="text-sm mt-3 text-black/70">
                    {store.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default Homepage;
