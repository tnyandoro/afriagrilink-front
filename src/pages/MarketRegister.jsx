// src/pages/MarketRegister.jsx
import React, { useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const MarketRegister = () => {
  const navigate = useNavigate();

  const [preferredProduces, setPreferredProduces] = useState([""]);

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
        password: form.password.value,
        password_confirmation: form.password_confirmation.value,
        user_role: "market",
        market_profile_attributes: {
          market_name: form.market_name.value,
          market_type: form.market_type.value,
          contact_person: form.contact_person.value,
          description: form.description.value,
          purchase_volume: form.purchase_volume.value,
          delivery_preferences: form.delivery_preferences.value,
          organic_certified: form.organic_certified.checked,
          gap_certified: form.gap_certified.checked,
          haccp_certified: form.haccp_certified.checked,
          demand_volume: form.demand_volume.value,
          payment_terms: form.payment_terms.value,
          operating_hours: form.operating_hours.value,
          additional_requirements: form.additional_requirements.value,
          location: {
            address: form.location.value,
          },
          preferred_produces: preferredProduces.filter(Boolean),
        },
      },
    };

    try {
      await axios.post("/users", payload);
      alert("Market registered successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error registering market.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl mb-4">Market Registration</h2>

      <input
        name="market_name"
        placeholder="Market Name"
        className="w-full mb-3 p-2 border"
        required
      />
      <input
        name="market_type"
        placeholder="Market Type"
        className="w-full mb-3 p-2 border"
      />
      <input
        name="contact_person"
        placeholder="Contact Person"
        className="w-full mb-3 p-2 border"
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full mb-3 p-2 border"
      />
      <input
        name="purchase_volume"
        placeholder="Purchase Volume"
        className="w-full mb-3 p-2 border"
      />
      <input
        name="delivery_preferences"
        placeholder="Delivery Preferences"
        className="w-full mb-3 p-2 border"
      />
      <input
        name="demand_volume"
        placeholder="Demand Volume"
        className="w-full mb-3 p-2 border"
      />
      <input
        name="payment_terms"
        placeholder="Payment Terms"
        className="w-full mb-3 p-2 border"
      />
      <input
        name="operating_hours"
        placeholder="Operating Hours"
        className="w-full mb-3 p-2 border"
      />
      <textarea
        name="additional_requirements"
        placeholder="Additional Requirements"
        className="w-full mb-3 p-2 border"
      />

      <input
        name="location"
        placeholder="Market Address"
        className="w-full mb-3 p-2 border"
      />

      {/* Certifications */}
      <div className="mb-3">
        <label className="block font-semibold">Certifications</label>
        <div className="flex space-x-4 mt-1">
          <label>
            <input type="checkbox" name="organic_certified" /> Organic
          </label>
          <label>
            <input type="checkbox" name="gap_certified" /> GAP
          </label>
          <label>
            <input type="checkbox" name="haccp_certified" /> HACCP
          </label>
        </div>
      </div>

      {/* Preferred Produces */}
      <div className="mb-3">
        <label className="block font-semibold">Preferred Produces</label>
        {preferredProduces.map((item, index) => (
          <div key={index} className="flex space-x-2 mt-1">
            <input
              value={item}
              onChange={(e) =>
                handleArrayChange(
                  setPreferredProduces,
                  index,
                  e.target.value,
                  preferredProduces
                )
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() =>
                removeArrayItem(setPreferredProduces, preferredProduces, index)
              }
              className="text-red-500 font-bold"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(setPreferredProduces, preferredProduces)}
          className="mt-1 text-blue-600 font-semibold"
        >
          + Add Produce
        </button>
      </div>

      <input
        name="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border"
        required
      />
      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        className="w-full mb-3 p-2 border"
        required
      />

      <button
        type="submit"
        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Register
      </button>
    </form>
  );
};

export default MarketRegister;
