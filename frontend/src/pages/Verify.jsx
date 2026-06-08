import React from "react";
import { CheckCircle } from "lucide-react";

const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7e8ef] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-14 h-14" />
        </div>

        <h1 className="text-3xl font-bold text-green-500 mb-3">
          Check Your Email
        </h1>

        <p className="text-gray-500 leading-relaxed">
          We've sent you an email to verify your account.
          Please check your inbox and click the verification link
          to activate your account.
        </p>

      </div>
    </div>
  );
};

export default Verify;