import Carousel from "./Components/Carousel.tsx";
import ProductRecomanned from "./Components/ProductRecommand.tsx";
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
            <ProductRecomanned key="0" title="隨身用品" items="gadgets" />
            <ProductRecomanned key="1" title="手工家具" items="furnitures" />
            <ProductRecomanned key="2" title="手作飾品" items="gadgets" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
