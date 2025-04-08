import phone_stand from "../assets/phone-stand.png";
import ornament from "../assets/ornament.png";
import ratten_bag from "../assets/ratten-bag.png";
import cork_art from "../assets/cork-art.png";
import "../style/HomepageStyle.scss";
import { useState, useRef, useEffect } from "react";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [lastX, setLastX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardCarouselRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const originalCards = [
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

  const cards = [
    originalCards[originalCards.length - 1],
    ...originalCards,
    originalCards[0],
  ];

  // 自動播放
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      autoPlayTimerRef.current = setInterval(() => {
        if (!isDragging && !isTransitioning) {
          next();
        }
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isDragging, isTransitioning]);

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
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const translateX =
        -currentIndex * 100 + (isDragging ? (dragX / width) * 100 : 0);

      // 在切換到克隆卡片時不使用過渡效果
      const shouldTransition = !(
        isTransitioning &&
        (currentIndex === 0 || currentIndex === cards.length - 1)
      );

      carouselRef.current.style.transition = shouldTransition
        ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        : "none";
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex, isDragging, dragX, width, isTransitioning]);

  useEffect(() => {
    if (isTransitioning) {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);

        // 等待前一個動畫完成後（500ms）再進行克隆卡片的切換
        if (currentIndex === cards.length - 1) {
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition = "none";
              setCurrentIndex(1);
            }
          }, 500);
        } else if (currentIndex === 0) {
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition = "none";
              setCurrentIndex(cards.length - 2);
            }
          }, 500);
        }
      }, 500);

      return () => {
        if (transitionTimerRef.current) {
          clearTimeout(transitionTimerRef.current);
        }
      };
    }
  }, [currentIndex, isTransitioning, cards.length]);

  const previous = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setLastX(e.touches[0].clientX);
    setIsDragging(true);
    setDragX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - lastX;
    setDragX(dragX + diff);
    setLastX(currentX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const totalDrag = endX - startX;

    if (Math.abs(totalDrag) > width * 0.2) {
      if (totalDrag > 0) {
        previous();
      } else {
        next();
      }
    }
    setIsDragging(false);
    setDragX(0);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  return (
    <>
      <div
        className="promotion-img-container w-full flex flex-col items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
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
              {cards.map((product, index) => (
                <div
                  key={index}
                  className={`card ${
                    index === currentIndex ? "active" : ""
                  } bg-white`}
                  ref={cardCarouselRef}
                >
                  <div className="img-container rounded-lg overflow-hidden relative">
                    <img
                      className="promote-img"
                      src={product.img}
                      alt={product.content}
                    />
                    <div className="goods-tag">
                      <h3 className="goods-name">{product.title}</h3>
                      <p className="goods-disc">{product.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="arrow right" onClick={next}>
            &#10095;
          </button>
        </div>
        <div className="page-indicater flex items-center">
          {originalCards.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index + 1 ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Carousel;
