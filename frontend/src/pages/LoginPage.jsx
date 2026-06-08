import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Submit Form
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("BEFORE REQUEST");

    const res = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      formData
    );

    console.log("AFTER REQUEST");
    console.log(res);

    if (res.data.success) {
      console.log("SUCCESS BLOCK");

      dispatch(setUser(res.data.user));

      localStorage.setItem(
        "accessToken",
        res.data.accessToken
      );

      navigate("/");
    }
  } catch (error) {
    console.log("ERROR BLOCK");
    console.log(error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7e8ef] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h1>

          <p className="text-gray-500 text-sm mt-1">
            Login to continue shopping with ShopVerse
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>

            <input
              type="email"
              name="email"
              placeholder="me@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2.5 border rounded-lg outline-none transition
              ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-black"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2.5 border rounded-lg outline-none transition pr-12
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-black"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-pink-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Please wait...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-500 font-medium hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
