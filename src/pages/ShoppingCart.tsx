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
import { useState, useRef, useEffect } from "react";
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

import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";
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
}): JSX.Element | undefined {
  const item = props.item;
  const updateSubtotal = props.updateSubtotal;
  const getItem = props.getItem;
  const onImageReady = props.onImageReady;
  const [amount, setAmount] = useState(item.quantity);
  const [product, setProduct] = useState<Product | null>(null);
  const [cookie, setCookie] = useCookies(["cart"]);
  const { showToast } = useToast();
  const hasNotified = useRef(false);

  const notifyImageReady = () => {
    if (hasNotified.current) return;
    hasNotified.current = true;
    onImageReady?.();
  };

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
  }, [item]);

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
      console.log("deleting item " + name);
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
  }, [cookie.cart.length]);

  useEffect(() => {
    const newDiscount = calculateDiscount(subtotal);
    setDiscount(newDiscount);
    setTotal(calculateTotal(subtotal, newDiscount, couponDiscount));
  }, [subtotal, couponDiscount]);

  const getItem = async () => {
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
    } catch (e) {
      const fallbackItems = cookie.cart ?? [];
      setCartitems(fallbackItems);
      setPendingImages(fallbackItems.length);
      subtotals.current = new Array(fallbackItems.length).fill(0);
      setSubtotal(0);
    }
  };

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
    <div className="flex flex-col items-center justify-start my-8 w-full min-h-[70dvh]">
      {<CheckoutProcess step={1} />}
      <div className="flex flex-col md:flex-row items-start justify-between my-8 max-w-[1200px] h-fit w-full">
        <div
          id="items"
          className="flex-[3] min-w-[250px] md:min-w-[450px] lg:min-w-[600px] w-full max-w-[90dvw] md:max-w-[40dvw] lg:max-w-[60dvw] flex flex-col justify-start ml-4 mr-4 md:mr-8"
        >
          <h1 className="text-4xl font-bold text-midBrown mb-8">購買品項</h1>
          {cartItems.length < 1 ? (
            <div className="flex items-center text-center h-[20dvw] w-full">
              <h1 className="text-xl font-semibold w-full">
                購物車中沒有商品哦
              </h1>
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
          className="flex-1 min-w-[300px] w-full max-w-[90dvw] md:max-w-[25dvw] lg:max-w-[20dvw] rounded-lg bg-midBrown p-6 m-4 h-fit"
        >
          <h1 className="font-semibold text-3xl text-white mb-4 lg:max-w-[15dvw] ml-2">
            購買明細
          </h1>
          <hr />
          <div className="flex flex-col justify-center items-center my-4">
            <div className="subtotal">
              <h3>商品原價：</h3>
              <h3>{`NT$ ${subtotal}`}</h3>
            </div>
            <div className="subtotal">
              <h3>折扣：</h3>
              <h3>{`- NT$ ${discount}`}</h3>
            </div>
            <div className="subtotal">
              <h3>優惠券：</h3>
              <h3>{`- NT$ ${couponDiscount}`}</h3>
            </div>
            <div className="w-4/5 mx-4">
              {appliedCoupon.map((couponId, index) => {
                const applied = couponList.find(
                  (coupon) => coupon.id === couponId,
                );
                if (applied) {
                  return (
                    <div className="w-full flex text-white justify-between">
                      <p key={index}>{applied.name}</p>
                      <div className="flex">
                        <p key={index + appliedCoupon.length}>
                          {`- ${applied.discount}`}
                        </p>
                        <div className="ml-4 bg-white text-midBrown rounded-lg p-[2px]">
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
          <hr />
          <div className="flex justify-center w-9/10 m-2">
            <div className="flex text-white w-full justify-between max-w-[350px]">
              <h1 className="font-semibold text-2xl">結帳金額：</h1>
              <h1 className="text-end text-2xl">{total}</h1>
            </div>
          </div>
          <div className="w-3/5 h-fit bg-white p-2 ml-[20%] mt-4 text-end rounded-md flex justify-center">
            <Link to="/checkout">
              <button className="w-full h-full font-bold text-midBrown">
                結帳
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div id="coupon" className="w-full lg:max-w-[1200px]">
        <div className="m-4 w-fit rounded-lg overflow-hidden  border-[2px] border-midBrown">
          <input
            className="w-[200px] p-2 bg-gray-200"
            placeholder="請輸入優惠碼"
            value={applyCouponCode}
            onChange={(e) => setApplyCouponCode(e.target.value)}
          />
          <button
            className="bg-midBrown text-white px-4 py-2"
            onClick={() => checkCoupon(applyCouponCode)}
          >
            套用
          </button>
          <button
            className="bg-white text-midBrown px-4 py-2"
            onClick={resetCouponInput}
          >
            取消
          </button>
        </div>

        <div id="avaliable" className="m-4">
          <table className="w-full max-w-[800px]">
            <thead className="w-full bg-midBrown">
              <tr className="w-full text-white">
                <th className="w-1/4 text-lg font-semibold py-[2px]">名稱</th>
                <th className="w-1/5 text-lg font-semibold py-[2px]">折扣</th>
                <th className="w-1/5 text-lg font-semibold py-[2px]">到期日</th>
                <th className="w-fit text-lg font-semibold py-[2px]">選擇</th>
              </tr>
            </thead>
            <tbody>
              {avaliableCoupons.map((coupon) => {
                if (!coupon.applied) {
                  return (
                    <tr
                      className="w-full text-center h-fit mb-2"
                      key={coupon.id}
                    >
                      <td className="w-2/5 text-start text-base md:text-lg pl-2 py-2">
                        {coupon.name}
                      </td>
                      <td className="w-1/5 text-base md:text-lg py-2">
                        {coupon.discount}
                      </td>
                      <td className="w-1/5 text-base md:text-lg py-2">
                        {coupon.expirement}
                      </td>
                      <td className="w-fit">
                        <button
                          className="px-2 rounded-md border-[1px] border-midBrown"
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
