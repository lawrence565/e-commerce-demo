import { Link } from "react-router-dom";

function StillBuilding() {
  return (
    <div className="w-full min-h-[70dvh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center min-w-[90dvw] md:min-w-[40dvw] min-h-[50dvh] md:min-h-[60dvh] border-4 border-midBrown rounded-xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-midBrown font-bold">
          此功能尚在製作中
        </h1>
        <Link
          to="/"
          className="mt-12 p-2 text-base md:text-lg lg:text-xl border-2 border-midBrown rounded-lg bg-midBrown text-white font-semibold hover:bg-white hover:text-midBrown transition-colors duration-150"
        >
          回到首頁
        </Link>
      </div>
    </div>
  );
}

export default StillBuilding;
