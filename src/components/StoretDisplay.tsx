import { useState, useRef, useEffect, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productApi";
import { useSpinnerStore } from "../store/appStore";
import { LazyImage } from "./LazyImage";
import { Card } from "./ui/Card";

interface Product {
  id: number;
  title: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

function paginate(
  array: ReactElement[],
  pageSize: number,
): Array<Array<ReactElement>> {
  return array.reduce(
    (acc, value, i) => {
      const pageIndex = Math.floor(i / pageSize);
      if (!acc[pageIndex]) {
        acc[pageIndex] = [];
      }
      acc[pageIndex].push(value);
      return acc;
    },
    [] as Array<Array<ReactElement>>,
  );
}

function StoreDisplay(props: { type: string }) {
  const displayRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [pendingImages, setPendingImages] = useState(0);
  const { showSpinner, hideSpinner } = useSpinnerStore();
  const pageSize = 9;

  const getPageImageCount = (index: number, total: number) => {
    if (total <= 0) return 0;
    const start = index * pageSize;
    if (start >= total) return 0;
    return Math.min(pageSize, total - start);
  };

  const display = products.map((product, index) => {
    return (
      <div className="p-2" key={index}>
        <Link to={`/stores/${product.category}/${product.id}`}>
          <Card 
            className="group hover:bg-white/80 transition-all duration-500 h-full flex flex-col p-3 border border-transparent hover:border-sand/30 hover:shadow-lg"
            variant="glass"
          >
             <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-sand/10 relative">
                <LazyImage
                  src={`/${product.category}s/${product.name}.webp`}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  skeletonAnimation="wave"
                  onLoad={() => setPendingImages((prev) => Math.max(prev - 1, 0))}
                  onError={() => setPendingImages((prev) => Math.max(prev - 1, 0))}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
             </div>
             
             <div className="mt-4 flex flex-col justify-between flex-1 gap-1 px-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold text-ink leading-tight font-serif group-hover:text-clay-deep transition-colors line-clamp-2">
                        {product.title}
                    </h3>
                </div>
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-sand/30">
                    <span className="text-xs text-ink/50 uppercase tracking-wider font-medium">
                        {props.type === 'gadgets' ? '隨身' : props.type === 'furnitures' ? '家俱' : '裝飾'}
                    </span>
                    <span className="text-clay-deep font-bold text-lg font-mono">
                        ${product.price}
                    </span>
                </div>
             </div>
          </Card>
        </Link>
      </div>
    );
  });

  const pages = paginate(display, pageSize);
  const totalPages = Math.ceil(display.length / pageSize);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        showSpinner();
        setIsDataReady(false);
        setPendingImages(0);
        setPageIndex(0);
        let items;
        if (props.type === "gadgets") {
          items = await getProducts("gadget");
        } else if (props.type === "furnitures") {
          items = await getProducts("furniture");
        } else if (props.type === "decorations") {
          items = await getProducts("decoration");
        }
        if (!isMounted) return;
        const nextProducts = items ?? [];
        setPendingImages(getPageImageCount(0, nextProducts.length));
        setProducts(nextProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
        if (!isMounted) return;
        setPendingImages(0);
        setProducts([]);
      } finally {
        if (isMounted) {
          setIsDataReady(true);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [props.type, showSpinner]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products, pageIndex]);

  useEffect(() => {
    if (pageIndex > totalPages - 1) {
      const nextIndex = 0;
      setPageIndex(nextIndex);
      if (isDataReady) {
        setPendingImages(getPageImageCount(nextIndex, products.length));
      }
    }
  }, [pageIndex, totalPages, isDataReady, products.length]);

  useEffect(() => {
    if (!isDataReady) return;
    if (pendingImages === 0) {
      hideSpinner();
    }
  }, [pendingImages, isDataReady, hideSpinner]);

  const handlePreviousPage = () => {
    if (pages.length === 0) return;
    const nextIndex = Math.max(pageIndex - 1, 0);
    setPageIndex(nextIndex);
    setPendingImages(getPageImageCount(nextIndex, products.length));
  };

  const handleNextPage = () => {
    if (pages.length === 0) return;
    const nextIndex = Math.min(pageIndex + 1, pages.length - 1);
    setPageIndex(nextIndex);
    setPendingImages(getPageImageCount(nextIndex, products.length));
  };

  return (
    <div className="h-fit">
      <div
        className={`grid grid-cols-2 lg:grid-cols-3 gap-4 content-start py-4 md:py-0`}
        ref={displayRef}
      >
        {pages[pageIndex] ?? (
          <div className="col-span-2 lg:col-span-3 text-center py-12 text-ink/50 font-serif text-xl">
            目前沒有商品
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-12 mb-8 gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={pageIndex === 0 || pages.length === 0}
              className="p-2 rounded-full hover:bg-clay/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-ink"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPageIndex(index)}
                  className={`w-10 h-10 rounded-full font-bold transition-all duration-300 font-serif ${
                    pageIndex === index
                      ? "bg-clay text-paper shadow-md scale-110"
                      : "bg-white text-ink hover:bg-clay/10"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={pages.length === 0 || pageIndex === pages.length - 1}
              className="p-2 rounded-full hover:bg-clay/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-ink"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>
      )}
    </div>
  );
}

export default StoreDisplay;
