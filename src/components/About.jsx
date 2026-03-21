import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const offerCards = [
  {
    img: "/Images/card1.png",
    alt: "Latest Gadgets & Accessories",
    title: "Latest Gadgets & Accessories",
    desc: "Find the newest tech products with us.",
  },
  {
    img: "/Images/card2.png",
    alt: "Verified Products",
    title: "100% Genuine & Verified Products",
    desc: "We ensure all our products are authentic.",
  },
  {
    img: "/Images/card3.png",
    alt: "Secure Payments",
    title: "Secure Payments",
    desc: "Shop with confidence using secure payment options.",
  },
  {
    img: "/Images/card4.png",
    alt: "Fast Delivery",
    title: "Fast & Reliable Delivery",
    desc: "Get your purchases delivered quickly and safely.",
  },
  {
    img: "/Images/card5.png",
    alt: "Customer Support",
    title: "24/7 Customer Support",
    desc: "We're here to help, anytime, anywhere.",
  },
  {
    img: "/Images/card6.png",
    alt: "Easy Returns",
    title: "Easy Returns & Warranty",
    desc: "Shop worry-free with hassle-free returns.",
  },
];

const whyLeft = [
  "Exclusive tech deals",
  "Curated product selection",
  "Affordable pricing",
  "Customer-first service",
];

const whyRight = [
  "🔐 Trust & Authenticity — We only offer 100% genuine, verified products.",
  "🚀 Innovation First — We stay ahead of the tech curve, bringing you the latest breakthroughs.",
  "❤️ Customer-Centric — Your satisfaction drives everything we do — from support to shipping.",
];

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
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
      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 text-white py-14 sm:py-20 px-4 sm:px-6 text-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to <span className="text-yellow-300">TechSpace</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 max-w-xl mx-auto">
            Empowering your digital lifestyle with the latest in tech 🚀
          </p>
          <Link
            to="/products"
            className="inline-block bg-yellow-400 text-black font-semibold px-7 sm:px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition text-sm sm:text-base"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* ── Mission Section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-relaxed mb-4">
            At <span className="text-blue-600">TechSpace</span>, we believe
            technology should be{" "}
            <span className="text-purple-600">simple, reliable,</span> and
            accessible to everyone.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Our mission is to bring the latest gadgets and innovations right to
            your fingertips, with a seamless shopping experience you can trust.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/Images/about.png"
            alt="Tech Illustration showing modern devices"
            className="w-full max-w-sm sm:max-w-md"
          />
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10 sm:mb-12">
            — What We Offer —
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {offerCards.map(({ img, alt, title, desc }) => (
              <div
                key={title}
                className="bg-white text-center p-5 sm:p-6 shadow-md rounded-2xl hover:shadow-lg transition-shadow"
              >
                <img
                  src={img}
                  alt={alt}
                  className="mx-auto w-24 h-24 sm:w-28 sm:h-28 object-contain mb-4"
                />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10 sm:mb-12">
          — Why Choose Us —
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left */}
          <ul className="space-y-4">
            {whyLeft.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-gray-700 text-sm sm:text-base"
              >
                <span className="text-blue-500 text-lg">✔️</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Right */}
          <ul className="space-y-4">
            {whyRight.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
              >
                <span className="text-blue-500 text-lg mt-0.5">✔️</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12 sm:py-14 px-4 sm:px-6 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          🛍️ Ready to Upgrade Your Tech?
        </h2>
        <p className="text-white/75 mb-6 text-sm sm:text-base max-w-md mx-auto">
          Browse our full range of verified tech products today.
        </p>
        <Link
          to="/products"
          className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition text-sm sm:text-base"
        >
          Shop Now
        </Link>
      </section>
    </>
  );
};

export default About;
