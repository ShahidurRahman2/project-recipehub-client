"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

// HeroUI v3 Base Imports (No more Input bugs)
import { Card, CardHeader, CardContent, CardFooter, Button } from "@heroui/react";

// Gravity UI Icons
import { Person, Envelope, Lock, Eye, EyeClosed, Picture } from "@gravity-ui/icons";

export default function Register() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error("Password must contain one uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            return toast.error("Password must contain one lowercase letter");
        }

        try {
            setLoading(true);
            const result = await authClient.signUp.email({ email, password, name, image });

            if (result?.error) {
                toast.error(result.error.message);
                return;
            }

            toast.success("Registration successful!");
            router.push("/login");
        } catch (err) {
            toast.error(err?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050816] px-4 py-10">
            <Card className="w-full max-w-md bg-[#0B1120] border border-white/10 p-8 shadow-2xl rounded-3xl">
                <CardHeader className="flex flex-col items-center justify-center text-center pb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-orange-500">
                        RecipeHub

                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Create your startup journey account</p>
                </CardHeader>

                <CardContent className="space-y-6 overflow-visible">
                    <form onSubmit={handleRegister} className="flex flex-col gap-5">

                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-semibold text-white">Full Name</label>
                            <div className="relative flex items-center">
                                <Person className="absolute left-4 text-gray-400 text-lg pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-[#111827] border border-white/10 hover:border-cyan-400 focus:border-cyan-400 h-12 pl-12 pr-4 rounded-xl text-white placeholder:text-gray-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-semibold text-white">Photo URL</label>
                            <div className="relative flex items-center">
                                <Picture className="absolute left-4 text-gray-400 text-lg pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Paste your photo URL"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                    className="w-full bg-[#111827] border border-white/10 hover:border-cyan-400 focus:border-cyan-400 h-12 pl-12 pr-4 rounded-xl text-white placeholder:text-gray-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
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

                        {/* Password */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-semibold text-white">Password</label>
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
                            <div className="text-xs text-gray-400 mt-1.5 space-y-0.5 pl-1">
                                <p>• Minimum 6 characters</p>
                                <p>• At least one uppercase & lowercase letter</p>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            isPending={loading}
                            className="w-full h-12 px-4 py-2 rounded-lg bg-orange-500  font-bold hover:underline ml-2 text-white font-semibold text-base rounded-xl transition mt-4 shadow-lg shadow-cyan-500/20"
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center pt-6 border-t border-white/5 mt-4">
                    <p className="text-sm text-gray-400">
                        Already have an account?
                        <Link href="/login" className="text-cyan-400 font-bold hover:underline ml-2">Login</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}