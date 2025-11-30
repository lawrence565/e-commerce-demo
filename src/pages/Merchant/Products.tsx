import { useEffect, useState } from "react";
import { getMerchantProducts } from "../../api/merchantApi";
import { Product } from "../../types";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getMerchantProducts().then(setProducts);
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-midBrown">商品管理</h1>
                <button className="bg-midBrown text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
                    新增商品
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="text-left">
                                <th className="px-6 py-3 text-gray-500 font-medium">名稱</th>
                                <th className="px-6 py-3 text-gray-500 font-medium">類別</th>
                                <th className="px-6 py-3 text-gray-500 font-medium">價格</th>
                                <th className="px-6 py-3 text-gray-500 font-medium">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {product.title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{product.category}</td>
                                        <td className="px-6 py-4 text-gray-500">NT$ {product.price}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                編輯
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 font-medium">
                                                刪除
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        尚無商品
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Products;
