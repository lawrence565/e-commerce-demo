import { useParams } from "react-router-dom";
import { useState } from "react";
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
  const [amount, setAmount] = useState(1);

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
  let product = products?.find((item) => item.name === productName);

  const add = () => {
    setAmount(amount + 1);
  };

  const minus = () => {
    setAmount(amount - 1);
  };

  return (
    <div className="min-h-[70dvh] flex justify-center items-center">
      <div id="product" className="flex justify-center items-center h-fit">
        <div
          id="product-img"
          className="aspect-square h-[40dvh] rounded-2xl overflow-hidden mx-8 "
        >
          <img src={`../${product?.img}`} />
        </div>
        <div id="product-desc" className="mx-8 h-[40dvh] flex flex-col">
          <div className="flex-[4] h-full">
            <h1 className="text-4xl mx-4 mb-6 font-bold">{product?.title}</h1>
            <hr className="text-midBrown" />
            <h3 className="text-lg m-4">商品簡介：</h3>
            <p className="m-4">{product?.content}</p>
          </div>
          <div
            id="amount&price"
            className="flex-1 flex items-end justify-between"
          >
            <div className="mx-4">
              <div
                className={`text-red-500 text-sm ${
                  amount === 20 ? "" : "invisible"
                }`}
              >
                已達到購買上限
              </div>
              <div
                id="amount"
                className="w-fit flex rounded-md border-[1px] border-midBrown"
              >
                <div className="w-6 flex justify-center items-centerp-2 text-midBrown">
                  <button onClick={minus} disabled={amount === 1}>
                    &#10094;
                  </button>
                </div>
                <div className="w-10 flex justify-center items-center p-2 bg-midBrown text-white">
                  {amount}
                </div>
                <div className="w-6 flex justify-center items-centerp-2 text-midBrown">
                  <button onClick={add} disabled={amount === 20}>
                    &#10095;
                  </button>
                </div>
              </div>
            </div>
            <div className="font-bold text-4xl">{`$ ${product?.price}`}</div>
          </div>
        </div>
      </div>

      <div id="info">
        <div>商品相關資訊</div>
        <div>
          <h3>商品數量</h3>
          <p></p>
        </div>
        <div>
          <h3>商品保養</h3>
        </div>
        <div>
          <h3>商品維修</h3>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
