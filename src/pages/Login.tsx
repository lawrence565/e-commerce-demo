import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        console.log("Login with:", email, password);
        // In a real app, we would call the API here
        // await login(email, password);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-midBrown">
                    登入
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">電子郵件</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-midBrown"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">密碼</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-midBrown"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-midBrown text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        登入
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-gray-500 hover:text-midBrown">
                        忘記密碼？
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
