import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      const token = await userCredential.user.getIdToken();

      sessionStorage.setItem("authToken", token);

      navigate("/", { replace: true });
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 px-4">
      {loading ? (
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Logging in...</p>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
            Log In
          </h3>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition duration-300"
                  required
                />
                <span
                  onMouseEnter={() => setShowPassword(true)}
                  onMouseLeave={() => setShowPassword(false)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer select-none"
                >
                  <Eye size={20} />
                </span>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md transform transition duration-300 hover:bg-purple-700 hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
