import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProduct, postCart } from "../api/productApi";
import products from "../assets/products.json";

interface Product {
  id: number;
  title: string;
  name: string;
  category: string;
  price: number;
  discription: string;
}

type CartItem = {
  productId: number;
  category: string;
  quantity: number;
};

function ProductPage() {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();

  if (!category || !itemId) {
    return (
      <div className="h-[100dvh] w-[100dvw] font-bold bg-midBrown text-white">
        Invalid product or category
      </div>
    );
  }

  useEffect(() => {
    (async () => {
      try {
        if (itemId) {
          const data = await getSingleProduct(category, parseInt(itemId));

          if (data) {
            setProduct(data);
          }
        }
      } catch (e) {
        console.log("Here's some problem: " + e);
        const data = products.find((product) => {
          return product.id === parseInt(itemId);
        });
        setProduct(data);
      }
    })();
  }, [category, itemId]);

  const addToCart = async () => {
    if (product) {
      const cartItem: CartItem = {
        productId: product.id,
        category: product.category,
        quantity: amount,
      };
      try {
        await postCart(cartItem);
      } catch (e) {
        console.log("Here's some problem: " + e);
      }
    }
  };

  const buyNow = async () => {
    if (product) {
      const cartItem: CartItem = {
        productId: product.id,
        category: product.category,
        quantity: amount,
      };
      try {
        await postCart(cartItem);
        navigate("/shoppingcart");
      } catch (e) {
        console.log("Here's some problem: " + e);
      }
    }
  };

  const add = () => {
    setAmount(amount + 1);
  };

  const minus = () => {
    setAmount(amount - 1);
  };

  return (
    <div className="min-h-[70dvh] max-w[1200px] my-8 flex flex-col justify-center items-center">
      <div id="product" className="flex justify-center items-center h-fit mb-8">
        <div
          id="product-img"
          className="aspect-square h-[40dvh] rounded-2xl overflow-hidden mx-8 "
        >
          <img src={`/${product?.category}s/${product?.name}.webp`} />
        </div>
        <div id="product-desc" className="mx-8 h-[40dvh] flex flex-col">
          <div className="flex-[4] h-full">
            <h1 className="text-4xl mx-4 mb-6 font-bold">{product?.title}</h1>
            <hr className="text-midBrown" />
            <h3 className="text-2xl font-semibold m-4">商品簡介：</h3>
            <p className="m-4">{product?.discription}</p>
          </div>
          <div className="font-bold text-4xl mr-8 mb-8 text-end">{`$ ${product?.price}`}</div>
          <div
            id="amount&buy"
            className="flex-1 w-[40dvh] flex items-cneter justify-between mb-4"
          >
            <div className="mx-4">
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
            <div id="pay-or-kart" className="flex text-lg font-semibold h-fit">
              <button
                className="bg-midBrown text-white px-4 py-2 mx-2 rounded-md"
                onClick={addToCart}
              >
                加入購物車
              </button>
              <button
                className="bg-white text-midBrown px-4 py-2 mx-2 rounded-md border-midBrown border-[2px]"
                onClick={buyNow}
              >
                立即購買
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="info" className="w-full flex justify-center items-start m-8">
        <div id="product-info" className="w-[40dvh] mx-4">
          <h1 className="text-xl font-bold">商品相關資訊</h1>
          <div className="py-2">
            <h3 className="text-lg font-semibold">商品數量</h3>
            <p>每個產品內含一份</p>
          </div>
        </div>
        <div id="buyer-info" className="w-[40dvh] mx-4">
          <h1 className="text-xl  font-bold">購買須知</h1>
          <div className="py-2">
            <h3 className="text-lg font-semibold">個人資料保護</h3>
            <p>
              為保障個資安全，您所訂購的商品之出貨標籤上，我們將會遮蔽部份姓名。如造成您的收貨困擾，請見諒。
            </p>
          </div>
          <div className="py-2">
            <h3 className="text-lg font-semibold">配送時間</h3>
            <p>
              由訂購完成當日起，商品會於3-5個工作天內配送至您指定的收貨地址。
            </p>
          </div>
          <div className="py-2">
            <h3 className="text-lg font-semibold">退貨辦理</h3>
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
