import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/background.jpg";

const RegistrationLanding = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100%",
      }}
    >
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8 px-4 sm:px-6 md:px-8 w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl">
          Welcome to AgriAfriLink
        </h1>

        <div className="flex flex-col space-y-4 w-full px-4 sm:px-0">
          <button
            onClick={() => navigate("/register/farmer")}
            className="w-full bg-green-600 text-white py-3 sm:py-4 md:py-5 rounded-lg hover:bg-green-700 transition text-base sm:text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl"
          >
            Register as Farmer
          </button>
          <button
            onClick={() => navigate("/register/trucker")}
            className="w-full bg-blue-600 text-white py-3 sm:py-4 md:py-5 rounded-lg hover:bg-blue-700 transition text-base sm:text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl"
          >
            Register as Trucker
          </button>
          <button
            onClick={() => navigate("/register/market")}
            className="w-full bg-orange-600 text-white py-3 sm:py-4 md:py-5 rounded-lg hover:bg-orange-700 transition text-base sm:text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl"
          >
            Register as Market
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gray-600 text-white py-3 sm:py-4 md:py-5 rounded-lg hover:bg-gray-700 transition text-base sm:text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLanding;
