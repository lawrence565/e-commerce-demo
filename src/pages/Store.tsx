import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreDisplay from "../components/StoretDisplay";

function Store() {
  const [currentType, setCurrentType] = useState("gadgets");
  const displayRef = useRef<HTMLDivElement>(null);
  const { category } = useParams();

  const toGadgets = () => setCurrentType("gadgets");
  const toFurnitures = () => setCurrentType("furnitures");
  const toDecorations = () => setCurrentType("decorations");

  useEffect(() => {
    if (category === "gadgets" || !category) {
      setCurrentType("gadgets");
    } else if (category === "furnitures") {
      setCurrentType("furnitures");
    } else if (category === "decorations") {
      setCurrentType("decorations");
    }
  }, [category]);

  const buttonClass = (type: string) => `
    text-left px-6 py-3 rounded-full transition-all duration-300 font-medium
    ${currentType === type 
      ? "bg-clay text-paper shadow-md font-bold translate-x-1" 
      : "text-ink hover:bg-clay/10 hover:pl-7"
    }
  `;

  return (
    <div className="min-h-screen bg-sand/10 pb-20">
      <div className="section pt-8">
        <h1 className="text-4xl font-bold font-serif text-ink mb-8 border-b border-sand/30 pb-4">
            商店首頁
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-[240px] flex-shrink-0">
            <div className="sticky top-24 bg-white/50 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50">
                <h2 className="text-xl font-bold font-serif text-clay-deep mb-6 px-2">商品類別</h2>
                <nav className="flex flex-col gap-2">
                    <button className={buttonClass("gadgets")} onClick={toGadgets}>
                    隨身用品
                    </button>
                    <button className={buttonClass("furnitures")} onClick={toFurnitures}>
                    手工家具
                    </button>
                    <button className={buttonClass("decorations")} onClick={toDecorations}>
                    裝飾擺設
                    </button>
                </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-h-[500px]" ref={displayRef}>
            <StoreDisplay type={currentType} key={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
