"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (<nav className="sticky top-0 z-50 bg-salt-200 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">


                <Link
                    href="/"
                    className="text-xl md:text-2xl font-bold text-orange-500"
                >
                    RecipeHub
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="hover:text-orange-500">
                        Home
                    </Link>

                    <Link href="/recipes" className="hover:text-orange-500">
                        Recipes
                    </Link>

                    <Link
                        href="/Login"
                        className="px-4 py-2 border rounded-lg"
                    >
                        Login
                    </Link>

                    <Link
                        href="/Register"
                        className="px-4 py-2 rounded-lg bg-orange-500 text-white"
                    >
                        Register
                    </Link>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden pb-4 flex flex-col gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/recipes">Recipes</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            )}
        </div>
    </nav>


    );
}
