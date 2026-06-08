import React from "react";
import {
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck size={28} />,
      title: "Free Shipping",
      description: "On orders over ₹999",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Payment",
      description: "100% secure transactions",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      description: "Always here to help",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition"
            >
              <div
                className={`h-14 w-14 rounded-full flex items-center justify-center ${feature.bg} ${feature.color}`}
              >
                {feature.icon}
              </div>

              <div>
                <h3 className="font-semibold text-md text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;