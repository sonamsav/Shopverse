import React, { useEffect, useState } from "react";
import { ShoppingBag, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.product);
  const admin = user?.role === "admin" ? true : false;

  const logoutHandle = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
    }
  }, []);

  console.log("User:", user);
  console.log("Role:", user?.role);
  console.log("Admin:", admin);
  return (
    <nav className="bg-[#f7e8ef] border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag size={28} className="text-pink-600" />

            <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              ShopVerse
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-pink-600 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="font-medium text-gray-700 hover:text-pink-600 transition"
            >
              Products
            </Link>

            {user ? (
              <>
                {/* User */}
                <Link
                  to={`/profile/${user._id}`}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    {user.firstName}
                  </p>
                </Link>

                {admin && (
                  <Link
                    to="/dashboard"
                    className="font-medium text-gray-700 hover:text-pink-600 transition"
                  >
                    Dashboard
                  </Link>
                )}

                {/* Cart */}
                <Link to="/cart" className="relative cursor-pointer">
                  <ShoppingCart
                    size={24}
                    className="text-gray-700 hover:text-pink-600"
                  />

                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {cart?.items?.length || 0}
                  </span>
                </Link>

                {/* Logout */}
                <button
                  onClick={logoutHandle}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative cursor-pointer">
                  <ShoppingCart
                    size={24}
                    className="text-gray-700 hover:text-pink-600"
                  />

                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </Link>

                <Link
                  to="/login"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                Products
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                Cart
              </Link>

              {user ? (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user.firstName?.charAt(0).toUpperCase()}
                    </div>

                    <p className="font-semibold">{user.firstName}</p>
                  </div>

                  {admin && (
                    <Link
                      to="/dashboard"
                      className="font-medium text-gray-700 hover:text-pink-600 transition"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={logoutHandle}
                    className="cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-center cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
