import { useParams } from "react-router-dom";
// import { useState, useRef } from "react";
import gadgets from "../assets/gadgets.json";
import furnitures from "../assets/furnitures.json";
import decorations from "../assets/decorations.json";

type Product = {
  title: string;
  name: string;
  content: string;
  img: string;
  price: number;
};

function ProductPage() {
  const { category, productName } = useParams<{
    category: string;
    productName: string;
  }>();
  if (!category || !productName) {
    return (
      <div className="h-[100dvh] w-[100dvw] font-bold bg-midBrown text-white">
        Invalid product or category
      </div>
    );
  }

  const data: { [key: string]: Product[] } = {
    gadgets,
    furnitures,
    decorations,
  };

  const products = data[category];
  console.log(products);

  let product = products?.find((item) => item.name === productName);
  console.log(product);
  console.log(`${product?.img}`);

  return (
    <div
      id="product"
      className="flex justify-center items-center min-h-[70dvh]"
    >
      <div id="product-img" className="aspect-square h-[40dvh]">
        <img src={`../${product?.img}`} />
      </div>
      <div id="product-desc">
        <h1>{product?.title}</h1>
        <hr />
        <h3>商品簡介：</h3>
        <p>{product?.content}</p>
      </div>
      <div>
        <div>
          <button>&#10094;</button>
        </div>

        <div>
          <button>&#10095;</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
