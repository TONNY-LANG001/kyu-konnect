import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/me`, { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogout = () => {
    window.location.href = `${API_URL}/logout`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">KyU-Konnect Login</h1>

      {!user ? (
        <button
          onClick={handleGoogleLogin}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">✅ Logged in as {user.displayName}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

