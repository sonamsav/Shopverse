import React, { useState } from "react";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";

const ProductDesc = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  //   const { accessToken } = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken"); // ✅ always fresh token
  const addToCart = async (productId) => {
    if (!accessToken) {
      toast.error("Please login first");
      return;
    }

    if (!productId) {
      toast.error("Invalid product");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // console.log("API RESPONSE:", res.data); // ✅ debug

      if (res?.data?.success) {
        console.log("Before dispatch");

        toast.success(res.data.message || "Product added to cart");

        console.log("Cart:", res.data.cart);

        dispatch(setCart(res.data.cart));

        console.log("After dispatch");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("API ERROR:", error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Failed to add product to cart",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white border rounded-lg p-5">
      {/* Brand */}
      <p className="text-xs text-slate-500 mb-1">{product?.brand}</p>

      {/* Product Name */}
      <h1 className="text-xl font-medium text-slate-900 leading-7">
        {product?.productName}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-2">
        <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
          4.4 ★
        </span>

        <span className="text-sm text-slate-500">245 Ratings & Reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-2xl font-semibold text-slate-900">
          ₹{product?.productPrice?.toLocaleString()}
        </span>

        <span className="text-sm text-slate-400 line-through">
          ₹{Math.floor(product?.productPrice * 1.1).toLocaleString()}
        </span>

        <span className="text-sm font-medium text-green-600">10% Off</span>
      </div>

      <p className="text-green-600 text-sm mt-1">Special Price</p>

      {/* Description */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-medium text-slate-800 mb-2">
          Product Description
        </h3>

        <p className="text-sm text-slate-600 leading-6">
          {product?.productDesc}
        </p>
      </div>

      {/* Highlights */}
      <div className="mt-5">
        <h3 className="text-sm font-medium text-slate-800 mb-2">Highlights</h3>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Brand: {product?.brand}</li>
          <li>• Category: {product?.category}</li>
          <li>• 100% Genuine Product</li>
          <li>• Secure Payments</li>
          <li>• Easy Returns</li>
        </ul>
      </div>
      {/* Offers */}
      <div className="mt-5">
        <h3 className="text-sm font-medium text-slate-800 mb-2">
          Available Offers
        </h3>

        <div className="space-y-2 text-sm text-slate-600">
          <p>✓ 10% Instant Discount on Bank Cards</p>
          <p>✓ No Cost EMI Available</p>
          <p>✓ Free Delivery Across India</p>
          <p>✓ Cash On Delivery Available</p>
        </div>
      </div>

      {/* Stock + Quantity */}
      {/* Stock & Quantity */}
<div className="mt-4 flex items-center gap-6 text-sm">
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-green-500"></span>

    <span className="font-medium text-green-600">
      In Stock
    </span>
  </div>

  <div className="h-4 w-px bg-slate-300"></div>

  <div className="flex items-center gap-2">
    <span className="text-slate-500">
      Quantity:
    </span>

    <span className="font-medium text-slate-800">
      1
    </span>
  </div>
</div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          className="
      h-10
      px-4
      rounded-md
      border
      border-pink-600
      text-pink-600
      text-sm
      font-medium
      hover:bg-pink-50
      transition
      flex
      items-center
      gap-2
    "
          onClick={() => addToCart(product?._id)}
        >
          <ShoppingCart size={15} />
          Add To Cart
        </button>

        <button
          className="
      h-10
      px-4
      rounded-md
      bg-pink-600
      text-white
      text-sm
      font-medium
      hover:bg-pink-700
      transition
      flex
      items-center
      gap-2
    "
        >
          <CreditCard size={15} />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDesc;
