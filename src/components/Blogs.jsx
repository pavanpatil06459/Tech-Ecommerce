import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

const blogCards = [
  {
    img: "/Images/top_5_mobile-removebg-preview.png",
    title: "Top 5 Smartphones of 2025",
    desc: "Discover the best phones this year based on performance, camera, and innovation.",
  },
  {
    img: "/Images/blogs2.jpg",
    title: "AI in Everyday Gadgets",
    desc: "Explore how AI is powering your smart devices and improving daily tasks.",
  },
  {
    img: "/Images/blogs3.jpg",
    title: "Smart Home on a Budget",
    desc: "Learn how to upgrade your home with affordable and easy-to-use smart tech.",
  },
];

const trendingCards = [
  {
    title: "Foldable Phones Revolution",
    desc: "Everything you need to know about the new era of foldables.",
    img: "/Images/fold2.jpg",
  },
  {
    title: "Metaverse Devices",
    desc: "How gadgets are adapting for virtual realities.",
    img: "/Images/metadevice.jpg",
  },
  {
    title: "Green Tech Innovations",
    desc: "Eco-friendly gadgets that save energy and reduce e-waste.",
    img: "/Images/greentech.jpg",
  },
];

const stats = [
  { number: 75, suffix: "%", label: "Consumers Use Smart Devices Daily" },
  { number: 4.3, suffix: "⭐", label: "Avg. Rating of Reviewed Gadgets" },
  { number: 120, suffix: "+", label: "Tech Brands Featured" },
  { number: 98, suffix: "%", label: "Positive Reader Feedback" },
];

const testimonials = [
  { name: "Amit S.", comment: "The best tech blog I've followed — insightful and current!" },
  { name: "Sara M.", comment: "Great reviews that helped me pick my smart home setup." },
  { name: "Lee W.", comment: "Love the design and clarity of information. Subscribed!" },
];

const categories = ["Tech News", "How-To Guides", "Product Reviews", "Tech Tips", "Upcoming Innovations"];

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading Blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 sm:py-16 px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          📰 Stay Updated with the Latest in Tech
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">
          Explore articles, tips, and insights on the newest gadgets, innovations,
          and digital lifestyle trends.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── Categories ── */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-200 cursor-pointer transition"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* ── Blog Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-20">
          {blogCards.map((card, idx) => (
            <div key={idx} className="bg-white border shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-44 sm:h-48 overflow-hidden bg-gray-100">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-3">{card.desc}</p>
                <a href="#" className="text-blue-500 hover:underline font-medium text-sm">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Trending ── */}
        <div className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-purple-700">
            🔥 Trending This Week
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {trendingCards.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="h-44 sm:h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3">{item.desc}</p>
                  <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                    Explore More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Video Section ── */}
        <div className="bg-gray-50 rounded-2xl p-5 sm:p-8 md:p-10 mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            🎥 Watch: Tech in Action
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/m47dxEt1S9E?autoplay=1&mute=1"
                title="Tech Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Behind the Scenes of Smart Gadgets
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Get a closer look at how modern tech products are developed,
                tested, and brought to life.
              </p>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="mb-14 sm:mb-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-8 sm:mb-10">
            📊 Tech By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-purple-50 border border-purple-100 p-4 sm:p-6 rounded-2xl shadow hover:scale-105 transition"
              >
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-2">
                  <CountUp
                    end={stat.number}
                    duration={2}
                    decimals={stat.number % 1 !== 0 ? 1 : 0}
                  />
                  {stat.suffix}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
            💬 What Readers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((user, idx) => (
              <div key={idx} className="bg-gray-50 border p-5 sm:p-6 rounded-2xl shadow-sm">
                <p className="text-gray-600 text-sm sm:text-base mb-3 italic">
                  "{user.comment}"
                </p>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  — {user.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div className="bg-blue-50 border border-blue-100 p-6 sm:p-8 rounded-2xl text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            📬 Don't miss a single update
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mb-5">
            Subscribe to our newsletter and stay ahead in the world of tech.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <button
              onClick={() => { if (email) { alert("Subscribed!"); setEmail(""); } }}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
