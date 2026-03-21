import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../enviroment";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setSuccess(true);
      await signOut(auth);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2500);
    } catch (err) {
      const messages = {
        "auth/email-already-in-use": "This email is already registered. Please log in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password should be at least 6 characters.",
      };
      setError(messages[err.code] || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const audio = new Audio("/sounds/success.mp3");
      audio.play().catch(() => {});
    }
  }, [success]);

  const passwordsMatch =
    formData.password && formData.confirmPassword
      ? formData.password === formData.confirmPassword
      : null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src="/Images/header logo.png" alt="TechSpace" className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 mb-2">
          Create Account
        </h3>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join TechSpace today
        </p>

        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password (min. 6 chars)"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 text-sm sm:text-base transition
                ${passwordsMatch === false
                  ? "border-red-400 focus:ring-red-300"
                  : passwordsMatch === true
                  ? "border-green-400 focus:ring-green-300"
                  : "border-gray-300 focus:ring-purple-400"
                }`}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 text-sm sm:text-base transition
                ${passwordsMatch === false
                  ? "border-red-400 focus:ring-red-300"
                  : passwordsMatch === true
                  ? "border-green-400 focus:ring-green-300"
                  : "border-gray-300 focus:ring-purple-400"
                }`}
            />
            {passwordsMatch === false && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
            {passwordsMatch === true && (
              <p className="text-green-500 text-xs mt-1">Passwords match ✅</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || passwordsMatch === false}
            className={`w-full py-3 mt-1 text-white font-semibold rounded-xl shadow transition text-sm sm:text-base
              ${loading || passwordsMatch === false
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 active:scale-95"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Registering...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl flex flex-col items-center text-center w-full max-w-xs sm:max-w-sm">
            <div className="relative mb-5">
              <span className="absolute inset-0 rounded-full ring-8 ring-green-400/30 animate-ping" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Registration complete! Redirecting to login... 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
