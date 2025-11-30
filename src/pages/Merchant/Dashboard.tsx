import { useEffect, useState } from "react";
import { getMerchantStats, MerchantStats } from "../../api/merchantApi";

function Dashboard() {
    const [stats, setStats] = useState<MerchantStats | null>(null);

    useEffect(() => {
        getMerchantStats().then(setStats);
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-midBrown">儀表板</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-midBrown">
                    <h2 className="text-xl text-gray-500 mb-2">總銷售額</h2>
                    <p className="text-4xl font-bold text-midBrown">NT$ {stats.totalSales}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-midBrown">
                    <h2 className="text-xl text-gray-500 mb-2">總訂單數</h2>
                    <p className="text-4xl font-bold text-midBrown">{stats.totalOrders}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-midBrown">近期訂單</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-200">
                                <th className="pb-2 font-semibold text-gray-600">訂單編號</th>
                                <th className="pb-2 font-semibold text-gray-600">顧客</th>
                                <th className="pb-2 font-semibold text-gray-600">金額</th>
                                <th className="pb-2 font-semibold text-gray-600">狀態</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.map((order) => (
                                <tr key={order.id} className="border-b last:border-0 border-gray-100">
                                    <td className="py-3 text-gray-800">#{order.id}</td>
                                    <td className="py-3 text-gray-800">{order.customer}</td>
                                    <td className="py-3 text-gray-800">NT$ {order.total}</td>
                                    <td className="py-3">
                                        <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
