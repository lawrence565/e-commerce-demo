import "./style/StoreStyle.scss";
import StoreDisplay from "./Components/ProductDisplay";

function Store(props: { type: string }) {
  let currentType: string = "gadgets";

  const toGadgets = () => {
    currentType = "gadgets";
  };
  const toFurnitures = () => {
    currentType = "furnitures";
  };
  const toDecorations = () => {
    currentType = "decorations";
  };

  if (props.type === "gadgets" || props.type === "index") {
    currentType = "gadgets";
  } else if (props.type === "furnitures") {
    currentType = "furnitures";
  } else if (props.type === "decorations") {
    currentType = "decorations";
  }

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1200px] min-h-[70dvh] my-16 flex">
        <div
          id="catagory-indicator-conponents"
          className="h-[55dvh] w-[15dvw] bg-midBrown rounded-lg p-8 mx-4"
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
        <div className="store-display">
          <StoreDisplay type={currentType} />
        </div>
      </div>
    </div>
  );
}

export default Store;
