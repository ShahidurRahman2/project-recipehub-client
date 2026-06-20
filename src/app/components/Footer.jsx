import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-neutral text-neutral-content">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-orange-400">
                            RecipeHub
                        </h2>
                        <p className="mt-3 text-sm">
                            Discover, share, and enjoy delicious recipes from around the world.
                            Cook smarter and eat better with RecipeHub.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="footer-title text-lg font-semibold">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2 mt-3">
                            <Link href="/" className="hover:text-orange-400">
                                Home
                            </Link>

                            <Link href="/recipes" className="hover:text-orange-400">
                                Browse Recipes
                            </Link>

                            <Link href="/login" className="hover:text-orange-400">
                                Login
                            </Link>

                            <Link href="/register" className="hover:text-orange-400">
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="footer-title text-lg font-semibold">
                            Contact
                        </h3>

                        <div className="mt-3 space-y-2 text-sm">
                            <p>Email: support@recipehub.com</p>
                            <p>Phone: +880 1234-567890</p>
                            <p>Sylhet, Bangladesh</p>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="footer-title text-lg font-semibold">
                            Follow Us
                        </h3>

                        <div className="flex gap-4 mt-4">
                            <a
                                href="#"
                                className="hover:text-orange-400"
                            >
                                Facebook
                            </a>

                            <a
                                href="#"
                                className="hover:text-orange-400"
                            >
                                Instagram
                            </a>

                            <a
                                href="#"
                                className="hover:text-orange-400"
                            >
                                YouTube
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                    © {new Date().getFullYear()} RecipeHub. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}