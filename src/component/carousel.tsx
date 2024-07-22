import phone_stand from "../assets/phone-stand.png";
import ornament from "../assets/ornament.png";
import ratten_bag from "../assets/ratten-bag.png";
import cork_art from "../assets/cork-art.png";
import "../style/homepage.scss";

function Carousel() {
  return (
    <>
      <button className="arrow">&#10094;</button>
      <div className="img-container">
        <img className="promote-img" src={phone_stand} alt="" />
        <div className="goods-tag">
          <h3 className="goods-name">木製手機架</h3>
          <p className="goods-disc">
            使用台東漂流木結合原住民雕刻文化打造的特色手機架
          </p>
        </div>
      </div>

      <div className="img-container">
        <img className="promote-img" src={ornament} alt="" />
        <div className="goods-tag">
          <h3 className="goods-name">木製手機架</h3>
          <p className="goods-disc">
            使用台東漂流木結合原住民雕刻文化打造的特色手機架
          </p>
        </div>
      </div>

      <div className="img-container">
        <img className="promote-img" src={ratten_bag} alt="" />
        <div className="goods-tag">
          <h3 className="goods-name">木製手機架</h3>
          <p className="goods-disc">
            使用台東漂流木結合原住民雕刻文化打造的特色手機架
          </p>
        </div>
      </div>

      <div className="img-container">
        <img className="promote-img" src={cork_art} alt="" />
        <div className="goods-tag">
          <h3 className="goods-name">木製手機架</h3>
          <p className="goods-disc">
            使用台東漂流木結合原住民雕刻文化打造的特色手機架
          </p>
        </div>
      </div>
      <button className="arrow">&#10095;</button>
    </>
  );
}

export default Carousel;
