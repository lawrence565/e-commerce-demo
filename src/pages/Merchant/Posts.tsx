function Posts() {
    const posts = [
        { id: 1, title: "新春優惠開始了！", date: "2023-01-15", status: "Published" },
        { id: 2, title: "新品上市：手工陶瓷杯", date: "2023-02-01", status: "Draft" },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-midBrown">貼文管理</h1>
                <button className="bg-midBrown text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
                    新增貼文
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="text-left">
                                <th className="px-6 py-3 text-gray-500 font-medium">標題</th>
                                <th className="px-6 py-3 text-gray-500 font-medium">發布日期</th>
                                <th className="px-6 py-3 text-gray-500 font-medium">狀態</th>
                                <th className="px-6 py-3 text-gray-500 font-medium">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{post.date}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm ${post.status === "Published"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                                            編輯
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 font-medium">
                                            刪除
                                        </button>
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

export default Posts;
