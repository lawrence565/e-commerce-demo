import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gadgets from "../assets/products/gadgets.json";
import furnitures from "../assets/products/furnitures.json";
import decorations from "../assets/products/decorations.json";

function ProductRecomanned(props: {
  title: string;
  items: string;
  url: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(300);
  const productCarouselRef = useRef<HTMLDivElement>(null);
  const cardPerPage: number = 4;
  const totalPage: number = gadgets.length / cardPerPage;
  let products: Array<any> = [];

  useEffect(() => {
    const updateWidth = () => {
      if (productCarouselRef.current) {
        setWidth(productCarouselRef.current.getBoundingClientRect().width * 4);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const previous = () => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex - 1 + totalPage) % totalPage
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalPage);
  };

  if (props.items === "gadgets") {
    products = gadgets;
  } else if (props.items === "furnitures") {
    products = furnitures;
  } else if (props.items === "decorations") {
    products = decorations;
  }

  return (
    <div className="text-midBrown my-4">
      <h2 className="text-2xl my-4">{props.title}</h2>
      <hr className="text-midBrown" />
      <div className="product-carousel flex items-center m-8 mb-0">
        <button className="text-black arrow previous" onClick={previous}>
          &#10094;
        </button>
        <div className="overflow-hidden mx-8" style={{ width: `${width}px` }}>
          <div
            className="flex transition-all duration-800 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * width}px)`,
            }}
          >
            {products.map((product, index: number) => {
              return (
                <div
                  key={index}
                  className="product-card"
                  ref={productCarouselRef}
                >
                  <div className="product w-[200px] m-2 h-fit">
                    <div className="product-img-container">
                      <img className="rounded-lg" src={product.img} />
                    </div>
                    <h3 className="product-title text-xl">{product.title}</h3>
                    <p className="product-content text-sm">{product.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button className="text-black arrow next" onClick={next}>
          &#10095;
        </button>
      </div>
      <div className="mb-6 mx-16 flex flex-end w-full">
        <div className="w-fit">
          <Link to={`${props.url}`}>
            <p className="underline cursor-pointer">查看更多</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductRecomanned;
