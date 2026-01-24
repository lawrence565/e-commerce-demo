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
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

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
              <Card variant="plain" className="relative aspect-[4/3] overflow-hidden rounded-xl">
                 <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                    onLoad={onImageReady}
                  />
                  
                  {/* Glass Overlay for Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pt-12 text-paper">
                    <h3 className="text-xl font-bold font-serif mb-1">{item.title}</h3>
                    <p className="text-sm text-paper/90 line-clamp-2">{item.content}</p>
                  </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="left-2 bg-paper/80 hover:bg-paper" />
        <CarouselNext className="right-2 bg-paper/80 hover:bg-paper" />
      </div>
    </Carousel>
  );
}

export default HeroCarousel;
