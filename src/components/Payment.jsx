import React from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 sm:p-12 text-center max-w-md w-full">
        <div className="text-5xl mb-4">💳</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Payment
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-6">
          Secure checkout is coming soon! We're integrating payment options for you.
        </p>
        <Link
          to="/cart"
          className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium text-sm sm:text-base"
        >
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Payment;
