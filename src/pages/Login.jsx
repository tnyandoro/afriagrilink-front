import React from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post("/users/sign_in", {
        user: { email, password },
      });
      const user = res.data.user;
      const token = res.data.token;

      // Use the login function from AuthContext
      login(user, token);

      // Navigate to the appropriate dashboard
      navigate(`/dashboard/${user.user_role}`); // ✅ Fixed: proper function call
    } catch (err) {
      console.error("Login failed:", err.response?.data || err);
      alert(
        "Login failed: " + (err.response?.data?.error || "Check credentials")
      );
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          handleLogin(email, password);
        }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
