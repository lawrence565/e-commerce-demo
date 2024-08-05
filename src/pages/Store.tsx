import "../style/StoreStyle.scss";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreDisplay from "../Components/StoretDisplay";

function Store() {
  let [currentType, setCurrentType] = useState("gadgets");
  let [displayHeight, setDisplayheight] = useState("55vh");
  let displayRef = useRef<HTMLDivElement>(null);
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
      if (displayRef.current) {
        setDisplayheight(
          displayRef.current.getBoundingClientRect().height.toString() + "px"
        );
      }
    };
    setHeight();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[70dvh]">
      <div className="max-w-[1200px] min-h-[50dvh] my-16 flex">
        <div
          id="category-indicator-conponents"
          className={`h-[${displayHeight}] w-[15dvw] bg-midBrown rounded-lg p-8 mx-4`}
        >
          <div className="text-white">
            <h1 className="font-bold text-2xl">商品類別</h1>
            <hr />
          </div>
          <div className="flex flex-col my-8 justify-center">
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
