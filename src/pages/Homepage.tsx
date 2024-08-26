import { Link } from "react-router-dom";
import Carousel from "../components/Carousel.tsx";
import ProductRecomanned from "../components/ProductRecommand.tsx";
import ReviewCarousel from "../components/ReviewCarousel.tsx";
import down_arrow from "../assets/down_arrow.svg";
import Stores from "../assets/stores.json";
import "../style/HomepageStyle.scss";

function Homepage(): JSX.Element {
  return (
    <>
      <div className="homepage-contanier">
        <div className="lg:h-2/5 lg:min-h-[350px] mt-8">
          <Carousel />
        </div>

        <div className="product-recommand flex flex-col justify-center items-center">
          <div className="md:max-w-[1200px] lg:max-w-[1400px] m-4">
            <h1 className="text-3xl my-4 text-midBrown font-semibold">
              產品推薦
            </h1>
            <ProductRecomanned
              key="0"
              title="隨身用品"
              items="gadgets"
              url="/stores/gadgets"
            />
            <ProductRecomanned
              key="1"
              title="手工家具"
              items="furnitures"
              url="/stores/furnitures"
            />
            <ProductRecomanned
              key="2"
              title="裝飾擺設"
              items="decorations"
              url="/stores/decorations"
            />
          </div>

          <div>
            <Link
              to="/stores"
              className="flex flex-col justify-center items-center"
            >
              <h1 className="text-midBrown font-semibold text-lg">查看更多</h1>
              <img src={down_arrow} className="text-midBrown w-8" />
            </Link>
          </div>
        </div>

        <div className="customer-review bg-midBrown w-full my-8">
          <div className="flex items-center justify-center max-w-[1200px]:">
            <ReviewCarousel key="0" />
          </div>
        </div>

        <div className="flex justify-center ">
          <div className="store-introduce m-8 max-w-[1200px]">
            <h1 className="text-midBrown text-3xl font-bold">商家介紹</h1>
            <div className="store-card-container flex flex-col lg:flex-row justify-center items-start">
              {Stores.map((store, index: number) => {
                return (
                  <div
                    className="bg-midbrown max-w-[300px] w-[20dvw] m-4"
                    key={index}
                  >
                    <h1 className="text-[1.3rem]">{store.name}</h1>
                    <div className="store-img-container aspect-[4/3] overflow-hidden rounded-md my-2">
                      <img src={store.img} />
                    </div>
                    <p className="text-base">{store.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
