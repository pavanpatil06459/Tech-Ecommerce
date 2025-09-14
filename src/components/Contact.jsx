import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";
import db from "../services/firebase.services"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [buttonError, setButtonError] = useState(false);
  const [buttonSuccess, setButtonSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const successSoundRef = useRef(null);
  const navigate = useNavigate();

  // Check user authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Page loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setButtonError(true);
      setTimeout(() => setButtonError(false), 500);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to send a message.");
      navigate("/login");
      return;
    }

    if (!validateForm()) return;

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        userId: user.uid,
        timestamp: Timestamp.now(),
      });

      if (successSoundRef.current) {
        successSoundRef.current.play();
      }

      setSuccess(true);
      setButtonSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setButtonSuccess(false), 1500);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("❌ Error saving message to Firestore:", error);
    }
  };

  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-800 px-6 md:px-20 py-16 overflow-hidden">
      {/* Background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#6366f1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>

      {/* Sound */}
      <audio ref={successSoundRef} src="/sounds/success.mp3" preload="auto" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-indigo-700">📞 Get in Touch</h1>
          <p className="text-lg text-gray-600">Have questions or feedback? We’d love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-6 bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-indigo-600 text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Our Address</h3>
                <p className="text-gray-600">123 Tech Street, Pune, India</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-indigo-600 text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p className="text-gray-600">support@techworld.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-indigo-600 text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Call Us</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Send us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <motion.input
                animate={errors.name ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              {/* Email */}
              <motion.input
                animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              {/* Message */}
              <motion.textarea
                animate={errors.message ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${
                  errors.message ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"
                }`}
              ></motion.textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

              {/* Submit */}
              <motion.button
                animate={
                  buttonError
                    ? { x: [-10, 10, -10, 10, 0], backgroundColor: "#dc2626" }
                    : buttonSuccess
                    ? {
                        boxShadow: "0px 0px 15px 4px rgba(34,197,94,0.7)",
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-700 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3 animate-bounce" />
              <h2 className="text-xl font-semibold">Message Sent Successfully!</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
