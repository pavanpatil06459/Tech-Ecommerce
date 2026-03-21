import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../enviroment";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const getInitial = (nameOrEmail) => {
    if (!nameOrEmail) return "U";
    return nameOrEmail.charAt(0).toUpperCase();
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contact", label: "Contact" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "🛒 Cart" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-lg">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img className="w-9 h-9 sm:w-10 sm:h-10" src="/Images/header logo.png" alt="TechSpace Logo" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">TechSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(path)
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                {label}
              </Link>
            ))}

            {/* Auth */}
            {user ? (
              <div className="relative group ml-2">
                <button className="flex items-center space-x-2 bg-gray-800 border border-gray-600 px-3 py-2 rounded-lg hover:border-purple-400 transition-all">
                  <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {getInitial(user.displayName || user.email)}
                  </div>
                  <span className="text-white text-sm max-w-[120px] truncate">
                    {user.displayName || user.email}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile: right side */}
          <div className="flex items-center space-x-3 lg:hidden">
            {user && (
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {getInitial(user.displayName || user.email)}
              </div>
            )}
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1 rounded-lg hover:bg-gray-700 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="bg-gray-900 border-t border-gray-700 px-4 py-4 space-y-1">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all
                  ${isActive(path)
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-gray-700 pt-3 mt-3">
              {user ? (
                <>
                  <p className="text-gray-400 text-sm px-4 pb-2 truncate">
                    {user.displayName || user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg font-medium transition"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-1">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-center text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="pt-[60px]" />
    </>
  );
};

export default Header;
