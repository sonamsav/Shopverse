import { setCart } from "@/redux/productSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addToCart = async (productId) => {
    const accessToken = localStorage.getItem("accessToken"); // ✅ always fresh token

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
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition flex flex-col h-full">
      {/* IMAGE */}
      <div className="bg-gray-50">
        <img
          onClick={() => navigate(`/products/${product._id}`)}
          src={product?.productImg?.[0]?.url}
          alt={product?.productName}
          className="w-full h-32 sm:h-36 object-contain p-2"
        />
      </div>

      {/* CONTENT */}
      <div className="p-2 flex flex-col flex-1">
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
            {product?.productName}
          </h3>

          <p className="text-sm font-semibold text-gray-900">
            ₹{product?.productPrice?.toLocaleString()}
          </p>

          <p className="text-xs text-green-600">{product?.brand}</p>
        </div>

        {/* BUTTON */}
        <button
          className={`mt-3 w-full py-1.5 text-xs rounded transition text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-500"
          }`}
          disabled={loading}
          onClick={() => addToCart(product?._id)}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
