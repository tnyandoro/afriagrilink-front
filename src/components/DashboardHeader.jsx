// src/components/DashboardHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally notify backend
    const token = localStorage.getItem("token");

    // Clear session locally
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-green-700 text-white p-4 shadow-md rounded-lg mb-6">
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      <button
        onClick={handleLogout}
        className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg font-medium"
      >
        Logout
      </button>
    </header>
  );
};

export default DashboardHeader;
