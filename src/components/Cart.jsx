import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../services/firebase.services";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async (uid) => {
    try {
      const cartRef = collection(db, "users", uid, "cart");
      const snapshot = await getDocs(cartRef);
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        quantity: 1,
        ...d.data(),
      }));
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCartItems(user.uid);
      } else {
        setCartItems([]);
        setLoading(false);
        navigate("/login");
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const updateQuantity = (itemId, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(1, (item.quantity || 1) + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItemFromCart = async (itemId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    setRemovingId(itemId);
    try {
      await deleteDoc(doc(db, "users", user.uid, "cart", itemId));
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return parseFloat(String(price).replace(/[^0-9.-]+/g, "")) || 0;
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 1),
    0
  );

  if (checkingAuth || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="text-6xl sm:text-7xl mb-4">🛒</div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
          Your cart is empty!
        </h2>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Add some products to see them here.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            🛒 Your Cart
          </h1>
          <p className="text-white/70 mt-1 text-sm sm:text-base">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Cart Items */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-full h-40 sm:h-44 flex items-center justify-center bg-gray-50 p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 flex-grow line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-purple-600 mb-3">
                      {item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm text-gray-500">Quantity:</span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold hover:bg-red-600 transition text-sm"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm sm:text-base font-semibold min-w-[20px] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold hover:bg-green-600 transition text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <p className="text-xs text-gray-400 mb-3 text-right">
                      Subtotal:{" "}
                      <span className="font-semibold text-gray-700">
                        ₹{(parsePrice(item.price) * (item.quantity || 1)).toLocaleString("en-IN")}
                      </span>
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      disabled={removingId === item.id}
                      className="w-full py-2 sm:py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium text-sm disabled:opacity-60"
                    >
                      {removingId === item.id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 xl:w-96">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 sticky top-24">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate max-w-[60%]">
                      {item.name} × {item.quantity || 1}
                    </span>
                    <span className="font-medium">
                      ₹{(parsePrice(item.price) * (item.quantity || 1)).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-purple-600">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>

              <button
                onClick={() => navigate("/payment")}
                className="w-full py-3 sm:py-3.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition text-sm sm:text-base active:scale-95"
              >
                Proceed to Checkout →
              </button>

              <Link
                to="/products"
                className="block w-full mt-3 py-2.5 text-center text-purple-600 border border-purple-200 rounded-xl hover:bg-purple-50 transition text-sm font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
