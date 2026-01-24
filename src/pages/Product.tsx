import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProduct, postCart } from "../api/productApi";
import { useSpinnerStore } from "../store/appStore";
import ProductRecomanned from "../components/ProductRecommand";
import products from "../assets/products.json";
import { useCookies } from "react-cookie";
import Modal from "../components/Modal";
import { Product, CartItem } from "../types";
import { LazyImage } from "../components/LazyImage";

function ProductPage() {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState<Product>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const { showSpinner, hideSpinner } = useSpinnerStore();
  const [cookie, setCookie] = useCookies(["cart"]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      if (!category || !itemId) return;
      setProduct(undefined);
      showSpinner();
      try {
        const data = await getSingleProduct(category, parseInt(itemId));
        if (isMounted && data) {
          setProduct(data);
          setIsImageLoading(true);
        }
        if (!data) {
          hideSpinner();
        }
      } catch (e) {
        console.log("Here's some problem: " + e);
        const fallback = products.find((product) => {
          return product.id === parseInt(itemId);
        });
        if (isMounted && fallback) {
          setProduct(fallback);
          setIsImageLoading(true);
        } else {
          hideSpinner();
        }
      }
    };
    fetchProduct();
    return () => {
      isMounted = false;
      hideSpinner();
    };
  }, [category, itemId, hideSpinner, showSpinner]);

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
              product.productId === cartItem.productId,
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
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProblemModal = () => {
    setIsProblemModalOpen(false);
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
        setIsProblemModalOpen(true);
      }
    }
  };

  const add = () => {
    setAmount((prev) => Math.min(prev + 1, 20));
  };

  const minus = () => {
    setAmount((prev) => Math.max(prev - 1, 1));
  };

  const handleImageLoad = () => {
    if (isImageLoading) {
      setIsImageLoading(false);
    }
    hideSpinner();
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    hideSpinner();
  };

  const categoryMeta: Record<
    string,
    { title: string; items: string; url: string }
  > = {
    gadget: { title: "隨身用品", items: "gadgets", url: "/stores/gadgets" },
    furniture: {
      title: "手工家具",
      items: "furnitures",
      url: "/stores/furnitures",
    },
    decoration: {
      title: "裝飾擺設",
      items: "decorations",
      url: "/stores/decorations",
    },
  };

  const relatedCategory = category ? categoryMeta[category] : undefined;

  if (!category || !itemId) {
    return (
      <div className="h-[100dvh] w-[100dvw] font-bold bg-midBrown text-white">
        Invalid product or category
      </div>
    );
  }

  return (
    <div className="section">
      <div className="flex flex-col gap-10">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          type="success"
          title="加入購物車"
        >
          <p>已成功加入購物車</p>
        </Modal>
        <Modal
          isOpen={isProblemModalOpen}
          onClose={handleProblemModal}
          type="error"
          title="發生錯誤"
        >
          <p>出現某些錯誤，請稍後再試</p>
        </Modal>
        <div className="surface-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full">
            {product && (
              <LazyImage
                key={`/${product.category}s/${product.name}.webp`}
                className="h-full w-full object-cover rounded-2xl"
                src={`/${product.category}s/${product.name}.webp`}
                alt={product.title ?? "商品圖片"}
                width={400}
                height={300}
                fill
                skeletonAnimation="wave"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
          <div className="flex-1 w-full space-y-6">
            <div>
              <span className="chip">人氣商品</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-3">
                {product?.title}
              </h1>
              <p className="text-base text-black/70 mt-3">
                {product?.description}
              </p>
            </div>
            <div className="text-3xl font-bold text-right">{`$ ${
              product?.price ?? "XXXXX"
            }`}</div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="nav-pill w-10 h-10 flex items-center justify-center"
                  onClick={minus}
                  disabled={amount === 1}
                >
                  &#10094;
                </button>
                <div className="nav-pill w-12 h-10 flex items-center justify-center font-semibold">
                  {amount}
                </div>
                <button
                  className="nav-pill w-10 h-10 flex items-center justify-center"
                  onClick={add}
                  disabled={amount === 20}
                >
                  &#10095;
                </button>
                <span
                  className={`text-xs text-red-500 ${
                    amount === 20 ? "" : "invisible"
                  }`}
                >
                  已達到購買上限
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="cta-primary" onClick={addToCart}>
                  加入購物車
                </button>
                <button className="cta-secondary" onClick={buyNow}>
                  立即購買
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="surface-card p-6">
            <h2 className="text-xl font-semibold mb-4">商品相關資訊</h2>
            <div className="space-y-3 text-sm text-black/70">
              <div>
                <h3 className="text-base font-semibold text-black">
                  商品數量
                </h3>
                <p>每個產品內含一份</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-black">
                  工藝材質
                </h3>
                <p>嚴選台灣職人材料，手工製作，細節可見。</p>
              </div>
            </div>
          </div>
          <div className="surface-card p-6">
            <h2 className="text-xl font-semibold mb-4">購買須知</h2>
            <div className="space-y-3 text-sm text-black/70">
              <div>
                <h3 className="text-base font-semibold text-black">
                  個人資料保護
                </h3>
                <p>
                  為保障個資安全，出貨標籤會遮蔽部分姓名，如造成不便請見諒。
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-black">
                  配送時間
                </h3>
                <p>訂購完成後 3-5 個工作天內送達指定地址。</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-black">
                  退貨辦理
                </h3>
                <p>
                  收貨後 24 小時內如有問題請透過官方 Line 聯絡客服。
                </p>
              </div>
            </div>
          </div>
        </div>

        {relatedCategory && (
          <div className="surface-card p-6">
            <ProductRecomanned
              key="0"
              title={relatedCategory.title}
              category={relatedCategory.items}
              url={relatedCategory.url}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
