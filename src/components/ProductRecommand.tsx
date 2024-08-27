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
  const [currentIndex, setCurrentIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [products, setProducts] = useState<Product[]>([]);
  const [extendedProducts, setExtendedProducts] = useState<Array<Product[]>>(
    []
  );
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardPerPage: number = 4;
  const groupedProducts: Array<Product[]> = [];
  for (let i = 0; i < products.length; i += cardPerPage) {
    groupedProducts.push(products.slice(i, i + cardPerPage));
  }
  const cardCarouselRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
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

  // 渲染 Carousel 頁面
  useEffect(() => {
    if (groupedProducts.length > 0) {
      setExtendedProducts([
        groupedProducts[groupedProducts.length - 1],
        ...groupedProducts,
        groupedProducts[0],
      ]);
    }
  }, [products]);

  // 透過 isTransitioning 控制動畫
  useEffect(() => {
    if (carouselRef.current) {
      if (isTransitioning) {
        // 若是在變換頁面時，啟用動畫
        carouselRef.current.style.transition = "transform 0.3s ease-in-out";
      } else {
        // 否則禁用動畫
        carouselRef.current.style.transition = "none";
      }
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
    }
    setIsTransitioning(false);
  }, [currentIndex]);

  useEffect(() => {
    if (isTransitioning) {
      if (currentIndex === extendedProducts.length - 1) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(1);
        }, 300);
      } else if (currentIndex === 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(extendedProducts.length - 2);
        }, 300);
      } else {
        setIsTransitioning(false);
      }
    }
  }, [currentIndex, isTransitioning, extendedProducts.length]);

  const previous = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      next();
    } else if (endX - startX > 50) {
      previous();
    }
    setIsDragging(false);
  };

  const scrollToTop = () => {};

  useEffect(() => {
    const updateWidth = () => {
      if (cardCarouselRef.current) {
        setWidth(cardCarouselRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [products, extendedProducts]);

  return (
    <div className="text-midBrown my-4">
      <h2 className="text-2xl font-semibold">{props.title}</h2>
      <hr className="text-midBrown" />
      <div
        className="product-carousel flex items-center my-4 md:my-8 mb-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="text-black arrow previous" onClick={previous}>
          &#10094;
        </button>
        <div
          className="overflow-hidden sm:mx-8"
          style={{ width: `${width}px` }}
        >
          <div ref={carouselRef} className="rounded-lg md:rounded-xl flex">
            {extendedProducts.map((products, index) => {
              // 渲染分組
              return (
                <div
                  key={index}
                  ref={cardCarouselRef}
                  className="grid grid-cols-2 flex-shrink-0 md:flex"
                >
                  {products.map((product, index: number) => {
                    // 渲染卡片
                    return (
                      <Link
                        to={`stores/${product.category}/${product.id}`}
                        key={index}
                      >
                        <div className="product-card">
                          <div className="product w-[35dvw] md:w-[20dvw] md:max-w-[180px] lg:max-w-[250px] m-2 h-fit">
                            <div className="product-img-container">
                              <img
                                className="rounded-lg"
                                src={`./${product.category}s/${product.name}.webp`}
                              />
                            </div>
                            <h3 className="product-title text-xl">
                              {product.title}
                            </h3>
                            <p className="product-content text-sm">
                              {product.discription}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <button className="text-black arrow next" onClick={next}>
          &#10095;
        </button>
      </div>
      <div className="mb-6 mx-4 lg:mx-16 flex justify-end">
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
