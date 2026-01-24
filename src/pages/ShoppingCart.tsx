import coupons from "../assets/coupon.json";
import couponList from "../assets/couponsList.json";
import CheckoutProcess from "../utils/checkoutProcess";
import trashCan from "/trash-can.svg";
import {
  getSingleProduct,
  getCart,
  deleteCartItem,
  editCartItem,
  syncCart,
} from "../api/productApi";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactElement,
} from "react";
import { Link } from "react-router-dom";
import "../style/CartStyle.scss";
import { useCookies } from "react-cookie";
import { useSpinnerStore } from "../store/appStore";
import { Product, CartItem } from "../types";
import { calculateDiscount, calculateTotal } from "../utils/cartUtils";

type Coupon = {
  id: number;
  name: string;
  discount: number;
  code: string;
  expirement: string;
  applied: boolean;
};

import { useCart } from "../context/useCart";
import { useToast } from "../context/ToastContext";
import { LazyImage } from "../components/LazyImage";

// type applyCoupon = {
//   id: number;
//   coupon: number;
// };

function Card(props: {
  item: CartItem;
  getItem: () => void;
  updateSubtotal: (subtotal: number) => void;
  onImageReady?: () => void;
}): ReactElement | undefined {
  const item = props.item;
  const updateSubtotal = props.updateSubtotal;
  const getItem = props.getItem;
  const onImageReady = props.onImageReady;
  const [amount, setAmount] = useState(item.quantity);
  const [product, setProduct] = useState<Product | null>(null);
  const [cookie, setCookie] = useCookies(["cart"]);
  const { showToast } = useToast();
  const hasNotified = useRef(false);

  const notifyImageReady = useCallback(() => {
    if (hasNotified.current) return;
    hasNotified.current = true;
    onImageReady?.();
  }, [onImageReady]);

  useEffect(() => {
    hasNotified.current = false;
  }, [item.productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getSingleProduct(
          item.category,
          item.productId,
        ).then((data) => {
          return data;
        });
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          notifyImageReady();
        }
      } catch (e) {
        console.log(e);
        notifyImageReady();
      }
    };
    fetchProduct();
  }, [item.category, item.productId, notifyImageReady]);

  useEffect(() => {
    updateSubtotal(amount * (product?.price ?? 0));
  }, [item, amount, product, updateSubtotal]);

  async function add(id: number) {
    const newAmount = amount + 1;
    setAmount(newAmount);
    await editCartItem(id, newAmount);

    const cart = cookie.cart;
    const index = cart.findIndex(
      (product: CartItem) => product.productId === id,
    );
    if (index != -1) {
      cart[index].quantity += 1;
      setCookie("cart", cart);
    }
  }

  async function minus(id: number) {
    const newAmount = amount - 1;
    setAmount(newAmount);
    await editCartItem(id, newAmount);
    const cart = cookie.cart;
    const index = cart.findIndex(
      (product: CartItem) => product.productId === id,
    );
    if (index != -1) {
      cart[index].quantity -= 1;
      setCookie("cart", cart);
    }
  }

  const deleteItem = async (id: number, name: string) => {
    try {
      await deleteCartItem(id);
      getItem();
      showToast(`${name}已從購物車移除`, "success");
    } catch (error) {
      console.error("deleting item " + name, error);
    } finally {
      const cart = cookie.cart;
      try {
        const deleteIndex = cart.findIndex(
          (item: CartItem) => item.productId === id,
        );
        if (deleteIndex != -1) {
          console.log("Can't find target");
          cart.splice(deleteIndex, 1);
        }
        getItem();
        setCookie("cart", cart);
      } catch (e) {
        console.error(`移除${name}商品失敗`, e);
      }
    }
  };

  if (product != null)
    return (
      <div className="relative grid grid-cols-5 md:grid-cols-9 items-center w-full border-b-2 border-midBrown md:min-w-[600px] max-w-[90dvw] lg:max-w-[60dvw] p-4">
        <div className="col-span-2 h-fit aspect-4/3 overflow-hidden rounded-md">
          <LazyImage
            src={`/${product.category}s/${product.name}.webp`}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            skeletonAnimation="wave"
            onLoad={notifyImageReady}
            onError={notifyImageReady}
          />
        </div>
        <div className="col-span-3 flex justify-items-center mr-8 ml-4">
          <div className="h-fit w-full">
            <h3 className="font-semibold text-2xl mb-4 break-words whitespace-normal line-clamp-2">
              {product.title}
            </h3>
            <p className="text-lg">{`$ ${product.price}`}</p>
          </div>
        </div>
        <div className="col-span-3 md:col-span-2 mt-4 h-fit flex justify-start md:justify-center items-center">
          <div
            id="amount"
            className="w-fit md:ml-4 flex rounded-md border-[1px] border-midBrown"
          >
            <div className="w-10 md:w-8 flex justify-center items-center p-2 text-midBrown cursor-pointer">
              <button
                onClick={() => minus(product.id)}
                disabled={amount === 1}
                className="h-full w-full"
              >
                &#10094;
              </button>
            </div>
            <div className="w-14 md:w-12 flex justify-center items-center p-2 bg-midBrown text-white text-xl md:text-lg">
              {amount}
            </div>
            <div className="w-10 md:w-8 flex justify-center items-center p-2 text-midBrown cursor-pointer">
              <button
                onClick={() => add(product.id)}
                disabled={amount === 10}
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
        <div className="col-span-2 md:col-span-1 mt-4 w-full text-nowrap ml-4 text-xl font-semibold">
          {`NTS ${product.price * amount}`}
        </div>

        <button
          id="delete"
          className="absolute right-0 top-[5%]"
          onClick={() => deleteItem(product.id, product.title)}
        >
          <img className="h-[1.8rem] ml-2" src={trashCan} />
        </button>
      </div>
    );
}

