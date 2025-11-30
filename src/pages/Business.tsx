import { useParams } from "react-router-dom";
import StillBuilding from "./StillBuilding";

function Apply() {
    return (
        <div className="flex justify-center mt-12">
            <div className="max-w-[700px] pb-12 flex flex-col items-center">
                <h1 className="text-[2.5rem] py-4 text-center font-bold">申請加入</h1>
                <div className="w-full h-[2px] bg-midBrown mb-8"></div>
                <div className="px-8 text-center">
                    <p className="mb-4">我們歡迎優質商家加入我們的平台！</p>
                    <p>
                        請將您的品牌介紹和產品型錄寄至 business@example.com，我們將有專人與您聯繫。
                    </p>
                </div>
            </div>
        </div>
    );
}

function Owner() {
    return (
        <div className="flex justify-center mt-12">
            <div className="max-w-[700px] pb-12 flex flex-col items-center">
                <h1 className="text-[2.5rem] py-4 text-center font-bold">商家專區</h1>
                <div className="w-full h-[2px] bg-midBrown mb-8"></div>
                <div className="px-8 text-center">
                    <p className="mb-4">商家後臺功能即將上線，敬請期待！</p>
                </div>
            </div>
        </div>
    );
}

function HowToApply() {
    return (
        <div className="flex justify-center mt-12">
            <div className="max-w-[700px] pb-12 flex flex-col items-center">
                <h1 className="text-[2.5rem] py-4 text-center font-bold">如何加入</h1>
                <div className="w-full h-[2px] bg-midBrown mb-8"></div>
                <div className="px-8">
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>準備您的品牌資料。</li>
                        <li>提交申請表格。</li>
                        <li>等待審核（約 3-5 個工作天）。</li>
                        <li>簽署合約並上架商品。</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

function Business() {
    const { function: func } = useParams<{ function: string }>();

    if (func === "apply") {
        return <Apply />;
    } else if (func === "owner") {
        return <Owner />;
    } else if (func === "how-to-apply") {
        return <HowToApply />;
    } else {
        return <StillBuilding />;
    }
}

export default Business;
