import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../enviroment";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // ✅ Enforce session-only persistence before every login
      // This guarantees the auth state is NEVER saved to localStorage
      // so opening the app on a different device won't auto-login
      await setPersistence(auth, browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );
      const token = await userCredential.user.getIdToken();
      sessionStorage.setItem("authToken", token);
      navigate("/", { replace: true });
    } catch (err) {
      const messages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/invalid-credential": "Invalid email or password.",
        "auth/too-many-requests": "Too many failed attempts. Please try again later.",
      };
      setError(messages[err.code] || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Logging in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src="/Images/header logo.png" alt="TechSpace" className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 mb-2">
          Welcome Back
        </h3>
        <p className="text-center text-gray-500 text-sm mb-6">
          Log in to your TechSpace account
        </p>

        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base transition pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-1 bg-purple-600 text-white font-semibold rounded-xl shadow hover:bg-purple-700 active:scale-95 transition text-sm sm:text-base"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
