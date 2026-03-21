import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-10 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <ul>
            <li className="flex items-center space-x-2 font-bold text-2xl mb-3">
              <img
                src="/Images/header logo.png"
                alt="TechSpace Logo"
                className="w-10 h-10"
              />
              <span className="text-white">TechSpace</span>
            </li>
          </ul>
          <p className="mt-5 text-sm text-gray-400">
            TechSpace is your trusted destination for the latest gadgets and
            innovations. We bring you cutting-edge products with secure
            shopping, fast delivery, and dedicated support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/products" className="hover:text-blue-400">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <span className="text-gray-500 cursor-not-allowed">Careers</span>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Support</h2>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-500 cursor-not-allowed">Help Center</span>
            </li>
            <li>
              <span className="text-gray-500 cursor-not-allowed">Privacy Policy</span>
            </li>
            <li>
              <span className="text-gray-500 cursor-not-allowed">Terms of Service</span>
            </li>
            <li>
              <span className="text-gray-500 cursor-not-allowed">FAQs</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Social Media</h2>
          <ul className="space-y-5">
            <li>
              <a
                href="https://github.com/pavanpatil06459"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center space-x-2"
              >
                <img
                  src="/socialmediaimg/github.png"
                  alt="GitHub Logo"
                  className="w-6 h-6"
                />
                <span className="text-gray-300 hover:text-blue-400">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pavanpatil_6459/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center space-x-2"
              >
                <img
                  src="/socialmediaimg/instagram.png"
                  alt="Instagram Logo"
                  className="w-6 h-6"
                />
                <span className="text-gray-300 hover:text-blue-400">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/share/16vkJ5u842/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center space-x-2"
              >
                <img
                  src="/socialmediaimg/facebook.png"
                  alt="Facebook Logo"
                  className="w-6 h-6"
                />
                <span className="text-gray-300 hover:text-blue-400">Facebook</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} TechSpace. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
