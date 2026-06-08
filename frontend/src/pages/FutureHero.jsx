
// import React, { useEffect, useState } from "react";

// const banners = [
//   {
//     title: "Discover Fashion Trends",
//     subtitle: "Explore New Arrivals & Best Sellers",
//     image:
//       "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
//   },

//   {
//     title: "Latest Tech Collection",
//     subtitle: "Smartphones, Laptops & Accessories",
//     image:
//       "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80",
//   },

//   {
//     title: "Premium Lifestyle",
//     subtitle: "Everything You Need In One Place",
//     image:
//       "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
//   },

//   {
//     title: "Beauty & Personal Care",
//     subtitle: "Discover Top Beauty Products",
//     image:
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
//   },

//   {
//     title: "Home & Living",
//     subtitle: "Make Your Home Beautiful",
//     image:
//       "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
//   },
// ];


// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev === banners.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full">
//       <div className="relative h-[300px] md:h-[500px] overflow-hidden">

//         {/* Banner Image */}
//         <img
//           src={banners[currentSlide].image}
//           alt={banners[currentSlide].title}
//           className="w-full h-full object-cover transition-all duration-700"
//         />

//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/40" />

//         {/* Content */}
//         <div className="absolute inset-0 flex items-center">
//           <div className="px-6 md:px-16 max-w-2xl text-white">
//             <span className="inline-block bg-pink-500 px-4 py-2 rounded-full text-sm font-medium">
//               ✨ New Collection 2026
//             </span>

//             <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
//               {banners[currentSlide].title}
//             </h1>

//             <p className="mt-4 text-lg md:text-xl text-gray-200">
//               {banners[currentSlide].subtitle}
//             </p>

//             <div className="flex gap-4 mt-8">
//               <button className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-xl font-semibold transition">
//                 Shop Now
//               </button>

//               <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-xl font-semibold transition">
//                 Explore Deals
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Slider Dots */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
//           {banners.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`h-3 w-3 rounded-full transition-all ${
//                 currentSlide === index
//                   ? "bg-pink-500 w-8"
//                   : "bg-white/60"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

