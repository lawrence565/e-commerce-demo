import reviews from "../assets/customer-review.json";
import thumbnail from "../assets/testing_thumbnail.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface Review {
  id: number;
  name: string;
  age: number;
  comment: string;
}

function ReviewCarousel() {
  const typedReviews = reviews as Review[];
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative"
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {typedReviews.map((review, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 p-4 text-white hover:scale-[1.02] transition-transform duration-300">
              <div className="shrink-0 relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/30 p-1">
                  <img
                    src={thumbnail}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-sm text-black/70">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00012 13.1706 11.6668 10.3708 17.017 10.3708V7.8708C11.1378 7.8708 6.54109 11.2307 6.50049 15.937C6.49528 16.5408 6.50049 21 6.50049 21H14.017ZM24.017 21L24.017 18C24.017 16.8954 23.1216 16 22.017 16H19C19.0001 13.1706 21.6668 10.3708 27.017 10.3708V7.8708C21.1378 7.8708 16.5411 11.2307 16.5005 15.937C16.4953 16.5408 16.5005 21 16.5005 21H24.017Z"
                      transform="translate(-5)"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl headline-serif font-bold mb-3">
                  {review.name}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-white/80 italic">
                  "{review.comment}"
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-4 mt-8 md:hidden">
        <CarouselPrevious className="static transform-none flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </CarouselPrevious>
        <CarouselNext className="static transform-none flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </CarouselNext>
      </div>
      <div className="hidden md:block">
        <CarouselPrevious className="-left-4 bg-white/10 hover:bg-white/20 text-white border-transparent flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </CarouselPrevious>
        <CarouselNext className="-right-4 bg-white/10 hover:bg-white/20 text-white border-transparent flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </CarouselNext>
      </div>
    </Carousel>
  );
}

export default ReviewCarousel;
