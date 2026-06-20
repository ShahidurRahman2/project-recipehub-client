"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    // EMAIL & PASSWORD LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result?.error) {
                toast.error(result.error.message);
                return;
            }

            toast.success("Login successful!");
            router.push("/");
        } catch (err) {
            toast.error(err?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    // GOOGLE LOGIN
    const handleGoogle = async () => {
        try {
            setGoogleLoading(true);
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", // গুগল লগইন শেষে এই রুটে ব্যাক করবে
            });

            // নোট: Better Auth সফল হলে সরাসরি callbackURL-এ রিডাইরেক্ট করে দেয়।
            toast.success("Connecting to Google...");
        } catch (err) {
            toast.error(err?.message || "Google login failed");
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050816] px-4 py-10">
            <div className="w-full max-w-md bg-[#0B1120] border border-white/10 rounded-3xl shadow-2xl p-8">
                {/* Top Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-cyan-400">IdeaVault</h1>
                    <p className="text-gray-400 mt-3">Login to continue your startup journey</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="font-semibold text-white mb-2 block">Email Address</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#111827] border border-white/10 text-white pl-12 pr-4 h-12 rounded-xl outline-none focus:border-cyan-400 transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-semibold text-white">Password</label>
                            <button type="button" className="text-sm text-cyan-400 hover:underline">
                                Forgot Password?
                            </button>
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full bg-[#111827] border border-white/10 text-white pl-12 pr-12 h-12 rounded-xl outline-none focus:border-cyan-400 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // 💡 এই onChange-টি মিসিং ছিল ভাই!
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <strong className="text-center mt-3 text-gray-400">forget password </strong>

                    {/* Login Button */}
                    <button
                        disabled={loading}
                        className="w-full h-12 rounded-xl mt-3 text-lg font-semibold text-white bg-cyan-500 hover:bg-cyan-600 transition disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <p className="text-gray-400 text-sm whitespace-nowrap">OR CONTINUE WITH</p>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Google Button */}
                <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    className="w-full h-12 rounded-xl border border-white/10 bg-[#111827] hover:bg-[#1A2235] transition flex items-center justify-center gap-3 text-white font-medium disabled:opacity-50"
                >
                    <FcGoogle className="text-2xl" />
                    {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>

                {/* Register Link */}


                <p className="text-center mt-6 text-gray-400">
                    Don’t have an account?
                    <Link href="/register" className="text-cyan-400 font-bold hover:underline ml-2">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}