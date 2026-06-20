"use client";

import Link from "next/link";

export default function Banner() {
    return (
        <section className="bg-base-100">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

                <div className="grid lg:grid-cols-2 gap-10 items-center">


                    {/* Left Content */}
                    <div>
                        <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                            🍽️ Discover Amazing Recipes
                        </span>

                        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Cook Delicious Meals
                            <span className="text-orange-500"> Like a Pro</span>
                        </h1>

                        <p className="mt-6 text-gray-500 text-lg">
                            Explore thousands of recipes from different cuisines,
                            save your favorites, and share your cooking journey
                            with food lovers around the world.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/recipes"
                                className="btn bg-orange-500 hover:bg-orange-600 text-white border-none"
                            >
                                Browse Recipes
                            </Link>

                            <Link
                                href="/register"
                                className="btn btn-outline"
                            >
                                Join Now
                            </Link>
                        </div>

                        <div className="mt-10 flex gap-8">
                            <div>
                                <h3 className="text-2xl font-bold">10K+</h3>
                                <p className="text-gray-500">Recipes</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">5K+</h3>
                                <p className="text-gray-500">Users</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">100+</h3>
                                <p className="text-gray-500">Countries</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                            alt="Delicious Food"
                            className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-xl"
                        />
                    </div>

                </div>
            </div>
        </section>


    );
}
