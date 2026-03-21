import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "../services/firebase.services";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Fetch cart items from Firestore for the authenticated user
  const fetchCartItems = async (uid) => {
    try {
      const cartRef = collection(db, "users", uid, "cart");
      const snapshot = await getDocs(cartRef);

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        quantity: 1,
        ...doc.data(),
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
        // No alert here on logout or page load, just redirect silently
        setCartItems([]);
        setLoading(false);
        navigate("/login");
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const incrementQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = (item.quantity || 1) - 1;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const removeItemFromCart = async (itemId) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to modify your cart.");
      navigate("/login");
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid, "cart", itemId);
      await deleteDoc(docRef);

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + (priceNumber * (item.quantity || 1));
  }, 0);

  if (checkingAuth || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600 pb-10">
        <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty!</h2>
        <p>Add some products to see them here.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-16 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-purple-700">
        🛒 Your Cart
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
          >
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover rounded-t-xl"
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2 flex-grow">{item.description}</p>
              <p className="text-lg font-bold text-purple-600 mb-4">{item.price}</p>

              <div className="flex items-center gap-4 mb-4 justify-center sm:justify-start">
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold hover:bg-red-600 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <span className="text-lg font-semibold min-w-[24px] text-center">{item.quantity || 1}</span>

                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold hover:bg-green-600 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItemFromCart(item.id)}
                className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-semibold"
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-md mx-auto text-center px-4">
        <p className="text-xl font-bold text-gray-800 mb-4">
          Total: ₹{totalPrice.toLocaleString("en-IN")}
        </p>
        <button
          onClick={() => alert("Checkout functionality coming soon!")}
          className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
