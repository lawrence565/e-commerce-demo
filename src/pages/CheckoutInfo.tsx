import { useEffect, useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, ATM } from "../components/PayMethod";
import { getCart, postOrder } from "../api/productApi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CheckoutProcess from "../utils/checkoutProcess";
import taiwanData from "../assets/taiwan.json";
import "../style/CheckInfo.scss";
import { useToast } from "../context/ToastContext";

import { CardInfo, ATMInfo, CartItem, Order } from "../types";

type AddressData = {
  CityName: string;
  CityEngName: string;
  AreaList: {
    ZipCode: string;
    AreaName: string;
    AreaEngName: string;
    RoadList: {
      RoadName: string;
      RoadEngName: string;
    }[];
  }[];
};

// Zod 驗證 Schema
const orderInfoSchema = z.object({
  recipient: z.object({
    name: z
      .string()
      .min(2, "姓名至少需要 2 個字")
      .max(50, "姓名不能超過 50 個字"),
    phone: z.string().regex(/^09\d{8}$/, "請輸入有效的手機號碼 (09xxxxxxxx)"),
    email: z.string().email("請輸入有效的電子郵件地址"),
  }),
  shippment: z.object({
    city: z.string().min(1, "請選擇縣市"),
    district: z.string().min(1, "請選擇區域"),
    road: z.string().min(1, "請選擇路名"),
    detail: z
      .string()
      .min(1, "請輸入詳細地址")
      .max(100, "地址不能超過 100 個字"),
  }),
  comment: z.string().max(500, "備註不能超過 500 個字").optional(),
});

type OrderInfo = z.infer<typeof orderInfoSchema> & {
  paymentInfo?: CardInfo | ATMInfo;
};

import { useCart } from "../context/useCart";

