import coupons from "../assets/coupon.json";
import couponList from "../assets/couponsList.json";
import CheckoutProcess from "../utils/checkoutProcess";
import { getAssetUrl } from "../utils/imageUtils";
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
import { Card as Surface } from "../components/ui/Card";

function CartItemRow(props: {
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
      <div className="relative flex flex-col items-center md:flex-row w-full bg-white/50 backdrop-blur-sm border border-sand/30 rounded-2xl p-4 gap-4 md:gap-6 shadow-sm mb-4">
        {/* Image */}
        <div className="w-full md:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-sand/20 flex-shrink-0">
          <LazyImage
            src={`${product.category}s/${product.name}.webp`}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            skeletonAnimation="wave"
            onLoad={notifyImageReady}
            onError={notifyImageReady}
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full md:w-auto gap-4">
            <div className="text-center md:text-left">
                <h3 className="font-bold font-serif text-xl text-ink mb-1 line-clamp-2">
                {product.title}
                </h3>
                <p className="text-clay-deep font-mono font-bold">{`$ ${product.price}`}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 md:ml-auto">
                <div className="flex items-center gap-2 bg-white rounded-full border border-sand/30 p-1 shadow-sm">
                    <button
                        onClick={() => minus(product.id)}
                        disabled={amount === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sand/20 disabled:opacity-30 transition-colors text-ink font-bold"
                    >
                        -
                    </button>
                    <span className="w-8 text-center font-bold text-ink">{amount}</span>
                    <button
                        onClick={() => add(product.id)}
                        disabled={amount === 10}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sand/20 disabled:opacity-30 transition-colors text-ink font-bold"
                    >
                        +
                    </button>
                </div>
                
                <div className="text-lg font-bold text-ink w-24 text-right hidden lg:block">
                     ${product.price * amount}
                </div>

                <button
                    onClick={() => deleteItem(product.id, product.title)}
                    className="p-2 hover:bg-red-50 rounded-full group transition-colors"
                >
                    <img className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" src={getAssetUrl("trash-can.svg")} alt="Remove" />
                </button>
            </div>
        </div>
      </div>
    );
}

function ShoppingCart() {
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
    <div className="section min-h-screen pb-20">
      <CheckoutProcess step={1} />
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mt-12">
        {/* Cart Items List */}
        <div id="items" className="flex-[2] w-full">
          <h1 className="text-3xl font-bold font-serif text-ink mb-6 border-b border-sand/30 pb-4">購買品項</h1>
          {cartItems.length < 1 ? (
            <Surface className="p-12 text-center" variant="glass">
              <h1 className="text-xl font-bold text-ink/70">購物車中沒有商品哦</h1>
              <p className="text-sm text-ink/50 mt-2">
                先去商店逛逛吧！
              </p>
              <Link to="/stores" className="inline-block mt-6 px-6 py-2 bg-clay text-paper rounded-full hover:bg-clay-deep transition-colors">
                前往商店
              </Link>
            </Surface>
          ) : (
            cartItems.map((item, index) => (
              <CartItemRow
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

          {/* Coupons Area */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-serif text-ink mb-6">優惠券</h2>
            
            {/* Input Area */}
            <Surface className="flex flex-wrap gap-2 p-4 items-center mb-8 bg-paper/50" variant="glass">
              <input
                className="flex-1 p-3 rounded-lg border border-sand/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-clay/50 transition-all font-mono placeholder:text-ink/30"
                placeholder="請輸入優惠碼"
                value={applyCouponCode}
                onChange={(e) => setApplyCouponCode(e.target.value)}
              />
              <button
                className="px-6 py-3 bg-clay text-paper font-bold rounded-lg hover:bg-clay-deep transition-colors shadow-sm"
                onClick={() => checkCoupon(applyCouponCode)}
              >
                套用
              </button>
              <button
                className="px-6 py-3 bg-white text-ink font-bold rounded-lg hover:bg-sand/20 border border-sand/30 transition-colors"
                onClick={resetCouponInput}
              >
                取消
              </button>
            </Surface>

            {/* Available Coupons List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {avaliableCoupons.map((coupon) => {
                if (!coupon.applied) {
                  return (
                    <Surface key={coupon.id} className="p-4 flex flex-col justify-between gap-4 border border-dashed border-clay/30 hover:border-clay transition-colors group bg-paper/30" variant="flat">
                        <div>
                             <h4 className="font-bold text-ink">{coupon.name}</h4>
                             <p className="text-sm text-ink/60">到期日: {coupon.expirement}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                             <span className="font-mono text-xl font-bold text-clay-deep">-${coupon.discount}</span>
                             <button
                                className="px-4 py-1.5 text-sm bg-white border border-clay text-clay-deep rounded-full hover:bg-clay hover:text-white transition-colors"
                                onClick={() => typeCoupon(coupon.code)}
                            >
                                選擇
                            </button>
                        </div>
                    </Surface>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Sticky Summary */}
        <div className="w-full lg:w-[350px] lg:sticky lg:top-24 h-fit">
            <Surface className="p-6 space-y-6" variant="glass">
                <h1 className="font-bold font-serif text-2xl text-clay-deep border-b border-sand/20 pb-4">購買明細</h1>
                <div className="space-y-3 text-ink/80">
                    <div className="flex justify-between">
                    <span>商品原價</span>
                    <span className="font-mono">{`NT$ ${subtotal}`}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                    <span>折扣</span>
                    <span className="font-mono">{`- NT$ ${discount}`}</span>
                    </div>
                    <div className="flex justify-between text-clay-deep">
                    <span>優惠券</span>
                    <span className="font-mono">{`- NT$ ${couponDiscount}`}</span>
                    </div>
                    
                    {/* Applied Coupons Tags */}
                    {appliedCoupon.length > 0 && <div className="pt-2 space-y-2 border-t border-sand/20 mt-2">
                        {appliedCoupon.map((couponId) => {
                            const applied = couponList.find((c) => c.id === couponId);
                            if (!applied) return null;
                            return (
                                <div key={couponId} className="flex justify-between text-xs bg-clay/10 p-2 rounded-lg text-clay-deep">
                                    <span>{applied.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono">-${applied.discount}</span>
                                        <button onClick={() => cancelApplied(applied.id)} className="hover:text-red-500 font-bold px-1">✕</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div>

                <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-sand/30 text-xl font-bold text-ink">
                    <span>結帳金額</span>
                    <span>NT$ {total}</span>
                </div>
                
                <Link to="/checkout" className="block">
                    <button className="w-full py-4 bg-clay-deep text-paper font-bold text-lg rounded-xl hover:bg-ink transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                        前往結帳
                    </button>
                </Link>
            </Surface>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
