import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Blogs from "./components/Blogs";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";




function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              !sessionStorage.getItem("authToken") ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !sessionStorage.getItem("authToken") ? (
                <Register />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
