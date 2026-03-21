import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

const Blogs = () => {
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
          <p className="mt-4 text-gray-700 font-medium">Loading Blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 px-6 md:px-20 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          📰 Stay Updated with the Latest in Tech
        </h1>
        <p className="text-lg text-gray-600">
          Explore articles, tips, and insights on the newest gadgets,
          innovations, and digital lifestyle trends.
        </p>
      </div>

      {/* Blog Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[
          "Tech News",
          "How-To Guides",
          "Product Reviews",
          "Tech Tips",
          "Upcoming Innovations",
        ].map((category, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm hover:bg-blue-200 cursor-pointer transition"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-3 gap-10 mb-16">
        {/* Card 1 */}
        <div className="bg-white border shadow-md rounded-lg overflow-hidden">
          <img
            src="/Images/top_5_mobile-removebg-preview.png"
            alt="Smartphones"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2">
              Top 5 Smartphones of 2025
            </h3>
            <p className="text-gray-600 mb-4">
              Discover the best phones this year based on performance, camera,
              and innovation.
            </p>
            <a href="#" className="text-blue-500 hover:underline font-medium">
              Read More →
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border shadow-md rounded-lg overflow-hidden">
          <img
            src="/Images/blogs2.jpg"
            alt="AI Gadgets"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2">
              AI in Everyday Gadgets
            </h3>
            <p className="text-gray-600 mb-4">
              Explore how AI is powering your smart devices and improving daily
              tasks.
            </p>
            <a href="#" className="text-blue-500 hover:underline font-medium">
              Read More →
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border shadow-md rounded-lg overflow-hidden">
          <img
            src="/Images/blogs3.jpg"
            alt="Smart Home"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2">
              Smart Home on a Budget
            </h3>
            <p className="text-gray-600 mb-4">
              Learn how to upgrade your home with affordable and easy-to-use
              smart tech.
            </p>
            <a href="#" className="text-blue-500 hover:underline font-medium">
              Read More →
            </a>
          </div>
        </div>
      </div>

      {/* 🔥 Trending Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">
          🔥 Trending This Week
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
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
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                <a
                  href="#"
                  className="text-blue-600 mt-3 inline-block hover:underline"
                >
                  Explore More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎥 Tech Video Section */}
      <div className="mt-20 bg-gray-100 p-10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          🎥 Watch: Tech in Action
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <iframe
            className="w-full md:w-1/2 h-64 rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/m47dxEt1S9E?autoplay=1&mute=1"
            title="Tech Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-2">
              Behind the Scenes of Smart Gadgets
            </h3>
            <p className="text-gray-600 text-sm">
              Get a closer look at how modern tech products are developed,
              tested, and brought to life.
            </p>
          </div>
        </div>
      </div>

      {/* 📊 Stats Section with CountUp */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-10">
          📊 Tech By The Numbers
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: 75, suffix: "%", label: "Consumers Use Smart Devices Daily" },
            { number: 4.3, suffix: "⭐", label: "Avg. Rating of Reviewed Gadgets" },
            { number: 120, suffix: "+", label: "Tech Brands Featured" },
            { number: 98, suffix: "%", label: "Positive Reader Feedback" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-purple-100 p-6 rounded-lg shadow hover:scale-105 transition"
            >
              <h4 className="text-4xl font-bold text-purple-700 mb-2">
                <CountUp
                  end={stat.number}
                  duration={2}
                  decimals={stat.number % 1 !== 0 ? 1 : 0}
                />
                {stat.suffix}
              </h4>
              <p className="text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 💬 Testimonials Section */}
      <div className="mt-20 bg-white py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          💬 What Readers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 px-4 md:px-0">
          {[
            {
              name: "Amit S.",
              comment:
                "The best tech blog I've followed — insightful and current!",
            },
            {
              name: "Sara M.",
              comment: "Great reviews that helped me pick my smart home setup.",
            },
            {
              name: "Lee W.",
              comment:
                "Love the design and clarity of information. Subscribed!",
            },
          ].map((user, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-gray-700 mb-3">“{user.comment}”</p>
              <span className="text-sm font-semibold text-gray-600">
                — {user.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-blue-50 p-8 rounded-lg text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">
          📬 Don’t miss a single update
        </h3>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and stay ahead in the world of tech.
        </p>
        <form className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blogs;
