import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productApi";

interface Product {
  id: number;
  title: string;
  name: string;
  category: string;
  price: number;
  discription: string;
}

function ProductRecomanned(props: {
  title: string;
  items: string;
  url: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(300);
  const [products, setProducts] = useState<Product[]>([]);
  const productCarouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      let items;
      if (props.items === "gadgets") {
        items = await getProducts("gadget");
      } else if (props.items === "furnitures") {
        items = await getProducts("furniture");
      } else if (props.items === "decorations") {
        items = await getProducts("decoration");
      }
      setProducts(items ?? []);
    })();
  }, [props.items]);

  const cardPerPage: number = 4;
  const totalPage: number = Math.ceil(products.length / cardPerPage);

  const previous = () => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex - 1 + totalPage) % totalPage
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalPage);
  };

  const scrollToTop = () => {};

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
  }, [products]);

  return (
    <div className="text-midBrown my-4">
      <h2 className="text-2xl -4 font-semibold">{props.title}</h2>
      <hr className="text-midBrown" />
      <div className="product-carousel flex items-center my-8 mb-0">
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
                <Link
                  to={`stores/${product.category}/${product.id}`}
                  key={index}
                >
                  <div className="product-card" ref={productCarouselRef}>
                    <div className="product lg:w-[250px] m-2 h-fit">
                      <div className="product-img-container">
                        <img
                          className="rounded-lg"
                          src={`./${product.category}s/${product.name}.webp`}
                        />
                      </div>
                      <h3 className="product-title text-xl">{product.title}</h3>
                      <p className="product-content text-sm">
                        {product.discription}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <button className="text-black arrow next" onClick={next}>
          &#10095;
        </button>
      </div>
      <div className="mb-6 mx-16 flex justify-end">
        <div className="w-fit">
          <Link to={`${props.url}`} onClick={scrollToTop}>
            <p className="underline cursor-pointer">查看更多</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductRecomanned;
