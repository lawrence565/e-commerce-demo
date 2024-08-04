import gadgets from "../assets/products/gadgets.json";
import decorations from "../assets/products/decorations.json";
import furnitures from "../assets/products/furnitures.json";
import coupons from "../assets/coupon.json";
import CheckoutProcess from "../utils/checkoutProcess";
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
    <div className="flex w-full border-b-2 border-midBrown min-w-[600px] md:max-w-[40dvw] lg:max-w-[60dvw] p-4">
      <div className="md:w-[10dvw] lg:w-[15dvw] h-fit aspect-4/3 overflow-hidden rounded-md">
        <img src={product?.img} />
      </div>
      <div className="flex justify-between items-center w-full min-w-[400px] md:max-w-[500px] lg:max-w-[800px] mr-8 ml-4 ">
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
            className={`text-red-500 text-sm ${amount === 20 ? "" : "hidden"}`}
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
  const [step, setStep] = useState(1);

  const coupon = 100,
    discount = 300;

  const updateSubtotal = (index: number, newSubtotal: number) => {
    subtotals.current[index] = newSubtotal;
    setSubtotal(subtotals.current.reduce((acc, curr) => acc + curr, 0));
  };

  return (
    <div className="flex flex-col items-center justify-start my-8 w-full min-h-[70dvh]">
      <CheckoutProcess step={step} />
      <div className="flex justify-between my-8 max-w-[1200px] w-full">
        <div
          id="items"
          className="flex-[3] ml-4 min-w-[600px] md:max-w-[40dvw] lg:max-w-[60dvw] flex flex-col justify-center mr-8"
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
          className="flex-[1] min-w-[300px] max-w-[20dvw] rounded-lg bg-midBrown p-6 m-4 h-fit "
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
          <div className="w-3/5 h-fit bg-white p-2 ml-[20%] mt-4 text-end rounded-md flex justify-center">
            <button className="w-full h-full font-bold text-midBrown">
              結帳
            </button>
          </div>
        </div>
      </div>

      <div id="coupon" className="w-full max-w-[1200px]">
        <div className="m-4 w-fit rounded-lg overflow-hidden  border-[2px] border-midBrown">
          <input
            className="w-[200px] p-2 bg-gray-300"
            placeholder="請輸入優惠碼"
          />
          <button className="bg-midBrown text-white px-4 py-2">套用</button>
          <button className="bg-white text-midBrown px-4 py-2">取消</button>
        </div>

        <div id="avaliable" className="m-4">
          <table className="min-w-[500px] w-[60dvw] max-w-[800px]">
            <thead className="w-full bg-midBrown">
              <tr className="w-full text-white">
                <th className="w-2/5 text-lg font-semibold py-[2px]">名稱</th>
                <th className="w-1/5 text-lg font-semibold py-[2px]">折扣</th>
                <th className="w-1/5 text-lg font-semibold py-[2px]">到期日</th>
                <th className="w-fit text-lg font-semibold py-[2px]">選擇</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => {
                return (
                  <tr className="w-full text-center h-fit mb-2">
                    <td className="w-2/5 text-start text-lg pl-2 py-2">
                      {coupon.name}
                    </td>
                    <td className="w-1/5 text-lg py-2">{coupon.discount}</td>
                    <td className="w-1/5 text-lg py-2">{coupon.expirement}</td>
                    <td className="w-fit">
                      <button className="px-2 rounded-md border-[1px] border-midBrown">
                        選擇
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShopppingKart;
