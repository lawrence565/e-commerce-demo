import reviews from "../assets/customer-review.json";
import { useState, useEffect, useRef } from "react";
import thumbnail from "../assets/testing_thumbnail.webp";

interface Review {
  id: number;
  name: string;
  age: number;
  comment: string;
}

function ReviewCarousel() {
  const TRANSITION_MS = 320;
  const MIN_WIDTH = 280;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [width, setWidth] = useState(300);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [extendedReviews, setExtendedReviews] = useState<Review[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reviewCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (reviewCarouselRef.current) {
        const measuredWidth =
          reviewCarouselRef.current.getBoundingClientRect().width;
        setWidth(Math.max(measuredWidth, MIN_WIDTH));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [extendedReviews]);

  useEffect(() => {
    if (reviews.length > 0) {
      setExtendedReviews([reviews[reviews.length - 1], ...reviews, reviews[0]]);
    }
  }, [reviews]);

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
      if (currentIndex === extendedReviews.length - 1) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(1);
        }, TRANSITION_MS);
      } else if (currentIndex === 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(extendedReviews.length - 2);
        }, TRANSITION_MS);
      } else {
        setIsTransitioning(false);
      }
    }
  }, [currentIndex, isTransitioning, extendedReviews.length]);

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
    <div
      className="Review-Carousel flex items-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="text-black arrow previous" onClick={previous}>
        &#10094;
      </button>
      <div
        className="overflow-hidden"
        style={{
          width: `${width}px`,
        }}
      >
        <div
          id="review-carousel"
          className="flex justify-start"
          ref={carouselRef}
        >
          {extendedReviews.map((review, index: number) => {
            return (
              <div
                key={index}
                className="flex-shrink-0 customer-review md:my-8 flex items-center justify-center text-white w-[80vw] md:w-[50vw] h-[20dvh]"
                ref={reviewCarouselRef}
              >
                <div className="customer-img-container w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-[50%] border-midBrown overflow-hidden object-cover mx-2 md:mx-8 flex-2">
                  <img src={thumbnail} />
                </div>
                <div className="customer-review w-3/5 flex-3">
                  <div className="customer-title h-2/5">
                    <h1 className="customer-title text-xl md:text-3xl pb-2 md:pb-4">
                      {review.name}
                    </h1>
                  </div>
                  <div className="customer-content h-3/5 w-full align-middle">
                    <p className="text-base md:text-xl">{review.comment}</p>
                  </div>
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
  );
}

export default ReviewCarousel;
