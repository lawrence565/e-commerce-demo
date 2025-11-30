import { useParams } from "react-router-dom";
import StillBuilding from "./StillBuilding";

function Faq() {
  return (
    <div className="flex justify-center mt-12">
      <div className="max-w-[700px] pb-12 flex flex-col items-center">
        <div>
          <h1 className="text-[2.5rem] py-4 text-center font-bold">常見問題</h1>
          <div className="w-full h-[2px] bg-midBrown"></div>
          <div className="faq">
            <h2>1. 如何追蹤我的訂單？</h2>
            <p>
              當您的訂單已經發貨後，您將會收到一封包含追蹤號碼的電子郵件。您可以通過訪問「我的訂單」頁面來追蹤包裹的物流狀態，或者直接輸入追蹤號碼到我們的合作物流網站中進行查詢。
            </p>
          </div>
          <div className="faq">
            <h2>2. 我可以更改或取消我的訂單嗎？</h2>
            <p>
              如果您需要更改或取消您的訂單，請在訂單確認後的 1
              小時內聯繫我們的客服團隊。由於我們的訂單處理速度較快，超過該時間後訂單可能已經進入配送流程，無法修改或取消。
            </p>
          </div>
          <div className="faq">
            <h2>3. 有哪些付款方式？</h2>
            <p>
              我們接受多種付款方式，包括信用卡（Visa、Mastercard、American
              Express）、Apple Pay 和 Google
              Pay。根據您的地區，可能還提供其他本地付款方式。請在結帳時選擇最適合您的支付選項。
            </p>
          </div>
          <div className="faq">
            <h2>4. 我下訂單後，何時會發貨？</h2>
            <p>
              訂單通常會在確認後的 1-2
              個工作日內發貨。週末和假期期間，訂單處理可能會有所延遲。發貨後，您將收到一封包含物流追蹤信息的確認郵件。
            </p>
          </div>
          <div className="faq">
            <h2>5. 如何退貨或換貨？</h2>
            <p>
              如果您對購買的商品不滿意，可以在收到商品後的 30
              天內申請退貨或換貨。請確保商品未被使用且仍處於原始包裝狀態。我們的退貨流程非常簡單，只需進入「我的訂單」，選擇需要退貨的商品並按照指示操作。
            </p>
          </div>
          <div className="faq">
            <h2>6. 我的商品出現了損壞，該怎麼辦？</h2>
            <p>
              如果您收到的商品有任何損壞，請在 7
              天內聯繫我們的客服團隊並提供相關圖片。我們將盡快處理您的問題，並為您提供替換或退款選項。
            </p>
          </div>
          <div className="faq">
            <h2>7. 運費是多少？</h2>
            <p>
              標準運輸費用基於訂單金額和配送地區計算。部分訂單在滿足最低購買金額後可以享受免運優惠。具體運費在結帳時會顯示，或者您可以參考我們的「配送政策」頁面了解更多詳細信息。
            </p>
          </div>
        </div>
        <div className="mt-8 py-6 px-8 border-midBrown border-2 rounded-md">
          <p>若是有其他問題，可以透過以下方式聯絡我們</p>
          <p>聯絡電話：(02)-12345678</p>
          <p>電子郵件：emailus@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

function Returns() {
  return (
    <div className="flex justify-center mt-12">
      <div className="max-w-[700px] pb-12 flex flex-col items-center">
        <h1 className="text-[2.5rem] py-4 text-center font-bold">退換貨問題</h1>
        <div className="w-full h-[2px] bg-midBrown mb-8"></div>
        <div className="px-8">
          <p className="mb-4">
            我們希望您對購買的商品感到滿意。如果您需要退貨或換貨，請參閱以下政策：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>商品必須在收到後 30 天內退回。</li>
            <li>商品必須未經使用且處於原始包裝中。</li>
            <li>退貨運費由買家承擔，除非商品有瑕疵。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="flex justify-center mt-12">
      <div className="max-w-[700px] pb-12 flex flex-col items-center">
        <h1 className="text-[2.5rem] py-4 text-center font-bold">聯絡我們</h1>
        <div className="w-full h-[2px] bg-midBrown mb-8"></div>
        <div className="px-8 text-center">
          <p className="mb-4">有任何問題嗎？請隨時與我們聯繫！</p>
          <p className="text-xl font-semibold mb-2">電話</p>
          <p className="mb-4">02-1234-5678</p>
          <p className="text-xl font-semibold mb-2">電子郵件</p>
          <p className="mb-4">emailus@gmail.com</p>
          <p className="text-xl font-semibold mb-2">地址</p>
          <p>台北市中正區重慶南路一段122號</p>
        </div>
      </div>
    </div>
  );
}

function Helps() {
  const { functions: func } = useParams<{
    functions: string;
  }>();

  console.log(func);

  if (func === "faqs") {
    return <Faq />;
  } else if (func === "returns-and-exchange") {
    return <Returns />;
  } else if (func === "contact-us") {
    return <Contact />;
  } else {
    return <StillBuilding />;
  }
}

export default Helps;
