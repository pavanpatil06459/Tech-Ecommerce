import React, { useState, useEffect } from "react";
import db from "../services/firebase.services"; // ✅ Corrected path
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const categories = [
    "Mobile Phones",
    "Laptops",
    "Audio",
    "Mobile Accessories",
    "Gaming",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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

  const handleAddToCart = async (product) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const cartItemRef = doc(db, "users", user.uid, "cart", product.id);

      await setDoc(cartItemRef, {
        ...product,
        quantity: 1,
      });

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 px-6 md:px-20 py-16 scroll-smooth">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-4xl font-bold mb-4 text-purple-700">
          🛍️ Explore Our Tech Products
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest gadgets, accessories, and devices to level up your
          digital lifestyle.
        </p>
      </div>

      {/* Category navbar */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const id = category.replace(/\s+/g, "-");
            return (
              <a
                key={category}
                href={`#${id}`}
                className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm md:text-base hover:bg-purple-700 transition"
              >
                {category}
              </a>
            );
          })}
        </div>
      </div>

      {/* Category Sections */}
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category
        );
        const id = category.replace(/\s+/g, "-");

        return (
          <section key={category} id={id} className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-purple-600 border-b-2 border-purple-300 inline-block">
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-8xl">
              {categoryProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
                >
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-t-xl overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-purple-600 mb-4">
                      {product.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Products;
