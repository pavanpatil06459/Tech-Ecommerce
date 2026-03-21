import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../enviroment";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState("checking"); // "checking" | "authenticated" | "unauthenticated"

  useEffect(() => {
    // ✅ Double-check: verify BOTH the sessionStorage token AND Firebase's own auth state.
    // This means even if someone manually sets a fake token in sessionStorage,
    // Firebase will reject them. And if Firebase auto-restores a session from
    // another device (before persistence fix takes effect), sessionStorage blocks it.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const token = sessionStorage.getItem("authToken");

      if (user && token) {
        // Both checks pass — genuinely authenticated in this session
        setAuthState("authenticated");
      } else {
        // Either Firebase says not logged in, or no session token — redirect to login
        setAuthState("unauthenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  if (authState === "checking") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
