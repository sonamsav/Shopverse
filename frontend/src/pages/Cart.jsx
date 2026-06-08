import { setCart } from "@/redux/productSlice";
import axios from "axios";
import React, { useEffect } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.product);
  const navigate = useNavigate();
  const API = "http://localhost:8000/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  const subTotal = cart?.totalPrice || 0;
  const shipping = subTotal > 299 ? 0 : 99;
  const tax = Number((subTotal * 0.05).toFixed(2));
  const total = Number((subTotal + shipping + tax).toFixed(2));

  const isCartEmpty = !cart?.items?.length;

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      {isCartEmpty ? (
        <div className="min-h-[75vh] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="flex justify-center">
              <ShoppingCart size={70} className="text-gray-300" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>

            <p className="mt-2 text-gray-500">
              Looks like you haven't added any products yet.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-2xl sm:text-xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {totalItems} item{totalItems > 1 ? "s" : ""} in your cart
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {cart?.items?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border rounded-xl p-3 sm:p-4"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.productId?.productImg?.[0]?.url}
                        alt={item.productId?.productName}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
                        {item.productId?.productName}
                      </h2>

                      <p className="text-xs text-green-600 mt-1">
                        {item.productId?.brand}
                      </p>

                      <p className="mt-2 text-base sm:text-lg font-semibold text-gray-900">
                        ₹{item.price?.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId?._id,
                              "decrease",
                            )
                          }
                          className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-[28px] text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId?._id,
                              "increase",
                            )
                          }
                          className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => handleRemove(item.productId?._id)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>

                      <p className="font-semibold text-sm sm:text-base">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white border rounded-xl p-5 h-fit lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>

                  <span className="font-medium">
                    ₹{subTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>

                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span>₹{shipping}</span>
                  )}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (5%)</span>

                  <span>₹{tax}</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">
                  Coupon Code
                </label>

                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Enter coupon"
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm outline-none focus:border-pink-500"
                  />

                  <button className="px-4 bg-pink-600 text-white rounded-r-lg text-sm hover:bg-pink-700 transition">
                    Apply
                  </button>
                </div>
              </div>

              {/* Trust Section */}
              <div className="mt-6 border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck size={16} />
                  <span>Free Shipping on orders above ₹299</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw size={16} />
                  <span>30 Days Easy Returns</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck size={16} />
                  <span>100% Secure Payments</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BadgeCheck size={16} />
                  <span>Quality Assured Products</span>
                </div>
              </div>

              <button
                className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
                onClick={() => navigate("/address")}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center mt-4 text-sm font-medium text-pink-600 hover:text-pink-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
