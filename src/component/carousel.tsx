import phone_stand from "../assets/phone-stand.png";
import ornament from "../assets/ornament.png";
import ratten_bag from "../assets/ratten-bag.png";
import cork_art from "../assets/cork-art.png";
import "../style/homepage.scss";
import { useState, useRef, useEffect } from "react";
import Card from "./Card";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);
  const cards = [
    {
      title: "木製手機架",
      content: "使用台東漂流木結合原住民雕刻文化打造的特色手機架",
      img: phone_stand,
    },
    {
      title: "裝飾品",
      content: "精美的裝飾品，適合擺放在任何地方。",
      img: ornament,
    },
    {
      title: "籐包",
      content: "手工製作的籐包，既時尚又實用。",
      img: ratten_bag,
    },
    {
      title: "軟木藝術品",
      content: "獨特的軟木藝術品，增添藝術氣息。",
      img: cork_art,
    },
  ];

  useEffect(() => {
    // 獲取元素的寬度
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.getBoundingClientRect().width);
      }
    };
    console.log(width);

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
      <div className="carousel flex items-center justify-center w-full my-16">
        <button
          className="arrow left"
          onClick={() => updateCarousel(currentIndex - 1)}
        >
          &#10094;
        </button>

        <div className="carousel-slide mx-8">
          {cards.map((product, index) => {
            return (
              <div
                key={index}
                className={`card ${
                  index === currentIndex ? "active" : ""
                } transition-all duration-800 ease-in-out`}
                style={{ transform: `translateX(-${currentIndex * width}px)` }}
                ref={carouselRef}
              >
                <Card
                  title={product.title}
                  content={product.content}
                  img={product.img}
                />
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
        <div className="page-indicater flex items-center">
          <div className="page1 dot"></div>
          <div className="page2 dot"></div>
          <div className="page3 dot"></div>
          <div className="page4 dot"></div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
