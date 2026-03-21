import React, { useState, useEffect } from "react";
import db from "../services/firebase.services";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const categories = [
  "Mobile Phones",
  "Laptops",
  "Audio",
  "Mobile Accessories",
  "Gaming",
];

// Toast notification component
const Toast = ({ toasts }) => (
  <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col gap-2 items-end">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium
          animate-slideUp transition-all duration-300
          ${t.type === "success" ? "bg-green-500" : t.type === "warning" ? "bg-amber-500" : "bg-red-500"}`}
      >
        <span className="text-base">
          {t.type === "success" ? "✅" : t.type === "warning" ? "⚠️" : "❌"}
        </span>
        {t.message}
      </div>
    ))}
  </div>
);

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [cartProductIds, setCartProductIds] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Show a toast notification
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  // Track auth and fetch existing cart items for the user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const cartRef = collection(db, "users", user.uid, "cart");
          const snapshot = await getDocs(cartRef);
          const ids = new Set(snapshot.docs.map((d) => d.id));
          setCartProductIds(ids);
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      } else {
        setCartProductIds(new Set());
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        const productsData = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!currentUser) {
      showToast("Please log in to add items to your cart.", "warning");
      navigate("/login");
      return;
    }

    // ✅ Check if already in cart — no Firestore call needed, use local state
    if (cartProductIds.has(product.id)) {
      showToast("Already in your cart!", "warning");
      return;
    }

    setAddingId(product.id);
    try {
      const cartItemRef = doc(db, "users", currentUser.uid, "cart", product.id);
      await setDoc(cartItemRef, { ...product, quantity: 1 });

      // Update local cart set so further clicks are instant
      setCartProductIds((prev) => new Set([...prev, product.id]));
      showToast(`${product.name} added to cart!`, "success");
      setTimeout(() => setAddingId(null), 1000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Failed to add item. Try again.", "error");
      setAddingId(null);
    }
  };

  const scrollToCategory = (category) => {
    const id = category.replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // header height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading Products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Toast Notifications */}
      <Toast toasts={toasts} />

      {/* Page Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-10 sm:py-14 px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          🛍️ Explore Our Tech Products
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
          Discover the latest gadgets, accessories, and devices to level up your
          digital lifestyle.
        </p>
      </div>

      {/* Sticky Category Navbar */}
      <div className="sticky top-[60px] z-30 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0 sm:flex-wrap sm:justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${activeCategory === category
                    ? "bg-purple-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category === category
          );
          if (categoryProducts.length === 0) return null;

          const id = category.replace(/\s+/g, "-");

          return (
            <section key={category} id={id} className="mb-12 sm:mb-16 scroll-mt-36">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-700">
                  {category}
                </h2>
                <div className="flex-1 h-[2px] bg-purple-100 rounded" />
                <span className="text-xs sm:text-sm text-gray-400">
                  {categoryProducts.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {categoryProducts.map((product) => (
                  <article
                    key={product.id}
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="w-full h-44 sm:h-48 flex items-center justify-center bg-gray-50 p-3 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mb-3 flex-grow line-clamp-3">
                        {product.description}
                      </p>
                      <p className="text-base sm:text-lg font-bold text-purple-600 mb-3">
                        {product.price}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={addingId === product.id || cartProductIds.has(product.id)}
                        className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2
                          ${cartProductIds.has(product.id)
                            ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed focus:ring-gray-200"
                            : addingId === product.id
                            ? "bg-green-500 text-white scale-95 focus:ring-green-400"
                            : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95 focus:ring-purple-400"
                          }`}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {cartProductIds.has(product.id)
                          ? "✓ Already in Cart"
                          : addingId === product.id
                          ? "Adding..."
                          : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