function CheckoutInfo() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [payMethod, setPayMethod] = useState<string>();
  const [paymentInfo, setPaymentInfo] = useState<CardInfo | ATMInfo>();
  const [addressData, setAddressData] = useState<AddressData[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["cart", "order"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderInfo>({
    resolver: zodResolver(orderInfoSchema),
    mode: "onBlur",
    defaultValues: {
      recipient: {
        name: "",
        phone: "",
        email: "",
      },
      shippment: {
        city: "",
        district: "",
        road: "",
        detail: "",
      },
      comment: "",
    },
  });

  const { total, subtotal, discount, couponDiscount } = useCart();
  const watchCity = useWatch({
    control,
    name: "shippment.city",
  });
  const watchDistrict = useWatch({
    control,
    name: "shippment.district",
  });

  const getItem = useCallback(async () => {
    let cart: CartItem[];
    try {
      cart = await getCart();
    } catch {
      cart = cookies.cart;
    }
    return cart;
  }, [cookies.cart]);

  function handlePayMethod(data: CardInfo | ATMInfo) {
    try {
      setPaymentInfo(data);
      showToast("成功儲存付款資訊", "success");
    } catch (e) {
      console.log(e);
    }
  }

  function handlePayment(method: string) {
    if (payMethod === method) {
      setPayMethod("");
    } else {
      setPayMethod(method);
    }
  }

  const handleCheckout = async (data: OrderInfo) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!paymentInfo) {
      showToast("請選擇並輸入付款資訊", "warning");
      setIsSubmitting(false);
      return;
    }

    try {
      const products = await getItem();
      console.log(products);

      const order: Order = {
        products: products,
        price: total,
        paymentInfo: paymentInfo,
        recipient: data.recipient,
        shippment: data.shippment,
        comment: data.comment || "",
      };
      console.log("order: ", order);

      const responce = await postOrder(order);
      if (responce) {
        removeCookie("cart");
        showToast("訂單建立成功！", "success");
      }

      setCookie("order", order);
      removeCookie("cart");
      navigate("/finishOrder");
    } catch (e) {
      showToast("建立訂單失敗，請稍後再試", "error");
      console.log("建立訂單失敗", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setAddressData(taiwanData);
    getItem();
  }, [getItem]);

  return (
    <>
      <div className="section">
        <CheckoutProcess step={2} />
        <div className="w-full flex flex-col md:flex-row items-start gap-8 mt-6">
          <div
            id="CheckoutInfo"
            className="flex-[3] flex flex-col"
          >
            <div id="payment">
              <div className="surface-card p-6 md:p-8">
                <h1 className="text-3xl font-semibold mb-4">輸入購買資料</h1>
              <div className="mt-4 w-full">
                <h2 className="text-2xl font-semibold mb-2">付款方式</h2>
                <form id="payMethod">
                  <label className="flex items-center w-fit">
                    <input
                      type="radio"
                      id="credit-card"
                      checked={payMethod === "creditCard"}
                      onChange={() => handlePayment("creditCard")}
                    />
                    <p className="paylabel">信用卡</p>
                  </label>

                  {payMethod === "creditCard" && (
                    <CreditCard handlePaymentMethod={handlePayMethod} />
                  )}

                  <label className="flex items-center w-fit">
                    <input
                      type="radio"
                      id="ATM"
                      checked={payMethod === "ATM"}
                      onChange={() => handlePayment("ATM")}
                    />
                    <p className="paylabel">ATM 轉帳</p>
                  </label>

                  {payMethod === "ATM" && (
                    <ATM handlePaymentMethod={handlePayMethod} />
                  )}

                  <label className="flex items-center w-fit">
                    <input
                      type="radio"
                      id="apple-pay"
                      checked={payMethod === "ApplePay"}
                      onChange={() => handlePayment("ApplePay")}
                    />
                    <p className="paylabel">Apple Pay</p>
                  </label>
                  <label className="flex items-center w-fit">
                    <input
                      type="radio"
                      id="line-pay"
                      checked={payMethod === "LinePay"}
                      onChange={() => handlePayment("LinePay")}
                    />
                    <p className="paylabel">Line Pay</p>
                  </label>
                </form>
              </div>
              </div>
            </div>

            <div id="shippment" className="mt-6 w-full surface-card p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">寄送資訊</h2>
              <form className="w-full space-y-4" onSubmit={handleSubmit(handleCheckout)}>
                <div className="flex">
                  <div className="flex-1 flex flex-col mr-2">
                    <label className="inline-block mr-2" htmlFor="name">
                      <span className="text-red-500">*</span>
                      收貨人姓名
                    </label>
                    <input
                      id="name"
                      placeholder="請輸入收件人姓名"
                      className={`w-full border-2 ${errors.recipient?.name ? "border-red-500" : "border-midBrown"} rounded-md bg-gray-100 my-2 pl-2`}
                      {...register("recipient.name")}
                    />
                    {errors.recipient?.name && (
                      <span className="text-red-500 text-sm">
                        {errors.recipient.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="inline-block mr-2 " htmlFor="phone">
                      <span className="text-red-500">*</span>
                      收貨人電話
                    </label>
                    <input
                      id="phone"
                      placeholder="請輸入電話號碼"
                      className={`w-full border-2 ${errors.recipient?.phone ? "border-red-500" : "border-midBrown"} rounded-md bg-gray-100 my-2 pl-2`}
                      {...register("recipient.phone")}
                    />
                    {errors.recipient?.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.recipient.phone.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="inline-block mr-2" htmlFor="email">
                    <span className="text-red-500">*</span>
                    收貨人電子郵件
                  </label>
                  <input
                    id="email"
                    placeholder="請輸入電子郵件"
                    className={`w-full border-2 ${errors.recipient?.email ? "border-red-500" : "border-midBrown"} rounded-md bg-gray-100 my-2 pl-2`}
                    {...register("recipient.email")}
                  />
                  {errors.recipient?.email && (
                    <span className="text-red-500 text-sm">
                      {errors.recipient.email.message}
                    </span>
                  )}
                </div>

                <div id="address" className="mt-2">
                  <div className="flex mb-2">
                    <div className="flex-1 flex flex-col">
                      <label className="inline-block mr-2 mb-2 ">
                        <span className="text-red-500">*</span>縣/市
                      </label>
                      <select
                        className={`h-[40px] border-2 ${errors.shippment?.city ? "border-red-500" : "border-midBrown"} mr-2 md:pl-2 rounded-md bg-gray-100`}
                        {...register("shippment.city")}
                      >
                        <option value="">請選擇縣市</option>
                        {addressData?.map((city, index) => {
                          return (
                            <option key={index} value={city.CityName}>
                              {city.CityName}
                            </option>
                          );
                        })}
                      </select>
                      {errors.shippment?.city && (
                        <span className="text-red-500 text-sm">
                          {errors.shippment.city.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="inline-block mr-2 mb-2">
                        <span className="text-red-500">*</span>鄉鎮市區
                      </label>
                      <select
                        className={`h-[40px] border-2 ${errors.shippment?.district ? "border-red-500" : "border-midBrown"} mr-2 md:pl-2 rounded-md bg-gray-100`}
                        {...register("shippment.district")}
                      >
                        <option value="">請選擇鄉鎮市區</option>
                        {addressData
                          .find((city) => city.CityName === watchCity)
                          ?.AreaList?.map((area) => {
                            return (
                              <option
                                value={area.AreaName}
                                key={area.AreaEngName}
                              >
                                {area.AreaName}
                              </option>
                            );
                          })}
                      </select>
                      {errors.shippment?.district && (
                        <span className="text-red-500 text-sm">
                          {errors.shippment.district.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="inline-block mr-2 md:pl-2 mb-2">
                        <span className="text-red-500">*</span>街道名
                      </label>
                      <select
                        className={`h-[40px] border-2 ${errors.shippment?.road ? "border-red-500" : "border-midBrown"} rounded-md bg-gray-100`}
                        {...register("shippment.road")}
                      >
                        <option value="">請選擇路名</option>
                        {addressData
                          .find((city) => city.CityName === watchCity)
                          ?.AreaList?.find(
                            (area) => area.AreaName === watchDistrict,
                          )
                          ?.RoadList.map((road) => {
                            return (
                              <option value={road.RoadName} key={road.RoadName}>
                                {road.RoadName}
                              </option>
                            );
                          })}
                      </select>
                      {errors.shippment?.road && (
                        <span className="text-red-500 text-sm">
                          {errors.shippment.road.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="inline-block mr-2 mb-2"
                      htmlFor="addressDetail"
                    >
                      <span className="text-red-500">*</span>
                      詳細地址
                    </label>
                    <input
                      type="text"
                      id="addressDetail"
                      placeholder="請輸入地址"
                      className={`w-full border-2 ${errors.shippment?.detail ? "border-red-500" : "border-midBrown"} rounded-md bg-gray-100 h-[40px] pl-2`}
                      {...register("shippment.detail")}
                    />
                    {errors.shippment?.detail && (
                      <span className="text-red-500 text-sm">
                        {errors.shippment.detail.message}
                      </span>
                    )}
                  </div>
                </div>

                <div id="comment" className="flex flex-col mt-4">
                  <label
                    className="inline-block mr-2 mb-2"
                    htmlFor="orderComment"
                  >
                    訂單備註
                  </label>
                  <textarea
                    id="orderComment"
                    placeholder="可以留下您的需求或備註"
                    className="w-full border-2 border-midBrown rounded-md bg-gray-100 h-[120px] pl-2 pt-1"
                    {...register("comment")}
                  />
                  {errors.comment && (
                    <span className="text-red-500 text-sm">
                      {errors.comment.message}
                    </span>
                  )}
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`cta-primary ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <h1 className="text-lg">
                      {isSubmitting ? "處理中..." : "完成訂單"}
                    </h1>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div id="subtotal" className="surface-card p-6 w-full md:max-w-[320px]">
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
            </div>
            <div className="flex justify-between items-center mt-6 text-lg font-semibold">
              <span>結帳金額</span>
              <span>{subtotal - couponDiscount - discount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutInfo;
