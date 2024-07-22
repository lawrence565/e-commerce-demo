import Carousel from "./component/carousel";
import "./style/homepage.scss";

function Homepage(): JSX.Element {
  return (
    <>
      <div className="homepage-contanier">
        <div className="h-2/5 min-h-[350px]">
          <div className="promotion-img-container h-2/5 min-h-[350px] flex flex-nowrap items-center overflow-x-scroll">
            <Carousel />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
