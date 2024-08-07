import phone_stand from "../assets/phone-stand.png";
import ornament from "../assets/ornament.png";
import ratten_bag from "../assets/ratten-bag.png";
import cork_art from "../assets/cork-art.png";
import "../style/HomepageStyle.scss";
import { useState, useRef, useEffect } from "react";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);
  const cards = [
    {
      id: 1,
      title: "木製手機架",
      content: "使用台東漂流木結合原住民雕刻文化打造的特色手機架",
      img: phone_stand,
    },
    {
      id: 2,
      title: "裝飾品",
      content: "精美的裝飾品，適合擺放在任何地方。",
      img: ornament,
    },
    {
      id: 3,
      title: "籐包",
      content: "手工製作的籐包，既時尚又實用。",
      img: ratten_bag,
    },
    {
      id: 4,
      title: "軟木藝術品",
      content: "獨特的軟木藝術品，增添藝術氣息。",
      img: cork_art,
    },
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const updateCarousel = (newIndex: number) => {
    setCurrentIndex((newIndex + cards.length) % cards.length);
  };

  return (
    <>
      <div className="promotion-img-container w-full h-2/5 min-h-[350px] flex flex-col items-center justify-center">
        <div className="carousel flex items-center justify-center w-full mt-16 mb-6">
          <button
            className="arrow left"
            onClick={() => updateCarousel(currentIndex - 1)}
          >
            &#10094;
          </button>

          <div className="carousel-slide mx-8" ref={carouselRef}>
            {cards.map((product, index) => {
              return (
                <div
                  key={index}
                  className={`card ${
                    index === currentIndex ? "active" : ""
                  } transition-all duration-800 ease-in-out bg-white`}
                  style={{
                    transform: `translateX(-${currentIndex * width}px)`,
                  }}
                  ref={carouselRef}
                >
                  <div className="img-container rounded-lg">
                    <img
                      className="promote-img "
                      src={product.img}
                      alt={product.content}
                    />
                    <div className="goods-tag">
                      <h3 className="goods-name">{product.title}</h3>
                      <p className="goods-disc">{product.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="arrow right"
            onClick={() => updateCarousel(currentIndex + 1)}
          >
            &#10095;
          </button>
        </div>
        <div className="page-indicater flex items-center">
          <div
            className={`page1 dot ${currentIndex === 0 ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(0);
            }}
          ></div>
          <div
            className={`page1 dot ${currentIndex === 1 ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(1);
            }}
          ></div>
          <div
            className={`page1 dot ${currentIndex === 2 ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(2);
            }}
          ></div>
          <div
            className={`page1 dot ${currentIndex === 3 ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(3);
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
