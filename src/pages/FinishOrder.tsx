import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getSingleProduct } from "../api/productApi";
import { useEffect } from "react";
import { trackPurchase } from "../utils/gaEventTracking";

type CartItem = {
  productId: number;
  category: string;
  quantity: number;
};

interface Product {
  id: number;
  title: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

type Recipient = {
  name: string;
  phone: string;
  email: string;
};

function finishOrder(): JSX.Element {
  const [cookie] = useCookies(["order"]);
  const [remarks, setRemarks] = useState<JSX.Element[]>([]);
  const fakeproducts: CartItem[] = [
    { productId: 2, category: "gadget", quantity: 3 },
    { productId: 27, category: "furniture", quantity: 2 },
    { productId: 6, category: "gadget", quantity: 5 },
  ];
  const fakeRecipient: Recipient = {
    name: "王小明",
    phone: "0987654321",
    email: "12345@yahoo.com",
  };
  let date: string, products: CartItem[], address: string, recipient: Recipient;
  if (cookie.order) {
    address = `${cookie.order.shippment.city}${cookie.order.shippment.district}${cookie.order.shippment.road}${cookie.order.shippment.detail}`;
    date = cookie.order.date;
    products = cookie.order.products;
    address = address;
    recipient = cookie.order.recipient;
  } else {
    const nowDate = new Date().toLocaleDateString("zh-TW");
    date = nowDate;
    products = fakeproducts;
    address = "台北市中正區重慶南路一段122號";
    recipient = fakeRecipient;
  }

  async function detail(item: CartItem): Promise<JSX.Element | undefined> {
    const product: Product | undefined = await getSingleProduct(
      item.category,
      item.productId
    );

    if (product) {
      return (
        <tr key={product.id}>
          <td className="align-middle text-center py-2 flex justify-center">
            <div
              id="product-img-info"
              className="w-fit flex justify-center rounded-sm overflow-hidden aspect-4/3 object-cover"
            >
              <img
                className="rounded-lg w-24"
                src={`./${product.category}s/${product.name}.webp`}
              />
            </div>
          </td>
          <td className="align-middle text-center py-2 text-lg md:text-xl text-nowrap">
            <h1 className="text-xl p-2">{product.title}</h1>
          </td>
          <td className="align-middle text-center py-2 text-lg md:text-xl text-nowrap">
            <h3 className="p-2">{item.quantity}</h3>
          </td>
          <td className="align-middle text-center py-2 text-lg md:text-xl text-nowrap">
            <h3 className="p-2">{product.price}</h3>
          </td>
        </tr>
      );
    }
  }

  useEffect(() => {
    async function fetchDetails() {
      const details = await Promise.all(products.map((item) => detail(item)));
      setRemarks(details.filter(Boolean) as JSX.Element[]);

      // 追蹤購買完成事件
      if (cookie.order && products.length > 0) {
        const items = await Promise.all(
          products.map(async (item) => {
            try {
              const product = await getSingleProduct(
                item.category,
                item.productId
              );
              if (!product) {
                return null;
              }
              return {
                item_name: product.title,
                item_id: product.id.toString(),
                price: product.price,
                item_category: product.category,
                quantity: item.quantity,
              };
            } catch (e) {
              console.error(`Error fetching product ${item.productId}:`, e);
              return null;
            }
          })
        );
        const validItems = items.filter(
          (item): item is NonNullable<typeof item> => item !== null
        );

        if (validItems.length > 0) {
          // 生成唯一訂單 ID
          const transactionId = `ORDER-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;

          trackPurchase({
            transaction_id: transactionId,
            affiliation: "線上商店",
            value:
              cookie.order.price ||
              validItems.reduce(
                (sum, item) => sum + Number(item.price) * item.quantity,
                0
              ),
            currency: "TWD",
            items: validItems,
          });
          // 完成後回首頁（完整 reload）
          window.location.href = "/";
        }
      }
    }
    fetchDetails();
  }, [products]);

  return (
    <div className="flex justify-center">
      <div className="min-h-[70dvh] max-w-[1200px] w-full flex flex-col items-center m-2 md:m-8">
        <div
          id="title"
          className="w-10/12 md:w-4/5 flex flex-col items-center lg:mt-[5dvh]"
        >
          <h1 className="text-4xl text-midBrown font-bold m-4">訂單成立</h1>
          <div className="bg-midBrown h-1 w-full"></div>
        </div>

        <div id="order-info" className="m-2 md:m-8 lg:min-w-[600px]">
          <div>
            <p className="text-lg m-3">
              感謝惠顧！ 您的商品會在付款日後 3-5 個工作天送達，若有問題請洽
              Line 客服。
            </p>
            <div className="p-4 md:p-8 rounded-xl border-2 border-midBrown">
              <table>
                <tbody className="text-lg text-nowrap">
                  <tr>
                    <td>訂單時間：</td>
                    <td>{`${date}`}</td>
                  </tr>
                  <tr>
                    <td className="flex justify-start">寄送地址：</td>
                    <td className="text-wrap">{address}</td>
                  </tr>
                  <tr>
                    <td>收件資訊：</td>
                    <td>{`${recipient.name} ${recipient.phone}`}</td>
                  </tr>
                  <tr>
                    <td>電子郵件：</td>
                    <td>{`${recipient.email}`}</td>
                  </tr>
                </tbody>
              </table>
              <div id="divid" className="bg-midBrown h-1 w-full my-8"></div>
              <h1 className="text-center text-2xl m-6 font-semibold">
                訂單明細
              </h1>
              <table>
                <thead>
                  <tr className="text-xl align-middle text-center">
                    <th className="w-2/12 align-middle text-center px-2"></th>
                    <th className="w-3/12 align-middle text-center px-2 font-semibold">
                      產品名稱
                    </th>

                    <th className="w-2/12 align-middle text-center px-2 font-semibold">
                      數量
                    </th>
                    <th className="w-2/12 align-middle text-center px-2 font-semibold">
                      價格
                    </th>
                  </tr>
                </thead>
                <tbody>{remarks.map((remark) => remark)}</tbody>
              </table>
            </div>
          </div>
          <div className="m-4 flex justify-center">
            <button className="text-md p-2 rounded-lg bg-midBrown text-white border-2 border-midBrown hover:bg-white hover:text-midBrown transition-all ease-in duration-100">
              <Link to="/">回到首頁</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default finishOrder;
