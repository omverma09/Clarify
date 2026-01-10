import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert("Invalid credintials");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4 form">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Login to your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don&apos;t have an account?{" "}
                    <Link to="/clarify/register" className="text-indigo-600 font-medium hover:underline">
                        Register
                    </Link>
                    
                </p>
                
            </div>
        </div>
    );
};

export default Login;
