import reviews from "../assets/customer-review.json";
import { useState, useEffect, useRef } from "react";
import thumbnail from "../assets/testing_thumbnail.webp";

function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(300);
  const reviewCarouselRef = useRef<HTMLDivElement>(null);
  const totalPage: number = 10;

  useEffect(() => {
    const updateWidth = () => {
      if (reviewCarouselRef.current) {
        setWidth(reviewCarouselRef.current.getBoundingClientRect().width);
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

  return (
    <div className="Review-Carousel flex items-center">
      <button className="text-black arrow previous" onClick={previous}>
        &#10094;
      </button>
      <div
        id="carousel-slide"
        className="overflow-hidden flex"
        style={{
          width: `${width}px`,
        }}
      >
        <div
          id="review-carousel"
          className="flex justify-start transition-all duration-600 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * width}px)` }}
        >
          {reviews.map((review, index: number) => {
            return (
              <div
                key={index}
                className="customer-review my-8 flex items-center justify-center text-white"
                style={{ width: "50vw", height: "20dvh" }}
                ref={reviewCarouselRef}
              >
                <div className="customer-img-container w-[100px] h-[100px] rounded-[50%] border-midBrown overflow-hidden object-cover mx-8 flex-2">
                  <img src={thumbnail} />
                </div>
                <div className="customer-review w-3/5 flex-3">
                  <div className="customer-title h-2/5">
                    <h1 className="customer-title text-3xl pb-4">
                      {review.name}
                    </h1>
                  </div>
                  <div className="customer-content h-3/5 w-full align-middle">
                    <p className="text-xl">{review.comment}</p>
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
