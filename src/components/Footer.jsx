import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 sm:pt-12 pb-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 mb-3">
            <img
              src="/Images/header logo.png"
              alt="TechSpace Logo"
              className="w-9 h-9"
            />
            <span className="text-white font-bold text-xl">TechSpace</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            TechSpace is your trusted destination for the latest gadgets and
            innovations — secure shopping, fast delivery, dedicated support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/products", label: "Products" },
              { to: "/about", label: "About Us" },
              { to: "/blogs", label: "Blogs" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-blue-400 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <span className="text-gray-600 cursor-not-allowed">Careers</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
            Support
          </h2>
          <ul className="space-y-2 text-sm">
            {["Help Center", "Privacy Policy", "Terms of Service", "FAQs"].map(
              (item) => (
                <li key={item}>
                  <span className="text-gray-600 cursor-not-allowed">
                    {item}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
            Follow Us
          </h2>
          <ul className="space-y-3 text-sm">
            {[
              {
                href: "https://github.com/pavanpatil06459",
                img: "/socialmediaimg/github.png",
                label: "GitHub",
              },
              {
                href: "https://www.instagram.com/pavanpatil_6459/",
                img: "/socialmediaimg/instagram.png",
                label: "Instagram",
              },
              {
                href: "https://www.facebook.com/share/16vkJ5u842/",
                img: "/socialmediaimg/facebook.png",
                label: "Facebook",
              },
            ].map(({ href, img, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center space-x-2 hover:text-blue-400 transition-colors group"
                >
                  <img src={img} alt={`${label} logo`} className="w-5 h-5" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-6 sm:my-8" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 text-center">
        <p>© {new Date().getFullYear()} TechSpace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
