import reviews from "../assets/customer-review.json";
import { useState, useEffect, useRef } from "react";
import cork from "../assets/cork-art.png";

function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(300);
  const reviewCarouselRef = useRef<HTMLDivElement>(null);
  const totalPage: number = 5;

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
    <div className="flex">
      <button className="text-black arrow previous" onClick={previous}>
        &#10094;
      </button>
      {reviews.map((review, index: number) => {
        return (
          <div
            key={index}
            id="customer-review flex items-center bg-midBrown"
            ref={reviewCarouselRef}
          >
            <div className="customer-img-container w-[100px] h-[100px] rounded-[50%] border-midBrown overflow-hidden">
              <img src={cork} className="object-cover" />
            </div>
            <div className="customer-review">
              <h1 className="customer-title">{review.name}</h1>
              <p>{review.comment}</p>
            </div>
          </div>
        );
      })}
      <button className="text-black arrow next" onClick={next}>
        &#10095;
      </button>
    </div>
  );
}

export default ReviewCarousel;
