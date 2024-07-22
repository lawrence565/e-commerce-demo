import phone_stand from "../assets/phone-stand.png";
import ornament from "../assets/ornament.png";
import ratten_bag from "../assets/ratten-bag.png";
import cork_art from "../assets/cork-art.png";
import "../style/homepage.scss";
import { useState } from "react";

function Card(title: string, content: string, img: string): JSX.Element {
  return (
    <div className="img-container">
      <img className="promote-img" src={img} alt="" />
      <div className="goods-tag">
        <h3 className="goods-name">{title}</h3>
        <p className="goods-disc">{content}</p>
      </div>
    </div>
  );
}

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    {
      title: "木製手機架",
      content: "使用台東漂流木結合原住民雕刻文化打造的特色手機架",
      img: phone_stand,
    },
    {
      title: "裝飾品",
      content: "精美的裝飾品，適合擺放在任何地方。",
      img: ornament,
    },
    {
      title: "籐包",
      content: "手工製作的籐包，既時尚又實用。",
      img: ratten_bag,
    },
    {
      title: "軟木藝術品",
      content: "獨特的軟木藝術品，增添藝術氣息。",
      img: cork_art,
    },
  ];

  const updateCarousel = (newIndex: number) => {
    setCurrentIndex((newIndex + cards.length) % cards.length);
  };

  return (
    <>
      <button
        className="nav left"
        onClick={() => updateCarousel(currentIndex - 1)}
      >
        &#10094;
      </button>
      {cards.map((product) => {
        return Card(product.title, product.content, product.img);
      })}
      <button
        className="nav right"
        onClick={() => updateCarousel(currentIndex + 1)}
      >
        &#10095;
      </button>
    </>
  );
}

export default Carousel;
