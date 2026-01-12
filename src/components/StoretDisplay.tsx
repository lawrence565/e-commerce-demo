import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productApi";

interface Product {
  id: number;
  title: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

function paginate(
  array: JSX.Element[],
  pageSize: number
): Array<Array<JSX.Element>> {
  return array.reduce((acc, value, i) => {
    const pageIndex = Math.floor(i / pageSize); // 判斷每一個元素在哪個頁面並加入
    if (!acc[pageIndex]) {
      acc[pageIndex] = []; //若沒有資料則清空後再加入
    }
    acc[pageIndex].push(value);
    return acc;
  }, [] as Array<Array<JSX.Element>>);
}

function StoreDisplay(props: { type: string }) {
  const displayRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  const display = products.map((product, index) => {
    return (
      <div className="mx-4 md:mx-6 my-2 cursor-pointer card-hover" key={index}>
        <Link to={`/stores/${product.category}/${product.id}`}>
          <div className="w-full lg:w-[12dvw] max-w-[250px] rounded-md overflow-hidden border-midBrown border-[5px] aspect-4/3">
            <img
              src={`./${product.category}s/${product.name}.webp`}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="">
            <h1 className="text-xl">{product.title}</h1>
            <h2 className="text-lg italic font-bold text-end">{`$ ${product.price}`}</h2>
          </div>
        </Link>
      </div>
    );
  });

  const pages = paginate(display, 9);
  const totalPages = Math.ceil(display.length / 9);

  useEffect(() => {
    (async () => {
      let items;
      if (props.type === "gadgets") {
        items = await getProducts("gadget");
      } else if (props.type === "furnitures") {
        items = await getProducts("furniture");
      } else if (props.type === "decorations") {
        items = await getProducts("decoration");
      }
      setProducts(items ?? []);
    })();
  }, [props.type]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products, pageIndex]);

  useEffect(() => {
    if (pageIndex > totalPages - 1) {
      setPageIndex(0);
    }
  }, [pageIndex, totalPages]);

  const handlePreviousPage = () => {
    if (pages.length === 0) return;
    setPageIndex((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    if (pages.length === 0) return;
    setPageIndex((prevPage) => Math.min(prevPage + 1, pages.length - 1));
  };

  return (
    <div className="h-fit">
      <div
        className={`grid grid-cols-2 md:grid-cols-3 justify-center content-start py-4 md:py-0`}
        ref={displayRef}
      >
        {pages[pageIndex] ?? (
          <div className="col-span-2 md:col-span-3 text-center py-6">
            目前沒有商品
          </div>
        )}
      </div>
      <div
        id="page-indicator"
        className="flex items-center justify-center my-4"
      >
        <div className="rounded-lg flex items-center justify-center border-box relative">
          <div className="prev px-4 text-lg">
            <button
              onClick={handlePreviousPage}
              disabled={pageIndex === 0 || pages.length === 0}
            >
              &#10094;
            </button>
          </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              onClick={() => {
                setPageIndex(index);
              }}
              className={`px-4 cursor-pointer aspect-square flex items-center rounded-lg transition-all ease-in duration-300 ${pageIndex === index
                  ? "bg-midBrown text-white"
                  : "bg-white text-midBrown"
                }`}
            >
              {index + 1}
            </div>
          ))}
          <div className="next px-4 text-lg">
            <button
              onClick={handleNextPage}
              disabled={pages.length === 0 || pageIndex === pages.length - 1}
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDisplay;
