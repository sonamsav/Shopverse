import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStatus("Success");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setStatus("Failed");
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7e8ef] px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-white rounded-3xl shadow-2xl p-10 text-center">
        
        {/* Loading State */}
        {status === "Verifying..." && (
          <>
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-100">
              <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Verifying Email
            </h1>

            <p className="text-gray-500">
              Please wait while we verify your account...
            </p>
          </>
        )}

        {/* Success State */}
        {status === "Success" && (
          <>
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Verified!
            </h1>

            <p className="text-lg text-gray-600 mb-2">
              Your email has been successfully verified.
            </p>

            <p className="text-sm text-gray-500">
              Welcome to ShopVerse 🚀
            </p>

            <div className="mt-6 rounded-xl bg-green-50 p-3">
              <p className="text-sm text-green-700">
                Redirecting to login page...
              </p>
            </div>
          </>
        )}

        {/* Failed State */}
        {status === "Failed" && (
          <>
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>

            <h1 className="text-3xl font-bold text-red-500 mb-3">
              Verification Failed
            </h1>

            <p className="text-gray-500">
              This verification link is invalid or has expired.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl transition"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;