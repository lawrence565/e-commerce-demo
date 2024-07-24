import Carousel from "./Components/Carousel.tsx";
import ProductCard from "./Components/Product-card.tsx";
import "./style/homepage.scss";
import gadgets from "./assets/gadgets.json";

function Homepage(): JSX.Element {
  return (
    <>
      <div className="homepage-contanier">
        <div className="h-2/5 min-h-[350px]">
          <Carousel />
        </div>

        <div className="product-recommand max-w-[1200px]">
          <h1 className="text-2xl">產品推薦</h1>
          <div className="gadgets">
            <h2>隨身用品</h2>
            <div>
              {gadgets.map((gadget, index: number) => {
                return (
                  <ProductCard
                    key={index}
                    imgURL={gadget.img}
                    productTitle={gadget.title}
                    productContent={gadget.content}
                  />
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
