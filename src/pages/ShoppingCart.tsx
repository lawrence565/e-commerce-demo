import gadgets from "../assets/products/gadgets.json";
import decorations from "../assets/products/decorations.json";
import furnitures from "../assets/products/furnitures.json";
import { useState, useRef, useEffect } from "react";
import "../style/CartStyle.scss";

type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  content: string;
  title: string;
};

type kartItem = {
  id: number;
  type: string;
  amount: number;
};

function Card(props: {
  item: kartItem;
  updateSubtotal: (subtotal: number) => void;
}): JSX.Element {
  const item = props.item;
  const updateSubtotal = props.updateSubtotal;
  const [amount, setAmount] = useState(item.amount);
  const data: { [key: string]: Product[] } = {
    gadgets,
    furnitures,
    decorations,
  };

  const products = data[item.type];
  let product = products?.find((product) => product.id === item.id);

  const add = () => {
    const newAmount = amount + 1;
    setAmount(newAmount);
  };

  const minus = () => {
    const newAmount = amount - 1;
    setAmount(newAmount);
  };

  useEffect(() => {
    updateSubtotal(amount * (product?.price ?? 0));
  }, [amount, product, updateSubtotal]);

  return (
    <div className="flex w-full border-b-2 border-midBrown max-w-[40dvw]">
      <div className="w-[10dvw] aspect-4/3 overflow-hidden rounded-md m-2">
        <img src={product?.img} />
      </div>
      <div className="flex justify-between items-center w-full max-w-[30dvw] mr-8 ml-4 ">
        <div className="h-fit">
          <h3 className="font-semibold text-2xl mb-4">{product?.title}</h3>
          <p className="text-lg">{`$ ${product?.price}`}</p>
        </div>
        <div className="h-fit">
          <div
            id="amount"
            className="w-fit ml-4 flex rounded-md border-[1px] border-midBrown"
          >
            <div className="w-8 flex justify-center items-centerp-2 text-midBrown cursor-pointer">
              <button
                onClick={minus}
                disabled={amount === 1}
                className="h-full w-full"
              >
                &#10094;
              </button>
            </div>
            <div className="w-12 flex justify-center items-center p-2 bg-midBrown text-white">
              {amount}
            </div>
            <div className="w-8 flex justify-center items-centerp-2 text-midBrown cursor-pointer">
              <button
                onClick={add}
                disabled={amount === 20}
                className="h-full w-full"
              >
                &#10095;
              </button>
            </div>
          </div>
          <div
            className={`text-red-500 text-sm ${
              amount === 20 ? "" : "invisible"
            }`}
          >
            已達到購買上限
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopppingKart() {
  const inKart: kartItem[] = [
    { id: 2, type: "gadgets", amount: 3 },
    { id: 3, type: "furnitures", amount: 2 },
    { id: 6, type: "gadgets", amount: 5 },
  ];
  const subtotals = useRef<number[]>(new Array(inKart.length).fill(0));
  const [subtotal, setSubtotal] = useState(0);

  const coupon = 100,
    discount = 300;

  const updateSubtotal = (index: number, newSubtotal: number) => {
    subtotals.current[index] = newSubtotal;
    setSubtotal(subtotals.current.reduce((acc, curr) => acc + curr, 0));
  };

  return (
    <div className="flex justify-center my-8 w-full">
      <div className="flex justify-center my-8 max-w-[1200px] w-full">
        <div
          id="items"
          className="flex-[3] max-w-[40dvw] flex flex-col justify-center mr-8"
        >
          <h1 className="text-4xl font-bold text-midBrown  mb-8">購買品項</h1>
          {inKart.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              updateSubtotal={(newSubtotal) =>
                updateSubtotal(index, newSubtotal)
              }
            />
          ))}
        </div>
        <div
          id="subtotal"
          className="flex-[1] max-w-[20dvw] rounded-lg bg-midBrown p-6 h-fit"
        >
          <h1 className="font-semibold text-3xl text-white mb-4 max-w-[15dvw] ml-2">
            購買明細
          </h1>
          <hr />
          <div className="flex flex-col justify-center items-center my-4">
            <div className="subtotal">
              <h3>商品原價：</h3>
              <h3>{`${subtotal}`}</h3>
            </div>
            <div className="subtotal">
              <h3>折扣：</h3>
              <h3>{`- ${discount}`}</h3>
            </div>
            <div className="subtotal">
              <h3>優惠券：</h3>
              <h3>{`- ${coupon}`}</h3>
            </div>
          </div>
          <hr />
          <div className="flex justify-center w-9/10 m-2">
            <div className="flex text-white w-full justify-between max-w-[350px]">
              <h1 className="font-semibold text-2xl">結帳金額：</h1>
              <h1 className="text-end text-2xl">
                {subtotal - coupon - discount}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopppingKart;
