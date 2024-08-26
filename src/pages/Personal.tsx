import personalImg from "../assets/testing_thumbnail.webp";

// type OrderData = {
//   id: string;
//   total: number;
//   shippment: string;
// };

function Personal() {
  return (
    <>
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
                </div>
                <div className="text-xl m-4 ml-2 lg:ml-16">
                  <p className="my-2">王小明</p>
                  <p className="my-2">1980/10/10</p>
                  <p className="my-2">higoogle@google.com</p>
                  <p className="my-2">0912345678</p>
                </div>
              </div>
              <div className="function flex justify-center items-center">
                <button className="bg-midBrown text-white px-4 py-2 rounded-md m-2 border-[1px] border-midBrown hover:bg-white hover:text-midBrown transition-all ease-in duration-100 text-lg font-semibold">
                  修改
                </button>
                <button className="bg-white text-midBrown px-4 py-2 rounded-md m-2 border-[1px] border-midBrown hover:bg-midBrown hover:text-white transition-all ease-in duration-100 text-lg font-semibold">
                  保存
                </button>
              </div>
            </div>
            <div
              id="personal-img"
              className="w-3/5 lg:w-1/5 min-w-[200px] lg:max-w-[450px] border-2 border-midBrown rounded-lg flex-1 overflow-hidden m-8"
            >
              <img src={personalImg} className="min-w-[200px] w-full" />
            </div>
          </div>
          <div id="order-history" className="flex m-8">
            <div className="w-full">
              <h1 className="text-3xl font-bold mb-4 text-center lg:text-start">
                過去訂單
              </h1>
              <hr />
              <div className="m-4 lg:m-8 flex justify-center items-center border-2 border-midBrown rounded-xl">
                <h1 className="text-2xl font-bold text-midBrown m-12">
                  此功能尚在製作當作
                </h1>
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
