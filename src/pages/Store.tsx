import "../style/StoreStyle.scss";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreDisplay from "../components/StoretDisplay";

function Store() {
  const [currentType, setCurrentType] = useState("gadgets");
  const [displayHeight, setDisplayheight] = useState<number | null>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const { category } = useParams();

  const toGadgets = () => {
    setCurrentType("gadgets");
  };
  const toFurnitures = () => {
    setCurrentType("furnitures");
  };
  const toDecorations = () => {
    setCurrentType("decorations");
  };

  useEffect(() => {
    if (category === "gadgets" || !category) {
      setCurrentType("gadgets");
    } else if (category === "furnitures") {
      setCurrentType("furnitures");
    } else if (category === "decorations") {
      setCurrentType("decorations");
    }
  }, [category]);

  useEffect(() => {
    const setHeight = () => {
      if (!displayRef.current) return;
      const height = displayRef.current.getBoundingClientRect().height;
      setDisplayheight(height);
    };

    setHeight();

    window.addEventListener("resize", setHeight);

    const observer = new ResizeObserver(setHeight);
    if (displayRef.current) {
      observer.observe(displayRef.current);
    }

    return () => {
      window.removeEventListener("resize", setHeight);
      observer.disconnect();
    };
  }, [currentType]);

  return (
    <div className="flex justify-center items-center min-h-[70dvh]">
      <div className="max-w-[1200px] min-h-[50dvh] my-6 lg:my-16 flex flex-col md:flex-row justify-center">
        <div
          id="category-indicator-conponents"
          className="md:w-[20dvw] xl:w-[15dvw] bg-midBrown rounded-lg px-4 md:px-8 py-4 lg:py-8 mx-4 flex-shrink-0"
          style={
            displayHeight && displayHeight > 0
              ? { minHeight: `${displayHeight}px` }
              : undefined
          }
        >
          <div className="text-white">
            <h1 className="font-bold text-3xl lg:text-2xl text-center lg:text-start mb-3 lg:mb-1">
              商品類別
            </h1>
            <hr />
          </div>
          <div className="flex md:flex-col justify-center pt-4 md:pt-2 p-2 lg:p-4 lg:my-8">
            <div
              className={`category-indicator ${
                currentType === "gadgets" ? "thisType" : ""
              }`}
              onClick={toGadgets}
            >
              隨身用品
            </div>
            <div
              className={`category-indicator ${
                currentType === "furnitures" ? "thisType" : ""
              }`}
              onClick={toFurnitures}
            >
              手工家具
            </div>
            <div
              className={`category-indicator ${
                currentType === "decorations" ? "thisType" : ""
              }`}
              onClick={toDecorations}
            >
              裝飾擺設
            </div>
          </div>
        </div>
        <div id="store-display" className="h-fit" ref={displayRef}>
          <StoreDisplay type={currentType} key={category} />
        </div>
      </div>
    </div>
  );
}

export default Store;
