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
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const successSoundRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
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

    setSubmitting(true);
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        userId: user.uid,
        timestamp: Timestamp.now(),
      });

      successSoundRef.current?.play();
      setSuccess(true);
      setButtonSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setButtonSuccess(false), 1500);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving message:", error);
    } finally {
      setSubmitting(false);
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

  const contactInfo = [
    { icon: <FaMapMarkerAlt className="text-indigo-600 text-xl sm:text-2xl flex-shrink-0" />, title: "Our Address", detail: "123 Tech Street, Pune, India" },
    { icon: <FaEnvelope className="text-indigo-600 text-xl sm:text-2xl flex-shrink-0" />, title: "Email Us", detail: "support@techworld.com" },
    { icon: <FaPhone className="text-indigo-600 text-xl sm:text-2xl flex-shrink-0" />, title: "Call Us", detail: "+91 98765 43210" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-14 overflow-hidden">
      {/* Background dots */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#6366f1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>

      <audio ref={successSoundRef} src="/sounds/success.mp3" preload="auto" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-indigo-700">
            📞 Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center space-y-5 bg-white p-5 sm:p-7 md:p-8 rounded-2xl shadow-md"
          >
            {contactInfo.map(({ icon, title, detail }) => (
              <div key={title} className="flex items-start space-x-4">
                <div className="mt-0.5">{icon}</div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                  <p className="text-gray-500 text-sm sm:text-base">{detail}</p>
                </div>
              </div>
            ))}

            {/* Map embed placeholder */}
            <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 h-36 sm:h-44 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400 text-sm">📍 Pune, Maharashtra, India</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl shadow-md"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-indigo-700">
              Send us a Message
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div>
                <motion.input
                  animate={errors.name ? { x: [-8, 8, -8, 8, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 text-sm sm:text-base transition
                    ${errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <motion.input
                  animate={errors.email ? { x: [-8, 8, -8, 8, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 text-sm sm:text-base transition
                    ${errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <motion.textarea
                  animate={errors.message ? { x: [-8, 8, -8, 8, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 text-sm sm:text-base resize-none transition
                    ${errors.message ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                animate={
                  buttonError
                    ? { x: [-8, 8, -8, 8, 0] }
                    : buttonSuccess
                    ? { scale: [1, 1.05, 1] }
                    : {}
                }
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={submitting}
                className={`w-full py-3 rounded-xl font-semibold text-sm sm:text-base transition-all
                  ${buttonSuccess
                    ? "bg-green-500 text-white"
                    : buttonError
                    ? "bg-red-500 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                  } ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {submitting ? "Sending..." : buttonSuccess ? "✓ Sent!" : "Send Message"}
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
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4"
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-xs w-full">
              <FaCheckCircle className="text-green-500 text-4xl sm:text-5xl mx-auto mb-3 animate-bounce" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Message Sent Successfully!
              </h2>
              <p className="text-gray-500 text-sm mt-1">We'll get back to you soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
