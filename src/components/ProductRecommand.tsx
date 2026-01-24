import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/Carousel";
import { Card } from "./ui/Card";

interface Product {
  id: number;
  title: string;
  name: string;
  category: string;
  description: string;
  price: number;
}

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

function ProductRecomanned(props: {
  title: string;
  category: string;
  url: string;
  onImagesRegistered?: (count: number) => void;
  onImageReady?: () => void;
}) {
  const { title, category, url, onImagesRegistered, onImageReady } = props;
  const [products, setProducts] = useState<Product[]>([]);
  const hasRegisteredImages = useRef(false);

  useEffect(() => {
    (async () => {
      let items: Product[] = [];
      try {
        if (category === "gadgets") {
          items = await getProducts("gadget");
        } else if (category === "furnitures") {
          items = await getProducts("furniture");
        } else if (category === "decorations") {
          items = await getProducts("decoration");
        }
        setProducts(items ?? []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      }
    })();
  }, [category]);

  useEffect(() => {
    if (products.length > 0 && !hasRegisteredImages.current) {
        onImagesRegistered?.(products.length);
        hasRegisteredImages.current = true;
    }
  }, [products, onImagesRegistered]);


  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-2xl font-bold font-serif text-ink">{title}</h2>
        <div className="hidden md:flex gap-2">
             {/* Controls are integrated into the carousel below */}
        </div>
      </div>
      
      <Carousel
        plugins={[WheelGesturesPlugin()]}
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full relative group"
      >
        <CarouselContent className="-ml-4 pb-4">
          {products.map((product, index) => (
            <CarouselItem key={index} className="pl-4 basis-[45%] md:basis-[30%] lg:basis-[22%] xl:basis-[18%]">
               <Link to={`/stores/${product.category}/${product.id}`} className="block h-full">
                  <Card 
                    variant="plain" 
                    className="h-full group/card hover:bg-white/50 transition-colors p-2 rounded-2xl border border-transparent hover:border-clay/20"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-sand/20 mb-3 relative">
                      <img
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover/card:scale-105"
                        src={`/${product.category}s/${product.name}.webp`}
                        alt={product.title}
                        loading="lazy"
                        onLoad={onImageReady}
                        onError={onImageReady}
                      />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-ink mb-1 truncate">{product.title}</h3>
                        <p className="text-sm text-ink/60 line-clamp-2 leading-relaxed">{product.description}</p>
                    </div>
                  </Card>
               </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious title="Previous" className="left-0 -translate-x-1/2 bg-paper/80 backdrop-blur-sm border-sand shadow-sm hover:bg-white text-ink disabled:opacity-0 transition-opacity" />
        <CarouselNext title="Next" className="right-0 translate-x-1/2 bg-paper/80 backdrop-blur-sm border-sand shadow-sm hover:bg-white text-ink disabled:opacity-0 transition-opacity" />
      </Carousel>

      <div className="mt-4 flex justify-end px-1">
         <Link to={`${url}`} onClick={scrollToTop} className="text-sm font-medium text-clay-deep hover:text-ink transition-colors border-b border-clay/30 hover:border-ink pb-0.5">
            查看更多
         </Link>
      </div>
    </div>
  );
}

export default ProductRecomanned;
