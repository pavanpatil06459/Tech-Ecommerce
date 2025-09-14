import React, { useState, useEffect } from "react";

const About = () => {
  const [loading, setLoading] = useState(true); // 🔹 Start with loading true

  useEffect(() => {
    // Simulate API/data fetching delay (2s)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // 🔹 Show spinner while loading
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Your original About Page content */}
      <div className="relative bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-300 text-white py-5 px-6 text-left rounded-b-3xl shadow-lg ">
        <div className="absolute inset-0 bg-black/20 rounded-b-3xl"></div>

        <div className="relative z-10 max-w-3x text-center py-10 ">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-yellow-300">TechSpace</span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-200">
            <span className="typewriter-loop">
              Empowering your digital lifestyle with the latest in tech 🚀
            </span>
          </p>

          <div className="mt-8">
            <a
              href="/products"
              className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-500 transition-all "
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Rest of your About content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-25 py-16 bg-white">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
            At <span className="text-blue-600">TechSpace</span>, we believe{" "}
            <br />
            technology should be <br />
            <span className="text-gray-900">
              simple, reliable, and <br /> accessible to everyone.
            </span>
          </h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            Our mission is to bring the latest gadgets <br />
            and innovations right to your fingertips.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="public\Images\about.png"
            alt="Tech Illustration"
            className="w-full max-4xl mx-auto "
          />
        </div>
      </div>

        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-15 text-shadow-lg">
          -- What We Offer --
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="text-center p-6 shadow-xl rounded-lg">
            <img
              src="public/Images/card1.png"
              alt="Gadgets"
              className="mx-auto w-40 h-35 mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              Latest Gadgets & Accessories
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Find the newest tech products with us.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center p-6 shadow-xl rounded-lg">
            <img
              src="public\Images\card2.png"
              alt="Verified"
              className="mx-auto w-32 h-30 mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              100% Genuine & Verified Products
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              We ensure all our products are authentic.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center p-6 shadow-xl rounded-lg">
            <img
              src="public\Images\card3.png"
              alt="Secure"
              className="mx-auto w-35 h-30 mb-4"
            />
            <h3 className="font-semibold text-gray-800">Secure Payments</h3>
            <p className="text-gray-600 text-sm mt-2">
              Shop with confidence using secure payment options.
            </p>
          </div>

          {/* Card 4 */}
          <div className="text-center p-6 shadow-xl rounded-lg">
            <img
              src="public\Images\card4.png"
              alt="Delivery"
              className="mx-auto h-30 mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              Fast & Reliable Delivery
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Get your purchases delivered quickly and safely.
            </p>
          </div>

          {/* Card 5 */}
          <div className="text-center p-6 shadow-xl rounded-lg">
            <img
              src="public\Images\card5.png"
              alt="Support"
              className="mx-auto h-35 mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              24/7 Customer Support
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              We're here to help, anytime, anywhere.
            </p>
          </div>

          {/* Card 6 */}
          <div className="text-center p-6 shadow-xl rounded-lg">
            <img
              src="public\Images\card6.png"
              alt="Returns"
              className="mx-auto h-30 mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              Easy Returns & Warranty
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Shop worry-free with hassle-free returns.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white py-10 p6 md:px-45">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-15 text-shadow-lg mt-15 ">
          -- Why Choose Us --
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center">
              <span className="text-blue-500 mr-3">✔️</span>
              Exclusive tech deals
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-3">✔️</span>
              Curated product selection
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-3">✔️</span>
              Affordable pricing
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-3">✔️</span>
              Customer-first service
            </li>
          </ul>

          
          <div className="text-gray-700 md:px-10">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✔️</span>
                🔐 Trust & Authenticity We only offer 100% genuine, verified
                products.
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✔️</span>
                🚀 Innovation First We stay ahead of the tech curve, bringing
                you the latest breakthroughs.
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✔️</span>
                ❤️ Customer-Centric Your satisfaction drives everything we do —
                from support to shipping.
              </li>
            </ul>
          </div>
        </div>
      </div>

<div className="bg-white py-10 px-6 md:px-45 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 mt-6">
          🛍️ Ready to Upgrade Your Tech?
        </h2>

        <div className="flex justify-center">
          <a
            href="/products"
            className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-500 transition-all"
          >
            Shop Now
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
