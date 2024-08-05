import gadgets from "../assets/products/gadgets.json";
import furnitures from "../assets/products/furnitures.json";
import decorations from "../assets/products/decorations.json";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  title: string;
  name: string;
  price: number;
  img: string;
}

function paginate(
  array: JSX.Element[],
  pageSize: number
): Array<Array<JSX.Element>> {
  return array.reduce((acc, val, i) => {
    const pageIndex = Math.floor(i / pageSize); // 判斷每一個元素在哪個頁面並加入
    if (!acc[pageIndex]) {
      acc[pageIndex] = []; //若沒有資料則清空後再加入
    }
    acc[pageIndex].push(val);
    return acc;
  }, [] as Array<Array<JSX.Element>>);
}

function StoreDisplay(props: { type: string }) {
  let products: Product[] = [];
  const displayRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [displayHeight, setdisplayHeight] = useState(500);

  if (props.type === "gadgets" || props.type === "index") {
    products = gadgets;
  } else if (props.type === "furnitures") {
    products = furnitures;
  } else if (props.type === "decorations") {
    products = decorations;
  }

  const display = products.map((product, index) => {
    return (
      <div className="mx-6 my-2 cursor-pointer" key={index}>
        <Link to={`/stores/${props.type}/${product.name}`}>
          <div className="w-[12dvw] max-w-[250px] rounded-md overflow-hidden border-midBrown border-[5px] aspect-4/3">
            {/* <img src={product.img} /> */}
          </div>
          <div className="">
            <h1 className="text-xl">{product.title}</h1>
            <h2 className="text-lg italic font-bold text-end">{`$ ${product.price}`}</h2>
          </div>
        </Link>
      </div>
    );
  });

  const totalPages = display.length / 9 + 1;

  useEffect(() => {
    const updateHeight = () => {
      if (displayRef.current) {
        setdisplayHeight(displayRef.current.getBoundingClientRect().height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const pages = paginate(display, 9); // 把 products 中的產品分為 9 個

  const handlePreviousPage = () => {
    setPageIndex((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPageIndex((prevPage) => Math.min(prevPage + 1, pages.length - 1));
  };

  return (
    <div className="h-fit">
      <div
        className={`grid grid-cols-3 justify-center content-start`}
        style={{ minHeight: displayHeight }}
        ref={displayRef}
      >
        {pages[pageIndex]}
      </div>
      <div
        id="page-indicator"
        className="flex items-center justify-center my-4"
      >
        <div className=" rounded-lg flex items-center justify-center border-box relative">
          <div className="prev px-4 text-lg">
            <button onClick={handlePreviousPage} disabled={pageIndex === 0}>
              &#10094;
            </button>
          </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              onClick={() => setPageIndex(index)}
              className={`px-4 cursor-pointer aspect-square flex items-center rounded-lg transition-all ease-in duration-300 ${
                pageIndex === index
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
              disabled={pageIndex === pages.length - 1}
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
