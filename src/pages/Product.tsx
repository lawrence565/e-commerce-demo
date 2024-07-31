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
    <div className="min-h-[70dvh] max-w[1200px] flex flex-col justify-center items-center">
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
                <div
                  onClick={minus}
                  className="w-6 flex justify-center items-centerp-2 text-midBrown cursor-pointer"
                >
                  <button disabled={amount === 1}>&#10094;</button>
                </div>
                <div className="w-10 flex justify-center items-center p-2 bg-midBrown text-white">
                  {amount}
                </div>
                <div
                  onClick={add}
                  className="w-6 flex justify-center items-centerp-2 text-midBrown cursor-pointer"
                >
                  <button disabled={amount === 20}>&#10095;</button>
                </div>
              </div>
            </div>
            <div className="font-bold text-4xl">{`$ ${product?.price}`}</div>
          </div>
        </div>
      </div>

      <div id="info" className="w-full flex justify-center items-center px-8">
        <div id="product-info">
          <h1>商品相關資訊</h1>
          <div>
            <h3>商品數量</h3>
            <p>每個產品內含一張木雕面具</p>
          </div>
          <div>
            <h3>商品保養</h3>
            <p>
              由於商品為木製產品，因此需要放置於陰暗乾燥處，避免產品出現損壞等情況
            </p>
          </div>
          <div>
            <h3>商品維修</h3>
            <p>
              由於商品是透過藝術家手工雕刻，若是產生嚴重損壞無法維修，只能夠重新製作一份，敬請見諒
            </p>
          </div>
        </div>
        <div id="buyer-info">
          <h1>購買須知</h1>
          <div>
            <h3>個人資料保護</h3>
            <p>
              為保障個資安全，您所訂購的商品之出貨標籤上，我們將會遮蔽部份姓名。如造成您的收貨困擾，請見諒。
            </p>
          </div>
          <div>
            <h3>配送時間</h3>
            <p>
              由訂購完成當日起，商品會於3-5個工作天內配送至您指定的收貨地址。
            </p>
          </div>
          <div>
            <h3>退貨辦理</h3>
            <p>
              商品配送到府後，請儘速檢視商品。若有商品缺漏、或運送過程中有損毀等情形，請於收貨24小時內透過官方Line聯絡客服，由客服人員確認並協助您進行處理。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
