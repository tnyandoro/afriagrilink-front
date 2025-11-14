import React from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;

    const userData = {
      email: form.email.value,
      password: form.password.value,
      password_confirmation: form.password_confirmation.value,
      name: form.name.value,
      role: form.role.value,
    };

    try {
      const res = await axios.post("/users", userData);
      console.log("Registration successful:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-register-bg bg-cover bg-center flex items-center justify-center relative">
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      <form
        onSubmit={handleRegister}
        className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          required
        />
        <select
          name="role"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          required
        >
          <option value="">Select Role</option>
          <option value="farmer">Farmer</option>
          <option value="trucking">Trucker</option>
          <option value="market">Market</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
