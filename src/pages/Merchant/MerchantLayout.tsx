import { Link, Outlet } from "react-router-dom";

function MerchantLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-midBrown text-white p-6 hidden md:block">
                <h1 className="text-2xl font-bold mb-8">商家中心</h1>
                <nav className="flex flex-col space-y-4">
                    <Link to="/merchant/dashboard" className="hover:text-gray-300">
                        儀表板
                    </Link>
                    <Link to="/merchant/products" className="hover:text-gray-300">
                        商品管理
                    </Link>
                    <Link to="/merchant/posts" className="hover:text-gray-300">
                        貼文管理
                    </Link>
                    <Link
                        to="/"
                        className="mt-8 pt-8 border-t border-white/20 hover:text-gray-300"
                    >
                        回到首頁
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default MerchantLayout;
