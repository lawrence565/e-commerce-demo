import { Link } from "react-router-dom";
import Carousel from "./Components/Carousel.tsx";
import ProductRecomanned from "./Components/ProductRecommand.tsx";
import ReviewCarousel from "./Components/ReviewCarousel.tsx";
import StoreCard from "./Components/StoreCard.tsx";
import down_arrow from "./assets/down_arrow.svg";
import Stores from "./assets/stores.json";
import "./style/homepage.scss";

function Homepage(): JSX.Element {
  return (
    <>
      <div className="homepage-contanier">
        <div className="h-2/5 min-h-[350px]">
          <Carousel />
        </div>

        <div className="product-recommand  flex flex-col justify-center items-center">
          <div className="max-w-[1200px]">
            <h1 className="text-3xl my-4 text-midBrown font-semibold">
              產品推薦
            </h1>
            <ProductRecomanned
              key="0"
              title="隨身用品"
              items="gadgets"
              url="/products/gadgets"
            />
            <ProductRecomanned
              key="1"
              title="手工家具"
              items="furnitures"
              url="/products/furnitures"
            />
            <ProductRecomanned
              key="2"
              title="裝飾擺設"
              items="decorations"
              url="/products/decorations"
            />
          </div>

          <div>
            <Link
              to="/Store"
              className="flex flex-col justify-center items-center"
            >
              <h1 className="text-midBrown font-semibold text-lg">查看更多</h1>
              <img src={down_arrow} className="text-midBrown w-8" />
            </Link>
          </div>
        </div>

        <div className="customer-review bg-midBrown w-full my-8">
          <div className="flex items-center justify-center">
            <ReviewCarousel />
          </div>
        </div>

        <div className="store-introduce m-8">
          <h1 className="text-midBrown text-2xl mx-8">商家介紹</h1>
          <div className="store-card-container flex justify-center items-start">
            {Stores.map((store, index) => {
              return (
                <StoreCard
                  key={index}
                  name={store.name}
                  description={store.description}
                  img={store.img}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
