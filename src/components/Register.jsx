import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setSuccess(true);
      await signOut(auth);

      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please log in.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const audio = new Audio("/sounds/success.mp3");
      audio.play();
    }
  }, [success]);

  const isPasswordMatch =
    formData.password && formData.confirmPassword
      ? formData.password === formData.confirmPassword
      : null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
          Register Here
        </h3>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className={`w-full px-4 py-2 border rounded-lg transition duration-300
                ${
                  isPasswordMatch === null
                    ? "border-gray-300"
                    : isPasswordMatch
                    ? "border-green-500 focus:ring-green-400"
                    : "border-red-500 focus:ring-red-400"
                }`}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className={`w-full px-4 py-2 border rounded-lg transition duration-300
                ${
                  isPasswordMatch === null
                    ? "border-gray-300"
                    : isPasswordMatch
                    ? "border-green-500 focus:ring-green-400"
                    : "border-red-500 focus:ring-red-400"
                }`}
            />
            {isPasswordMatch === false && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
            {isPasswordMatch === true && (
              <p className="text-green-500 text-sm mt-1">Passwords match ✅</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading || isPasswordMatch === false}
            className={`w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transform transition duration-300
                       ${
                         loading
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
                       }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {loading && (
            <div className="flex justify-center mt-3">
              <div className="w-6 h-6 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
        </form>
      </div>

      {/* Success Animation */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center animate-fadeIn scale-95 animate-zoomIn max-w-xs mx-4">
            <div className="relative mb-4">
              <span className="absolute inset-0 rounded-full ring-8 ring-green-400/40 opacity-75 animate-ping"></span>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white animate-checkmark"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Success!</h2>
            <p className="text-gray-600 mt-2">
              Your registration has been completed successfully. 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
