import React from "react";

const Hero = () => {
  return (
    <section className="bg-[#f8f8f8]">
      <div className="w-full">
        <div className="bg-white overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="px-8 md:px-16 py-8 md:py-12">
              <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium">
                ✨ New Collection 2026
              </span>

              <h1 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                Discover
                <span className="block text-pink-600">Premium Shopping</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Shop electronics, fashion, beauty, accessories and lifestyle
                products at amazing prices only on ShopVerse.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                  Shop Now
                </button>

                <button className="border border-gray-300 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold text-gray-700 transition">
                  Explore Deals
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="h-full">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
                alt="Shopping Banner"
                className="w-full h-[300px] md:h-[450px] object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
