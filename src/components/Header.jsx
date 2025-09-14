import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../enviroment"; // Firebase config

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contact", label: "Contact" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart" },
  ];

  // ✅ Get first letter
  const getInitial = (nameOrEmail) => {
    if (!nameOrEmail) return "U";
    return nameOrEmail.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* 🔹 Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-5 bg-gray-800 shadow-lg">
        {/* Left: Logo + Shop Name */}
        <div className="flex items-center space-x-2">
          <Link to={"/"} className="flex items-center space-x-2">
            <img
              className="w-10 h-10"
              src="public\Images\header logo.png"
              alt="Logo"
            />
            <span className="text-2xl font-bold text-white">My Shop</span>
          </Link>
        </div>

        {/* Right: Navigation */}
        <nav className="flex justify-around items-center w-1/2 space-x-2 ">
          {navItems.map(({ path, label }) => (
            <div
              key={path}
              className="group relative rounded-lg p-[2px] transition-all duration-100 
                         hover:bg-gradient-to-r hover:from-cyan-300 hover:to-green-300 
                         hover:shadow-[0_0_12px_4px_rgba(34,211,238,0.5)]"
            >
              <Link
                to={path}
                className="block bg-gray-900 text-white text-center px-4 py-2 border rounded-lg 
                           transition-all duration-100 group-hover:text-white"
              >
                {label}
              </Link>
            </div>
          ))}

          {/* ✅ Profile with Animated Gradient Border */}
          {user ? (
            <div className="relative group">
              {/* Avatar + Email with Gradient Border */}
              <button
                className="flex items-center space-x-2 p-[2px] rounded-lg 
                           bg-gradient-to-r from-green-400 via-red-500 to-green-400 
                           animate-gradient-border"
              >
                <div className="flex items-center space-x-2 bg-gray-900 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold">
                    {getInitial(user.displayName || user.email)}
                  </div>
                  <span className="text-white font-medium hidden sm:block">
                    {user.displayName || user.email}
                  </span>
                </div>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                              transition-all duration-200 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Login & Register */}
              <div className="group relative rounded-lg p-[2px] hover:bg-gradient-to-r from-cyan-300 to-green-300 hover:shadow-[0_0_12px_4px_rgba(34,211,238,0.5)]">
                <Link
                  to="/login"
                  className="block bg-gray-900 text-white text-center px-4 py-2 border rounded-lg"
                >
                  Login
                </Link>
              </div>
              <div className="group relative rounded-lg p-[2px] hover:bg-gradient-to-r from-cyan-300 to-green-300 hover:shadow-[0_0_12px_4px_rgba(34,211,238,0.5)]">
                <Link
                  to="/register"
                  className="block bg-gray-900 text-white text-center px-4 py-2 border rounded-lg"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* 🔹 Add spacing so content doesn’t hide under header */}
      <div className="pt-20"></div>
    </>
  );
};

export default Header;
