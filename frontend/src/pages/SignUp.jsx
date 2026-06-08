import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    // Remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // SUCCESS
      if (res.data.success) {
        toast.success(res.data.message || "Account created successfully 🎉");

        navigate("/verify");
      }
    } catch (error) {
  console.log(error);

  toast.error(
    error.response?.data?.message || "Something went wrong"
  );
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7e8ef] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create your account
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Enter given details below to create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2.5 border rounded-lg outline-none transition
                ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-black"
                }`}
              />

              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                placeholder="Doc"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2.5 border rounded-lg outline-none transition
                ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-black"
                }`}
              />

              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

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
                  ? "border-red-500 focus:ring-red-300"
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2.5 border rounded-lg outline-none transition pr-12
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-black"
                }`}
              />

              {/* Toggle Password */}
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                CPlease wait..
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
