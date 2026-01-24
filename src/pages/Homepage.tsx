import Carousel from "../components/Carousel.tsx";
import ProductRecomanned from "../components/ProductRecommand.tsx";
import ReviewCarousel from "../components/ReviewCarousel.tsx";
import down_arrow from "../assets/down_arrow.svg";
import Stores from "../assets/stores.json";
import { LazyImage } from "../components/LazyImage";
import Modal from "../components/Modal.tsx";
import { useState, type ReactElement } from "react";
import { motion, cubicBezier } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

function Homepage(): ReactElement {
  const [storeClicked, setStoreClicked] = useState(false);

  const showStoredModal = () => {
    setStoreClicked(true);
  };

  const handleStoreClicked = () => {
    setStoreClicked(false);
  };

  const easeCustom = cubicBezier(0.16, 1, 0.3, 1);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCustom } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
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

      <div className="min-h-screen pb-20">
        {/* Hero Section */}
        <section className="section pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-clay/10 text-clay-deep text-sm font-semibold tracking-wide border border-clay/20">
                  <span className="w-2 h-2 rounded-full bg-clay-deep animate-pulse" />
                  Cultural Market 2026
                </span>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-ink leading-[1.1] tracking-tight">
                  用設計與工藝 <br />
                  <span className="text-clay">打造日常的溫度</span>
                </h1>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-lg md:text-xl text-ink/70 max-w-lg leading-relaxed">
                  探索在地創作者的作品與故事。從生活小物到手工家具，讓每個角落都更有品味。
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <Button as="link" to="/stores" size="lg" variant="primary">
                  立即選購
                </Button>
                <Button as="link" to="/about" size="lg" variant="secondary">
                  了解品牌
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <Card variant="glass" className="p-4 md:p-6 rotate-2 hover:rotate-0 transition-transform duration-500">
                <Carousel />
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="section py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">精選推薦</h2>
              <p className="text-ink/60 text-lg">編輯嚴選，快速找到本月熱門。</p>
            </motion.div>
            
            <Button as="link" to="/stores" variant="ghost" className="group">
              查看全部
              <img 
                src={down_arrow} 
                className="w-5 ml-2 -rotate-90 opacity-60 group-hover:opacity-100 transition-opacity" 
                alt="arrow"
              />
            </Button>
          </div>

          <div className="space-y-16">
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

        {/* Reviews Section */}
        <section className="section py-16">
          <Card variant="solid" className="bg-[#2c2722] border-none text-paper p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sun/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-clay/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-8 mb-12">
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-paper mb-4">
                    顧客心聲
                  </h2>
                  <p className="text-paper/70 text-lg">
                    真實好評，讓你安心選購。
                  </p>
                </div>
              </div>
              <ReviewCarousel key="0" />
            </div>
          </Card>
        </section>

        {/* Merchants Section */}
        <section className="section py-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">職人商家</h2>
            <p className="text-ink/60 text-lg">
              每一家都有自己的風格與故事。
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Stores.map((store, index: number) => {
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card
                    as={motion.button}
                    variant="glass"
                    className="p-5 h-full text-left hover:border-clay/60 transition-colors group w-full"
                    onClick={showStoredModal}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold font-serif group-hover:text-clay-deep transition-colors">
                        {store.name}
                      </h3>
                      <span className="text-xs font-medium px-2 py-1 bg-sand/50 rounded-md text-ink/60">
                        Top Rated
                      </span>
                    </div>
                    
                    <div className="rounded-xl overflow-hidden aspect-[4/3] mb-4 bg-sand/20">
                      <LazyImage
                        src={store.img}
                        alt={store.name}
                        width={400}
                        height={300}
                        skeletonAnimation="wave"
                      />
                    </div>
                    
                    <p className="text-ink/70 leading-relaxed line-clamp-3">
                      {store.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default Homepage;
