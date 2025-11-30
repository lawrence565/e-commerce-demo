import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CreditCard, ATM } from "../components/PayMethod";
import { getCart, postOrder } from "../api/productApi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CheckoutProcess from "../utils/checkoutProcess";
import taiwanData from "../assets/taiwan.json";
import "../style/CheckInfo.scss";

import {
  CardInfo,
  ATMInfo,
  CartItem,
  ShippmentInfo,
  Recipient,
  Order,
} from "../types";

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

type OrderInfo = {
  recipient: Recipient;
  shippment: ShippmentInfo;
  paymentInfo: CardInfo | ATMInfo;
  comment: string;
};

import { useCart } from "../context/CartContext";

function CheckoutInfo() {
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState<string>();
  const [paymentInfo, setPaymentInfo] = useState<CardInfo | ATMInfo>();
  const [addressData, setAddressData] = useState<AddressData[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["cart", "order"]);
  const { register, control, getValues } = useForm<OrderInfo>({
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
      paymentInfo: paymentInfo,
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

  const getItem = async () => {
    let cart: CartItem[];
    try {
      cart = await getCart();
    } catch (e) {
      cart = cookies.cart;
    }
    return cart;
  };

  function handlePayMethod(data: CardInfo | ATMInfo) {
    try {
      setPaymentInfo(data);
      alert("成功儲存付款資訊");
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

  const handleCheckout = async () => {
    let data: OrderInfo = getValues();
    console.log("Form: ", data);

    await (async () => {
      if (paymentInfo !== undefined && paymentInfo) {
        data.paymentInfo = paymentInfo;
        try {
          const products = await getItem();
          console.log(products);

          const order: Order = {
            products: products,
            price: total,
            paymentInfo: data.paymentInfo,
            recipient: data.recipient,
            shippment: data.shippment,
            comment: data.comment,
          };
          console.log("order: ", order);

          const responce = await postOrder(order);
          if (responce) removeCookie("cart");
        } catch (e) {
          alert("建立訂單失敗");
          console.log("建立訂單失敗", e);
        } finally {
          const order: Order = {
            products: cookies.cart,
            price: total,
            paymentInfo: data.paymentInfo,
            recipient: data.recipient,
            shippment: data.shippment,
            comment: data.comment,
          };
          setCookie("order", order);
        }
      } else {
        alert("請輸入付款資訊");
        return;
      }
    })();

    if (cookies.order.products.length > 0) {
      removeCookie("cart");
      navigate("/finishOrder");
    }
  };

  useEffect(() => {
    setAddressData(taiwanData);
    getItem();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center m-4 md:m-8 ">
        {<CheckoutProcess step={2} />}
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center md:items-start my-4">
          <div
            id="CheckoutInfo"
            className="flex-[3] flex flex-col md:min-w-[500px] lg:min-w-[600px] md:max-w-[40dvw] lg:max-w-[60dvw] md:mr-12"
          >
            <div id="payment">
              <div className="my-4">
                <h1 className="text-3xl font-semibold mb-2">輸入購買資料</h1>
                <hr />
              </div>
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

            <div id="shippment" className="mt-8 w-full">
              <h2 className="text-2xl font-semibold mb-2">寄送資訊</h2>
              <form className="w-full">
                <div className="flex">
                  <div className="flex-1 flex flex-col mr-2">
                    <label className="inline-block mr-2" htmlFor="name">
                      <span className="text-red-500">*</span>
                      收貨人姓名
                    </label>
                    <input
                      id="name"
                      placeholder="請輸入收件人姓名"
                      className="w-full border-2 border-midBrown rounded-md bg-gray-100 my-2 pl-2"
                      {...register("recipient.name", {
                        required: { value: true, message: "請填入收件人姓名" },
                      })}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="inline-block mr-2 " htmlFor="phone">
                      <span className="text-red-500">*</span>
                      收貨人電話
                    </label>
                    <input
                      id="phone"
                      placeholder="請輸入電話號碼"
                      className="w-full border-2 border-midBrown rounded-md bg-gray-100 my-2 pl-2"
                      {...register("recipient.phone", {
                        required: { value: true, message: "請填入收件人電話" },
                      })}
                    />
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
                    className="w-full border-2 border-midBrown rounded-md bg-gray-100 my-2 pl-2"
                    {...register("recipient.email", {
                      required: {
                        value: true,
                        message: "請填入收件人電子郵件",
                      },
                    })}
                  />
                </div>

                <div id="address" className="mt-2">
                  <div className="flex mb-2">
                    <div className="flex-1 flex flex-col">
                      <label className="inline-block mr-2 mb-2 ">
                        <span className="text-red-500">*</span>縣/市
                      </label>
                      <select
                        className="h-[40px] border-2 border-midBrown mr-2 md:pl-2 rounded-md bg-gray-100"
                        {...register("shippment.city", {
                          required: { value: true, message: "*" },
                        })}
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
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="inline-block mr-2 mb-2">
                        <span className="text-red-500">*</span>鄉鎮市區
                      </label>
                      <select
                        className="h-[40px] border-2 border-midBrown mr-2 md:pl-2 rounded-md bg-gray-100"
                        {...register("shippment.district", {
                          required: { value: true, message: "*" },
                        })}
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
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="inline-block mr-2 md:pl-2 mb-2">
                        <span className="text-red-500">*</span>街道名
                      </label>
                      <select
                        className="h-[40px] border-2 border-midBrown rounded-md bg-gray-100"
                        {...register("shippment.road", {
                          required: { value: true, message: "*" },
                        })}
                      >
                        <option value="">請選擇路名</option>
                        {addressData
                          .find((city) => city.CityName === watchCity)
                          ?.AreaList?.find(
                            (area) => area.AreaName === watchDistrict
                          )
                          ?.RoadList.map((road) => {
                            return (
                              <option value={road.RoadName} key={road.RoadName}>
                                {road.RoadName}
                              </option>
                            );
                          })}
                      </select>
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
                      className="w-full border-2 border-midBrown rounded-md bg-gray-100 h-[40px] pl-2"
                      {...register("shippment.detail", {
                        required: { value: true, message: "*" },
                      })}
                    />
                  </div>
                </div>

                <div id="comment" className="flex flex-col">
                  <label
                    className="inline-block mr-2 mb-2"
                    htmlFor="addressDetail"
                  >
                    訂單備註
                  </label>
                  <textarea
                    id="addressDetail"
                    placeholder="可以留下您的需求或備註"
                    className="w-full border-2 border-midBrown rounded-md bg-gray-100 h-[120px] pl-2 pt-1"
                    {...register("comment", {
                      required: { value: true, message: "*" },
                    })}
                  />
                </div>

                <div className="flex justify-center m-4 rounded-lg">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="hover:bg-midBrown hover:text-white bg-white text-midBrown p-2 rounded-md border-2 border-midBrown transition-all ease-in duration-100"
                  >
                    <h1 className="text-lg">完成訂單</h1>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            id="subtotal"
            className="flex-1 min-w-[300px] w-full max-w-[90dvw] md:max-w-[25dvw] lg:max-w-[20dvw] rounded-lg bg-midBrown p-6 md:m-4 h-fit "
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
              <div className="flex justify-center w-9/10 m-2">
                <div className="flex text-white w-full justify-between max-w-[350px]">
                  <h1 className="font-semibold text-2xl">結帳金額：</h1>
                  <h1 className="text-end text-2xl">
                    {subtotal - couponDiscount - discount}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutInfo;
