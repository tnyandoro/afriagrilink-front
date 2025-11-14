// src/pages/FarmerRegister.jsx
import React, { useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const FarmerRegister = () => {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([""]);
  const [livestock, setLivestock] = useState([""]);
  const [produceTypes, setProduceTypes] = useState([""]);
  const [certifications, setCertifications] = useState([""]);

  const handleArrayChange = (setter, index, value, array) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

  const addArrayItem = (setter, array) => setter([...array, ""]);
  const removeArrayItem = (setter, array, index) =>
    setter(array.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      user: {
        email: form.email.value,
        phone_number: form.phone_number.value,
        password: form.password.value,
        password_confirmation: form.password_confirmation.value,
        user_role: "farmer",
        farmer_profile_attributes: {
          full_name: form.full_name.value,
          farm_name: form.farm_name.value,
          production_capacity: form.production_capacity.value,
          farm_location: { address: form.farm_location.value },
          crops: crops.filter(Boolean),
          livestock: livestock.filter(Boolean),
          produce_types: produceTypes.filter(Boolean),
          certifications: certifications.filter(Boolean),
        },
      },
    };

    try {
      await axios.post("/users", payload);
      alert("Farmer registered successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(
        "Error registering farmer: " +
          (err.response?.data?.errors?.join(", ") || "Please check your input.")
      );
    }
  };

  const renderArrayInputs = (array, setter, label) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1 text-gray-700">{label}</label>
      {array.map((item, index) => (
        <div key={index} className="flex space-x-2 mt-1">
          <input
            value={item}
            onChange={(e) =>
              handleArrayChange(setter, index, e.target.value, array)
            }
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => removeArrayItem(setter, array, index)}
            className="text-red-500 font-bold hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem(setter, array)}
        className="mt-2 text-blue-600 font-medium hover:text-blue-800"
      >
        + Add {label}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 md:p-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Farmer Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="full_name"
            placeholder="Full Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="farm_name"
            placeholder="Farm Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="production_capacity"
            placeholder="Production Capacity"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="farm_location"
            placeholder="Farm Address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="phone_number"
            placeholder="Phone Number (e.g. +263771234567)"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mt-6">
          {renderArrayInputs(produceTypes, setProduceTypes, "Produce Types")}
          {renderArrayInputs(crops, setCrops, "Crops")}
          {renderArrayInputs(livestock, setLivestock, "Livestock")}
          {renderArrayInputs(
            certifications,
            setCertifications,
            "Certifications"
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default FarmerRegister;
