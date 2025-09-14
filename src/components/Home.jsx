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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true); // 🔹 loading state

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);

    AOS.init({ duration: 1000 });
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
      {/* Hero Section */}
      <section
        id="home"
        className="hero-bg text-white py-20 px-6 relative overflow-hidden bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto text-center relative z-10"
        >
          <h2 className="text-5xl font-extrabold mb-4 leading-tight">
            <span className="typewriter">
              Welcome to <span className="color-change">TechSpace</span>
            </span>
          </h2>

          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover cutting-edge tech gadgets, from headphones to smartphones.
            Secure, fast shipping and unbeatable customer support.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 shadow-lg">
              <a href="/products">
              Shop Now
              </a>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition duration-200">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Background Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#09194d8e"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,149.3C384,117,480,75,576,64C672,53,768,75,
    864,112C960,149,1056,203,1152,229.3C1248,256,1344,256,1392,256L1440,256L1440,320L1392,
    320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,
    320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </section>

      {/* Featured Products */}
      <motion.section
        id="products"
        className="container mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Products
        </h3>

        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-72 md:h-[22rem]">
            {slidesData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100 z-10 pointer-events-auto"
                    : "translate-x-full opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  <div className="md:w-1/2 p-8">
                    <img
                      src={slide.imgSrc}
                      alt={slide.alt}
                      className="w-full h-40 md:h-56 object-contain rounded-md"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 text-center md:text-left">
                    <h4 className="text-2xl font-bold mb-4">{slide.title}</h4>
                    <p className="text-gray-600 mb-6">{slide.description}</p>
                    <p className="text-3xl font-bold text-purple-600 mb-6 animate-pulse">
                      {slide.price}
                    </p>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slidesData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentSlide ? "bg-purple-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCurrentSlide(index);
                  }
                }}
              ></div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        id="categories"
        className="py-16 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg text-center hover-lift cursor-pointer">
              <FaHeadphones className="text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-bold">Audio</h4>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8 rounded-lg text-center hover-lift cursor-pointer">
              <FaMobileAlt className="text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-bold">Phones</h4>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-8 rounded-lg text-center hover-lift cursor-pointer">
              <FaLaptop className="text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-bold">Laptops</h4>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 rounded-lg text-center hover-lift cursor-pointer">
              <FaGamepad className="text-4xl mb-4 mx-auto" />
              <h4 className="text-xl font-bold">Gaming</h4>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
