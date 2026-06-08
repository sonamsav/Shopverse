import React from "react";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag
                size={30}
                className="text-pink-500"
              />

              <h2 className="text-2xl font-bold text-pink-500">
                ShopVerse
              </h2>
            </div>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Your one-stop destination for fashion,
              electronics, beauty products and
              lifestyle essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-pink-400 cursor-pointer">
                Home
              </li>

              <li className="hover:text-pink-400 cursor-pointer">
                Products
              </li>

              <li className="hover:text-pink-400 cursor-pointer">
                Categories
              </li>

              <li className="hover:text-pink-400 cursor-pointer">
                Cart
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Customer Service
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-pink-400 cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-pink-400 cursor-pointer">
                Shipping Info
              </li>

              <li className="hover:text-pink-400 cursor-pointer">
                Returns
              </li>

              <li className="hover:text-pink-400 cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@shopverse.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 9876543210</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Mumbai, India</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} ShopVerse. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;