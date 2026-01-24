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
    <div className="section">
      <div className="flex flex-col md:flex-row gap-6">
        <aside
          id="category-indicator-conponents"
          className="surface-card p-6 md:w-[240px] h-fit"
          style={
            displayHeight && displayHeight > 0
              ? { minHeight: `${displayHeight}px` }
              : undefined
          }
        >
          <h2 className="text-xl font-semibold mb-4">商品類別</h2>
          <div className="flex md:flex-col gap-3">
            <button
              className={`cta-secondary text-left ${
                currentType === "gadgets" ? "bg-[rgba(160,147,125,0.15)]" : ""
              }`}
              onClick={toGadgets}
            >
              隨身用品
            </button>
            <button
              className={`cta-secondary text-left ${
                currentType === "furnitures" ? "bg-[rgba(160,147,125,0.15)]" : ""
              }`}
              onClick={toFurnitures}
            >
              手工家具
            </button>
            <button
              className={`cta-secondary text-left ${
                currentType === "decorations" ? "bg-[rgba(160,147,125,0.15)]" : ""
              }`}
              onClick={toDecorations}
            >
              裝飾擺設
            </button>
          </div>
        </aside>
        <div id="store-display" className="flex-1" ref={displayRef}>
          <StoreDisplay type={currentType} key={category} />
        </div>
      </div>
    </div>
  );
}

export default Store;
