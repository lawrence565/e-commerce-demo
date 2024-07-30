import "./style/StoreStyle.scss";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreDisplay from "../components/ProductDisplay";

function Store() {
  let [currentType, setCurrentType] = useState("gadgets");
  let [displayHeight, setDisplayheight] = useState("55vh");
  let displayRef = useRef<HTMLDivElement>(null);
  const { catagory } = useParams();

  const toGadgets = () => {
    setCurrentType("gadgets");
  };
  const toFurnitures = () => {
    setCurrentType("furnitures");
  };
  const toDecorations = () => {
    setCurrentType("decorations");
  };

  if (catagory === "gadgets" || catagory === "index") {
    setCurrentType("gadgets");
  } else if (catagory === "furnitures") {
    setCurrentType("furnitures");
  } else if (catagory === "decorations") {
    setCurrentType("decorations");
  }

  useEffect(() => {
    const setHeight = () => {
      if (displayRef.current) {
        setDisplayheight(
          displayRef.current.getBoundingClientRect().height.toString() + "px"
        );
      }
    };
    setHeight();
  });

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1200px] min-h-[70dvh] my-16 flex">
        <div
          id="catagory-indicator-conponents"
          className={`h-[${displayHeight}] w-[15dvw] bg-midBrown rounded-lg p-8 mx-4`}
        >
          <div className="text-white">
            <h1 className="font-bold text-2xl">商品類別</h1>
            <hr />
          </div>
          <div className="flex flex-col my-8 justify-center">
            <div
              className={`catagory-indicator ${
                currentType === "gadgets" ? "thisType" : ""
              }`}
              onClick={toGadgets}
            >
              隨身用品
            </div>
            <div
              className={`catagory-indicator ${
                currentType === "furnitures" ? "thisType" : ""
              }`}
              onClick={toFurnitures}
            >
              手工家具
            </div>
            <div
              className={`catagory-indicator ${
                currentType === "decorations" ? "thisType" : ""
              }`}
              onClick={toDecorations}
            >
              裝飾擺設
            </div>
          </div>
        </div>
        <div id="store-display" ref={displayRef}>
          <StoreDisplay type={currentType} />
        </div>
      </div>
    </div>
  );
}

export default Store;
