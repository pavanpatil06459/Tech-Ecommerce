import React, { useEffect, useState } from "react";
import { FaHeadphones, FaMobileAlt, FaLaptop, FaGamepad } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const slidesData = [
  {
    id: 0,
    title: "Wireless Headphones Pro",
    description:
      "Immerse yourself in crystal-clear sound with advanced noise cancellation and 30-hour battery life.",
    price: "₹199",
    imgSrc:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f2413d0-5c69-42fe-8b5d-2fdb0c99fd60.png",
    alt: "Wireless Headphones Pro",
  },
  {
    id: 1,
    title: "Gaming Laptop Ultra",
    description:
      "Dominate the game with top-tier specs, lightning-fast processor, and stunning visuals.",
    price: "₹1499",
    imgSrc:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a784cc3a-fa63-426d-99fe-a82a95e13b93.png",
    alt: "Gaming Laptop Ultra",
  },
  {
    id: 2,
    title: "Smart Watch Elite",
    description:
      "Track your health, receive notifications, and stay connected with style and precision.",
    price: "₹299",
    imgSrc:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e071685b-c6f7-4109-bc45-f232949822e4.png",
    alt: "Smart Watch Elite",
  },
];

const categories = [
  {
    icon: <FaHeadphones className="text-3xl sm:text-4xl mb-3 mx-auto" />,
    label: "Audio",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: <FaMobileAlt className="text-3xl sm:text-4xl mb-3 mx-auto" />,
    label: "Phones",
    gradient: "from-green-500 to-teal-600",
  },
  {
    icon: <FaLaptop className="text-3xl sm:text-4xl mb-3 mx-auto" />,
    label: "Laptops",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    icon: <FaGamepad className="text-3xl sm:text-4xl mb-3 mx-auto" />,
    label: "Gaming",
    gradient: "from-red-500 to-pink-600",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    AOS.init({ duration: 1000, once: true });

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideInterval);
    };
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
      {/* ── Hero Section ── */}
      <section className="relative text-white overflow-hidden bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 py-16 sm:py-20 md:py-28 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Welcome to{" "}
            <span className="text-yellow-300 drop-shadow">TechSpace</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto text-white/90">
            Discover cutting-edge tech gadgets — from headphones to smartphones.
            Secure, fast shipping and unbeatable customer support.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              to="/products"
              className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg text-sm sm:text-base"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Background Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full h-auto"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </section>

      {/* ── Featured Products Slider ── */}
      <motion.section
        id="products"
        className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-10 text-center">
          Featured Products
        </h2>

        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Slides */}
          <div className="relative h-64 sm:h-72 md:h-80">
            {slidesData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center h-full p-4 sm:p-6 md:p-8 gap-4">
                  {/* Image */}
                  <div className="w-full sm:w-2/5 flex items-center justify-center">
                    <img
                      src={slide.imgSrc}
                      alt={slide.alt}
                      className="h-32 sm:h-44 md:h-52 object-contain"
                    />
                  </div>
                  {/* Content */}
                  <div className="w-full sm:w-3/5 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                      {slide.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">
                      {slide.description}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4 animate-pulse">
                      {slide.price}
                    </p>
                    <Link
                      to="/products"
                      className="inline-block bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition text-sm sm:text-base font-medium"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 pb-4">
            {slidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-purple-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Categories Section ── */}
      <motion.section
        id="categories"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-10 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map(({ icon, label, gradient }) => (
              <Link
                key={label}
                to="/products"
                className={`bg-gradient-to-br ${gradient} text-white p-6 sm:p-8 rounded-2xl text-center
                  hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                {icon}
                <h4 className="text-base sm:text-xl font-bold">{label}</h4>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Why TechSpace ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Why Choose TechSpace?
          </h2>
          <p className="text-gray-500 mb-10 text-sm sm:text-base max-w-xl mx-auto">
            We make buying tech simple, safe, and satisfying.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🚀", title: "Fast Delivery", desc: "Get your orders quickly and safely." },
              { icon: "🔐", title: "Secure Payments", desc: "Shop with confidence every time." },
              { icon: "🎧", title: "24/7 Support", desc: "We're always here to help you." },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition text-center"
              >
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-4 sm:px-6 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to upgrade your tech?</h2>
          <p className="text-white/80 mb-6 text-sm sm:text-base">
            Browse hundreds of verified products at unbeatable prices.
          </p>
          <Link
            to="/products"
            className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition text-sm sm:text-base"
          >
            Shop Now 🛍️
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
