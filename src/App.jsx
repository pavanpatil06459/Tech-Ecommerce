import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import './App.css';

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
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
