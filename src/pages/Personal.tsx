import { useState, useEffect } from "react";
import personalImg from "../assets/testing_thumbnail.webp";
import Modal from "../components/Modal";
import { getUserProfile, getUserOrders, UserProfile } from "../api/userApi";
import { Order } from "../types";
import { LazyImage } from "../components/LazyImage";

function Personal() {
  const [personalClicked, setpersonalClicked] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserProfile();
      setProfile(userProfile);
      const userOrders = await getUserOrders();
      setOrders(userOrders);
    };
    fetchData();
  }, []);

  const showPersonClicked = () => {
    setpersonalClicked(true);
  };

  const handlePersonClicked = () => {
    setpersonalClicked(false);
  };

  return (
    <>
      <Modal
        isOpen={personalClicked}
        onClose={handlePersonClicked}
        type="info"
        title="功能開發中"
      >
        <p>功能製作中，敬請期待</p>
      </Modal>
      <div className="min-h-[70dvh] flex justify-center">
        <div className="max-w-[1200px]">
          <div
            id="personal-info"
            className="flex flex-col-reverse sm:flex-row items-center"
          >
            <div id="id" className="flex-[2] lg:max-w-[600px] m-4 lg:m-8">
              <h1 className="text-3xl lg:text-3xl font-bold mb-4 text-center md:text-start">
                個人資訊
              </h1>
              <hr />
              <div className="flex">
                <div className="w-fit text-xl font-semibold mx-2 my-4 lg:m-4">
                  <p className="my-2">姓名：</p>
                  <p className="my-2">生日：</p>
                  <p className="my-2">電子郵件：</p>
                  <p className="my-2">聯絡電話：</p>
                  <p className="my-2">地址：</p>
                </div>
                <div className="text-xl m-4 ml-2 lg:ml-16">
                  <p className="my-2">{profile?.name}</p>
                  <p className="my-2">{profile?.birthday}</p>
                  <p className="my-2">{profile?.email}</p>
                  <p className="my-2">{profile?.phone}</p>
                  <p className="my-2">
                    {profile?.addresses[0]
                      ? `${profile.addresses[0].city}${profile.addresses[0].district}${profile.addresses[0].road}${profile.addresses[0].detail}`
                      : "尚無地址"}
                  </p>
                </div>
              </div>
              <div className="function flex justify-center items-center">
                <button
                  className="bg-midBrown text-white px-4 py-2 rounded-md m-2 border-[1px] border-midBrown hover:bg-white hover:text-midBrown transition-all ease-in duration-100 text-lg font-semibold"
                  onClick={showPersonClicked}
                >
                  修改
                </button>
                <button
                  className="bg-white text-midBrown px-4 py-2 rounded-md m-2 border-[1px] border-midBrown hover:bg-midBrown hover:text-white transition-all ease-in duration-100 text-lg font-semibold"
                  onClick={showPersonClicked}
                >
                  保存
                </button>
              </div>
            </div>
            <div
              id="personal-img"
              className="w-3/5 lg:w-1/5 min-w-[200px] lg:max-w-[450px] border-2 border-midBrown rounded-lg flex-1 overflow-hidden m-8"
            >
              <LazyImage src={personalImg} className="min-w-[200px] w-full" width={200} height={200} />
            </div>
          </div>
          <div id="order-history" className="flex m-8">
            <div className="w-full">
              <h1 className="text-3xl font-bold mb-4 text-center lg:text-start">
                過去訂單
              </h1>
              <hr />
              <div className="m-4 lg:m-8 flex flex-col justify-center items-center border-2 border-midBrown rounded-xl p-4">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <div key={index} className="w-full border-b-2 border-gray-200 py-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">訂單 #{index + 1}</h3>
                        <span className="text-lg font-bold text-midBrown">
                          NT$ {order.price}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        <p>收件人: {order.recipient.name}</p>
                        <p>
                          地址: {order.shippment.city}
                          {order.shippment.district}
                          {order.shippment.road}
                          {order.shippment.detail}
                        </p>
                        <p>商品數量: {order.products.length}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-2xl font-bold text-midBrown m-12">
                    尚無訂單紀錄
                  </h1>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Personal;
