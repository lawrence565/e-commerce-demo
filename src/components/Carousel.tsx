import { useRef, useEffect } from "react";
import phone_stand from "../assets/phone-stand.png";
import ornament from "../assets/ornament.png";
import ratten_bag from "../assets/ratten-bag.png";
import cork_art from "../assets/cork-art.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/Carousel";
import { Card } from "./ui/Card";
import Autoplay from "embla-carousel-autoplay";

const CAROUSEL_CARDS = [
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

function HeroCarousel(props: {
  onImagesRegistered?: (count: number) => void;
  onImageReady?: () => void;
}) {
  const { onImagesRegistered, onImageReady } = props;
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  useEffect(() => {
    onImagesRegistered?.(CAROUSEL_CARDS.length);
  }, [onImagesRegistered]);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {CAROUSEL_CARDS.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card
                variant="plain"
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                  onLoad={onImageReady}
                />

                {/* Glass Overlay for Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pt-12 text-white">
                  <h3 className="text-xl font-semibold headline-serif mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {item.content}
                  </p>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="left-2 bg-white/85 hover:bg-white border border-black/10 text-black flex items-center justify-center">
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
        <CarouselNext className="right-2 bg-white/85 hover:bg-white border border-black/10 text-black flex items-center justify-center">
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

export default HeroCarousel;
