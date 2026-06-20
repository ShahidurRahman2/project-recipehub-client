"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

// HeroUI v3 Base Imports (No more Input bugs)
import { Card, CardHeader, CardContent, CardFooter, Button } from "@heroui/react";

// Gravity UI Icons 
import { Envelope, Lock, Eye, EyeClosed } from "@gravity-ui/icons";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await authClient.signIn.email({ email, password });

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

    const handleGoogle = async () => {
        try {
            setGoogleLoading(true);
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
            toast.success("Connecting to Google...");
        } catch (err) {
            toast.error(err?.message || "Google login failed");
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050816] px-4 py-10">
            <Card className="w-full max-w-md bg-[#0B1120] border border-white/10 p-8 shadow-2xl rounded-3xl">
                <CardHeader className="flex flex-col items-center justify-center text-center pb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-orange-500">
                        RecipeHub

                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Login to continue your startup journey</p>
                </CardHeader>

                <CardContent className="space-y-6 overflow-visible">
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">

                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-semibold text-white">Email Address</label>
                            <div className="relative flex items-center">
                                <Envelope className="absolute left-4 text-gray-400 text-lg pointer-events-none" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#111827] border border-white/10 hover:border-cyan-400 focus:border-cyan-400 h-12 pl-12 pr-4 rounded-xl text-white placeholder:text-gray-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1.5 w-full relative">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-white">Password</label>
                                <Link href="/forgot-password" className="text-xs text-cyan-400 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-4 text-gray-400 text-lg pointer-events-none" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#111827] border border-white/10 hover:border-cyan-400 focus:border-cyan-400 h-12 pl-12 pr-12 rounded-xl text-white placeholder:text-gray-500 outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-gray-400 hover:text-white transition focus:outline-none"
                                >
                                    {showPassword ? <EyeClosed className="text-lg" /> : <Eye className="text-lg" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            isPending={loading}
                            className="w-full h-12px-4 py-2 rounded-lg bg-orange-500  font-bold hover:underline ml-2 text-white font-semibold text-base rounded-xl transition mt-2 shadow-lg shadow-cyan-500/20"
                        >
                            {loading ? "Logging In..." : "Login"}
                        </Button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <p className="text-gray-500 text-xs font-medium tracking-wider uppercase">Or continue with</p>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    <Button
                        type="button"
                        onPress={handleGoogle}
                        isPending={googleLoading}
                        variant="outline"
                        className="w-full h-12 border border-white/10 bg-[#111827] hover:bg-[#1A2235] text-white font-medium rounded-xl transition flex items-center justify-center gap-2"
                    >
                        {!googleLoading && (
                            <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.357 2.72 1.5 6.662l3.766 3.103Z" />
                                <path fill="#4285F4" d="M23.455 12.273c0-.818-.073-1.609-.21-2.364H12v4.477h6.432a5.504 5.504 0 0 1-2.386 3.614v3l3.855 2.986c2.254-2.077 3.554-5.132 3.554-9.713Z" />
                                <path fill="#FBBC05" d="M5.266 14.235 1.5 17.338A11.934 11.934 0 0 0 12 24c3.055 0 5.782-1.009 7.91-2.745l-3.855-2.986a7.114 7.114 0 0 1-9.523-4.034l-1.266 1Z" />
                                <path fill="#34A853" d="M5.266 14.235A7.051 7.051 0 0 1 4.91 12c0-.79.13-1.555.356-2.265L1.5 6.632A11.94 11.94 0 0 0 0 12c0 1.92.455 3.74 1.5 5.368l3.766-3.133Z" />
                            </svg>
                        )}
                        {googleLoading ? "Connecting..." : "Continue with Google"}
                    </Button>
                </CardContent>

                <CardFooter className="flex justify-center pt-6 border-t border-white/5 mt-4">
                    <p className="text-sm text-gray-400">
                        Don’t have an account?
                        <Link href="/register" className="px-4 py-2 rounded-lg bg-orange-500  font-bold hover:underline ml-2">Register</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}