import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProduct, postCart } from "../api/productApi";
import ProductRecomanned from "../components/ProductRecommand";
import products from "../assets/products.json";
import { useCookies } from "react-cookie";

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
  const [cookie, setCookie] = useCookies(["cart"]);
  const navigate = useNavigate();
  const imgURL = import.meta.env.VITE_IMAGE_PATH;

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
      } finally {
        if (cookie.cart.length < 1) {
          setCookie("cart", [cartItem]);
        } else if (cookie.cart.length != 0) {
          const cart: CartItem[] = cookie.cart;
          console.log(cart);
          const index = cart.findIndex(
            (product: { productId: number }) =>
              product.productId === cartItem.productId
          );
          if (index === -1) {
            if (JSON.stringify(cart[0]) === "") {
              setCookie("cart", [cart]);
              console.log(cart);
            } else {
              cart.push(cartItem);
              setCookie("cart", cart);
            }
          } else {
            cart[index].quantity += cartItem.quantity;
            setCookie("cart", cart);
          }
        }
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

  let title, items, url;
  if (category === "gadget") {
    title = "隨身用品";
    items = "gadgets";
    url = "/stores/gadgets";
  } else if (category === "furniture") {
    title = "手工家具";
    items = "furnitures";
    url = "/stores/furnitures";
  } else if (category === "decoration") {
    title = "裝飾擺設";
    items = "decorations";
    url = "/stores/decorations";
  }

  return (
    <div className="flex justify-center items-center">
      <div className="min-h-[70dvh] max-w-[1200px] my-8 flex flex-col justify-center items-center">
        <div
          id="product"
          className="flex flex-col md:flex-row justify-center items-center h-fit mb-4 sm:mb-6 md:mb-8"
        >
          <div
            id="product-img"
            className="flex-1 aspect-4/3 md:aspect-square h-[30dvh] md:h-[40dvh] rounded-2xl overflow-hidden mx-6"
          >
            <img
              className="h-full w-full object-cover"
              src={`${imgURL}/${product?.category}s/${product?.name}.webp`}
            />
          </div>
          <div
            id="product-desc"
            className="flex-1 mx-4 md:mx-8 h-[40dvh] flex flex-col mt-6 sm:mt-0"
          >
            <div className="h-full">
              <h1 className="text-2xl md:text-4xl mx-4 mt-2 md:mt-0 mb-2 md:mb-6 font-bold">
                {product?.title}
              </h1>
              <hr />
              <h3 className="text-xl md:text-2xl font-semibold mx-4 my-2 md:my-4">
                商品簡介：
              </h3>
              <p className="mx-4 my-2 md:my-4 min-h-[50px]">
                {product?.discription}
              </p>
            </div>
            <div className="font-bold text-3xl md:text-4xl mr-4 md:mr-8 mb-6 md:mb-8 text-end">{`$ ${product?.price}`}</div>
            <div
              id="amount&buy"
              className="flex-1 w-full flex items-cneter justify-between mb-1 md:mb-4"
            >
              <div className="mr-2 sm:mx-4">
                <div
                  id="amount"
                  className="w-fit sm:ml-4 flex rounded-md border-[1px] border-midBrown"
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
                  className={`text-red-500 text-sm text-nowrap ${
                    amount === 20 ? "" : "invisible"
                  }`}
                >
                  已達到購買上限
                </div>
              </div>
              <div
                id="pay-or-kart"
                className="flex text-lg font-semibold h-fit"
              >
                <button
                  className="bg-midBrown text-white px-4 py-2 mx-1 sm:mx-2 rounded-md text-nowrap"
                  onClick={addToCart}
                >
                  加入購物車
                </button>
                <button
                  className="bg-white text-midBrown px-4 py-2 mx-1 sm:mx-2 rounded-md border-midBrown border-[2px] text-nowrap"
                  onClick={buyNow}
                >
                  立即購買
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="info"
          className="w-[90dvw] md:w-full flex flex-col md:flex-row justify-center items-start m-4 md:m-8"
        >
          <div id="product-info" className="flex-1 mx-4">
            <h1 className="text-xl font-bold">商品相關資訊</h1>
            <div className="py-2">
              <h3 className="text-lg font-semibold">商品數量</h3>
              <p>每個產品內含一份</p>
            </div>
          </div>
          <div id="buyer-info" className="flex-1 mx-4">
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

        <ProductRecomanned
          key="0"
          title={`${title}`}
          items={`${items}`}
          url={`${url}`}
        />
      </div>
    </div>
  );
}

export default ProductPage;
