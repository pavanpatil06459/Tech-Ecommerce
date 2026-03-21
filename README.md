# 🚀 TechSpace — Tech E-Commerce Web App

A modern **Tech E-Commerce Web Application** built using **React, Firebase, and Tailwind CSS**.
Users can browse products, manage cart, and experience a smooth, responsive shopping flow.

---

## 🌐 Live Demo

👉 *(Add your deployed link here)*

---

## ✨ Key Features

### 🔐 Authentication

* Firebase Email/Password login & register
* Protected routes (Cart, Contact, Payment)
* Session-based authentication

### 🛒 Shopping Cart

* Add to cart (no duplicates)
* Increase / decrease quantity
* Remove items with real-time update
* Cart synced with Firebase Firestore

### 💰 Pricing System

* Dynamic item subtotal
* Real-time total cart calculation
* Order summary UI

### 📱 Responsive UI

* Mobile-first design
* Responsive grid layout (1 → 4 columns)
* Hamburger menu for mobile

### 🎨 UI/UX Enhancements

* Smooth animations (Framer Motion, AOS)
* Toast notifications
* Loading spinners
* Interactive product carousel

---

## 🛠 Tech Stack

* **Frontend:** React 19
* **Styling:** Tailwind CSS
* **Routing:** React Router
* **Backend:** Firebase (Auth + Firestore)
* **Build Tool:** Vite

---

## 📁 Project Structure

```
techspace/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── firebase.json
└── package.json
```

---

## ⚙️ How It Works

* Products fetched from Firestore
* User authentication handled via Firebase
* Cart stored per user
* UI updates dynamically based on state

---

## 🚢 Deployment

Deployed using **Firebase Hosting**

```bash
npm run build
firebase deploy
```

---

## 📸 Screenshots

![Home](screenshots/home.png)
![Products](screenshots/products.png)
![Cart](screenshots/cart.png)
![Mobile](screenshots/mobile.png)

---

## 🚀 Future Improvements

* Payment integration (Razorpay / Stripe)
* Product search & filters
* Wishlist feature
* Admin dashboard

---

## 👨‍💻 Author

**Pawan Patil**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