function ShopppingKart() {
  const subtotals = useRef<number[]>([]);
  const {
    total,
    setTotal,
    subtotal,
    setSubtotal,
    discount,
    setDiscount,
    couponDiscount,
    setCouponDiscount,
  } = useCart();
  const { showToast } = useToast();
  const [applyCouponCode, setApplyCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<number[]>([]);

  const [avaliableCoupons, setAvaliableCoupons] = useState<Coupon[]>(
    coupons.map((coupon) => ({
      ...coupon,
      applied: false,
    })),
  );
  const [cookie, setCookie] = useCookies(["cart"]);
  const [cartItems, setCartitems] = useState<CartItem[]>([]);
  const { showSpinner, hideSpinner } = useSpinnerStore();
  const [isCartReady, setIsCartReady] = useState(false);
  const [pendingImages, setPendingImages] = useState(0);

  const getItem = useCallback(async () => {
    try {
      const mergedCart = await syncCart(cookie.cart);
      if (mergedCart && mergedCart.length !== cookie.cart.length) {
        setCookie("cart", mergedCart);
      }
      const cart: CartItem[] = await getCart();
      setCartitems(cart);
      setPendingImages(cart.length);
      subtotals.current = new Array(cart.length).fill(0);
      setSubtotal(0);
    } catch (error) {
      console.error("Failed to sync cart", error);
      const fallbackItems = cookie.cart ?? [];
      setCartitems(fallbackItems);
      setPendingImages(fallbackItems.length);
      subtotals.current = new Array(fallbackItems.length).fill(0);
      setSubtotal(0);
    }
  }, [cookie.cart, setCookie, setSubtotal]);

  useEffect(() => {
    const fetchData = async () => {
      showSpinner();
      setIsCartReady(false);
      setPendingImages(0);
      await getItem();
      if (cookie.cart === undefined) {
        setCookie("cart", [], { path: "/" });
      }
      setIsCartReady(true);
    };

    fetchData();
  }, [cookie.cart, getItem, setCookie, showSpinner]);

  useEffect(() => {
    const newDiscount = calculateDiscount(subtotal);
    setDiscount(newDiscount);
    setTotal(calculateTotal(subtotal, newDiscount, couponDiscount));
  }, [subtotal, couponDiscount, setDiscount, setTotal]);

  const updateSubtotal = (index: number, newSubtotal: number) => {
    subtotals.current[index] = newSubtotal;
    setSubtotal(subtotals.current.reduce((acc, curr) => acc + curr, 0));
  };

  useEffect(() => {
    if (!isCartReady) return;
    if (pendingImages === 0) {
      hideSpinner();
    }
  }, [pendingImages, isCartReady, hideSpinner]);

  function typeCoupon(couponCode: string) {
    setApplyCouponCode(couponCode);
  }

  function cancelApplied(couponId: number) {
    const appliedOneIndex = avaliableCoupons.findIndex(
      (coupon) => coupon.id === couponId,
    );
    if (appliedOneIndex !== -1) {
      const appliedOne = avaliableCoupons[appliedOneIndex];
      setAppliedCoupon((prev) => prev.filter((id) => id !== appliedOne.id));
      setCouponDiscount(Math.max(couponDiscount - appliedOne.discount, 0));
      setAvaliableCoupons((prevCoupons) => {
        return prevCoupons.map((coupon) =>
          coupon.id === couponId ? { ...coupon, applied: false } : coupon,
        );
      });
    }
  }

  function checkCoupon(couponCode: string) {
    const foundCoupon = couponList.find((coupon) => coupon.code === couponCode);
    if (foundCoupon) {
      const alreadyExisted = appliedCoupon.includes(foundCoupon.id);
      if (!alreadyExisted) {
        setAppliedCoupon((prev) => [...prev, foundCoupon.id]);
        setCouponDiscount(couponDiscount + foundCoupon.discount);
        setAvaliableCoupons((prevCoupons) => {
          return prevCoupons.map((coupon) =>
            coupon.code === couponCode ? { ...coupon, applied: true } : coupon,
          );
        });
      } else {
        showToast("優惠券已存在", "warning");
      }
    } else {
      showToast("優惠券不存在", "error");
    }
  }

  const resetCouponInput = () => setApplyCouponCode("");

  return (
    <div className="section">
      <CheckoutProcess step={1} />
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mt-6">
        <div
          id="items"
          className="flex-[3] w-full flex flex-col justify-start"
        >
          <h1 className="text-3xl font-bold mb-6">購買品項</h1>
          {cartItems.length < 1 ? (
            <div className="surface-card p-8 text-center">
              <h1 className="text-lg font-semibold">購物車中沒有商品哦</h1>
              <p className="text-sm text-black/60 mt-2">
                先去商店逛逛吧！
              </p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <Card
                key={item.productId}
                item={item}
                getItem={getItem}
                updateSubtotal={(newSubtotal) =>
                  updateSubtotal(index, newSubtotal)
                }
                onImageReady={() =>
                  setPendingImages((prev) => Math.max(prev - 1, 0))
                }
              />
            ))
          )}
        </div>
        <div
          id="subtotal"
          className="surface-card p-6 w-full md:max-w-[320px]"
        >
          <h1 className="font-semibold text-2xl mb-4">購買明細</h1>
          <div className="flex flex-col gap-3 text-sm text-black/70">
            <div className="flex justify-between">
              <span>商品原價</span>
              <span>{`NT$ ${subtotal}`}</span>
            </div>
            <div className="flex justify-between">
              <span>折扣</span>
              <span>{`- NT$ ${discount}`}</span>
            </div>
            <div className="flex justify-between">
              <span>優惠券</span>
              <span>{`- NT$ ${couponDiscount}`}</span>
            </div>
            <div className="space-y-2">
              {appliedCoupon.map((couponId, index) => {
                const applied = couponList.find(
                  (coupon) => coupon.id === couponId,
                );
                if (applied) {
                  return (
                    <div className="w-full flex justify-between text-sm">
                      <p key={index}>{applied.name}</p>
                      <div className="flex">
                        <p key={index + appliedCoupon.length}>
                          {`- ${applied.discount}`}
                        </p>
                        <div className="ml-2 bg-white text-midBrown rounded-lg p-[2px] border">
                          <button onClick={() => cancelApplied(applied.id)}>
                            ✗
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 text-lg font-semibold">
            <span>結帳金額</span>
            <span>{total}</span>
          </div>
          <Link to="/checkout" className="block mt-6">
            <button className="cta-primary w-full">結帳</button>
          </Link>
        </div>
      </div>

      <div id="coupon" className="mt-8">
        <div className="surface-card w-fit overflow-hidden flex flex-wrap gap-0">
          <input
            className="w-[200px] p-2 bg-white/60"
            placeholder="請輸入優惠碼"
            value={applyCouponCode}
            onChange={(e) => setApplyCouponCode(e.target.value)}
          />
          <button
            className="cta-primary rounded-none"
            onClick={() => checkCoupon(applyCouponCode)}
          >
            套用
          </button>
          <button
            className="cta-secondary rounded-none"
            onClick={resetCouponInput}
          >
            取消
          </button>
        </div>

        <div id="avaliable" className="mt-6 surface-card p-4">
          <table className="w-full max-w-[800px] text-sm">
            <thead className="w-full">
              <tr className="w-full text-black/70">
                <th className="w-1/4 text-left font-semibold py-2">名稱</th>
                <th className="w-1/5 text-left font-semibold py-2">折扣</th>
                <th className="w-1/5 text-left font-semibold py-2">到期日</th>
                <th className="w-fit text-left font-semibold py-2">選擇</th>
              </tr>
            </thead>
            <tbody>
              {avaliableCoupons.map((coupon) => {
                if (!coupon.applied) {
                  return (
                    <tr
                      className="w-full border-t border-black/10"
                      key={coupon.id}
                    >
                      <td className="w-2/5 text-start py-3">
                        {coupon.name}
                      </td>
                      <td className="w-1/5 py-3">
                        {coupon.discount}
                      </td>
                      <td className="w-1/5 py-3">
                        {coupon.expirement}
                      </td>
                      <td className="w-fit py-3">
                        <button
                          className="cta-secondary"
                          onClick={() => typeCoupon(coupon.code)}
                        >
                          選擇
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShopppingKart;
