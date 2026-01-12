import phone_stand from "../assets/phone-stand.png";
import ornament from "../assets/ornament.png";
import ratten_bag from "../assets/ratten-bag.png";
import cork_art from "../assets/cork-art.png";
import "../style/HomepageStyle.scss";
import { useState, useRef, useEffect } from "react";

function Carousel() {
  const TRANSITION_MS = 320;
  const MIN_WIDTH = 280;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardCarouselRef = useRef<HTMLDivElement>(null);
  const cards = [
    {
      id: 4,
      title: "軟木藝術品",
      content: "獨特的軟木藝術品，增添藝術氣息。",
      img: cork_art,
    },
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
    {
      id: 1,
      title: "木製手機架",
      content: "使用台東漂流木結合原住民雕刻文化打造的特色手機架",
      img: phone_stand,
    },
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (cardCarouselRef.current) {
        const measuredWidth = cardCarouselRef.current.getBoundingClientRect().width;
        setWidth(Math.max(measuredWidth, MIN_WIDTH));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      if (isTransitioning) {
        // 若是在變換頁面時，啟用動畫
        carouselRef.current.style.transition = `transform ${TRANSITION_MS}ms ease-in-out`;
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
      if (currentIndex === cards.length - 1) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(1);
        }, TRANSITION_MS);
      } else if (currentIndex === 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(cards.length - 2);
        }, TRANSITION_MS);
      } else {
        setIsTransitioning(false);
      }
    }
  }, [currentIndex, isTransitioning, cards.length]);

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

  return (
    <>
      <div
        className="promotion-img-container w-full flex flex-col items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel flex items-center justify-center w-full lg:mt-10 lg:mb-6">
          <button className="arrow left" onClick={previous}>
            &#10094;
          </button>

          <div className="carousel-slide md:mx-8">
            <div
              className="flex rounded-md"
              ref={carouselRef}
              style={{ width: `${width}px` }}
            >
              {cards.map((product, index) => {
                return (
                  <div
                    key={index}
                    className={`card ${
                      index === currentIndex ? "active" : ""
                    } bg-white`}
                    ref={cardCarouselRef}
                  >
                    <div className="img-container rounded-lg overflow-hidden relative">
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
          </div>

          <button className="arrow right" onClick={next}>
            &#10095;
          </button>
        </div>
        <div className="page-indicater flex items-center">
          <div
            className={`dot ${currentIndex === 1 ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(0);
            }}
          ></div>
          <div
            className={`dot ${currentIndex === 2 ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(1);
            }}
          ></div>
          <div
            className={`dot ${currentIndex === 3 ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(2);
            }}
          ></div>
          <div
            className={`dot ${currentIndex === 4 ? "active" : ""}`}
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
