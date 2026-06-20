"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import Link from "next/link";

import {
    FaUserAlt,
    FaEnvelope,
    FaLock,
    FaImage,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

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

        // password validation
        if (password.length < 6) {

            return toast.error(
                "Password must be at least 6 characters"
            );
        }

        if (!/[A-Z]/.test(password)) {

            return toast.error(
                "Password must contain one uppercase letter"
            );
        }

        if (!/[a-z]/.test(password)) {

            return toast.error(
                "Password must contain one lowercase letter"
            );
        }

        try {

            setLoading(true);

            const result = await authClient.signUp.email({

                email,
                password,
                name,
                image,

            });

            if (result?.error) {

                toast.error(result.error.message);

                setLoading(false);

                return;
            }

            toast.success("Registration successful!");

            router.push("/login");

        }

        catch (err) {

            toast.error(
                err?.message || "Registration failed"
            );
        }

        finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050816] px-4 py-10">

            <div className="w-full max-w-md bg-[#0B1120] border border-white/10 rounded-3xl shadow-2xl p-8">

                {/* top */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-black text-cyan-400">
                        IdeaVault
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Create your startup journey account
                    </p>

                </div>

                {/* form */}
                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    {/* name */}
                    <div>

                        <label className="font-semibold text-white block mb-2">
                            Full Name
                        </label>

                        <div className="relative">

                            <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full bg-[#111827] border border-white/10 text-white pl-12 pr-4 h-12 rounded-xl outline-none focus:border-cyan-400 transition"

                                onChange={(e) => setName(e.target.value)}

                                required
                            />

                        </div>

                    </div>

                    {/* photo */}
                    <div>

                        <label className="font-semibold text-white block mb-2">
                            Photo URL
                        </label>

                        <div className="relative">

                            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                placeholder="Paste your photo URL"
                                className="w-full bg-[#111827] border border-white/10 text-white pl-12 pr-4 h-12 rounded-xl outline-none focus:border-cyan-400 transition"

                                onChange={(e) => setImage(e.target.value)}

                                required
                            />

                        </div>

                    </div>

                    {/* email */}
                    <div>

                        <label className="font-semibold text-white block mb-2">
                            Email Address
                        </label>

                        <div className="relative">

                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#111827] border border-white/10 text-white pl-12 pr-4 h-12 rounded-xl outline-none focus:border-cyan-400 transition"

                                onChange={(e) => setEmail(e.target.value)}

                                required
                            />

                        </div>

                    </div>

                    {/* password */}
                    <div>

                        <label className="font-semibold text-white block mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full bg-[#111827] border border-white/10 text-white pl-12 pr-12 h-12 rounded-xl outline-none focus:border-cyan-400 transition"

                                onChange={(e) => setPassword(e.target.value)}

                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }

                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            >

                                {
                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }

                            </button>

                        </div>

                        {/* password rules */}
                        <div className="mt-3 text-sm text-gray-400 space-y-1">

                            <p>
                                • Minimum 6 characters
                            </p>

                            <p>
                                • One uppercase letter
                            </p>

                            <p>
                                • One lowercase letter
                            </p>

                        </div>

                    </div>

                    {/* button */}
                    <button
                        disabled={loading}
                        className="w-full h-12 rounded-xl text-lg font-semibold text-white bg-cyan-500 hover:bg-cyan-600 transition disabled:opacity-50"
                    >

                        {
                            loading
                                ? "Creating Account..."
                                : "Register"
                        }

                    </button>

                </form>

                {/* login */}
                <p className="text-center mt-6 text-gray-400">

                    Already have an account?

                    <Link
                        href="/login"
                        className="text-cyan-400 font-bold hover:underline ml-2"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}