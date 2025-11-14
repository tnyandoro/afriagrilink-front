// src/pages/TruckerRegister.jsx
import React, { useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

const TruckerRegister = () => {
  const navigate = useNavigate();

  const [registrationNumbers, setRegistrationNumbers] = useState([""]);
  const [vehicleTypes, setVehicleTypes] = useState([""]);
  const [routes, setRoutes] = useState([{ from: "", to: "", distance: "" }]);
  const [rates, setRates] = useState([{ type: "", rate: "", currency: "ZAR" }]);

  const handleArrayChange = (setter, index, value, array) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

  const handleObjectArrayChange = (setter, index, field, value, array) => {
    const newArray = [...array];
    newArray[index][field] = value;
    setter(newArray);
  };

  const addArrayItem = (setter, array, newItem) => setter([...array, newItem]);
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
        user_role: "trucker",
        trucking_company_attributes: {
          company_name: form.company_name.value,
          fleet_size: form.fleet_size.value,
          contact_person: form.contact_person.value,
          vehicle_types: vehicleTypes.filter(Boolean),
          registration_numbers: registrationNumbers.filter(Boolean),
          routes: routes.filter((r) => r.from || r.to || r.distance),
          rates: rates.filter((r) => r.type || r.rate),
        },
      },
    };

    try {
      await axios.post("/users", payload);
      alert("Trucker registered successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error registering trucker.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader title="Trucking Company Dashboard" />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl mb-4">Trucker Registration</h2>

        <input
          name="company_name"
          placeholder="Company Name"
          className="w-full mb-3 p-2 border"
          required
        />
        <input
          name="fleet_size"
          placeholder="Fleet Size"
          className="w-full mb-3 p-2 border"
        />
        <input
          name="contact_person"
          placeholder="Contact Person"
          className="w-full mb-3 p-2 border"
        />

        {/* Vehicle Types */}
        <div className="mb-3">
          <label className="block font-semibold">Vehicle Types</label>
          {vehicleTypes.map((v, i) => (
            <div key={i} className="flex space-x-2 mt-1">
              <input
                value={v}
                onChange={(e) =>
                  handleArrayChange(
                    setVehicleTypes,
                    i,
                    e.target.value,
                    vehicleTypes
                  )
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() =>
                  removeArrayItem(setVehicleTypes, vehicleTypes, i)
                }
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem(setVehicleTypes, vehicleTypes, "")}
            className="mt-1 text-blue-600 font-semibold"
          >
            + Add Vehicle Type
          </button>
        </div>

        {/* Registration Numbers */}
        <div className="mb-3">
          <label className="block font-semibold">Registration Numbers</label>
          {registrationNumbers.map((v, i) => (
            <div key={i} className="flex space-x-2 mt-1">
              <input
                value={v}
                onChange={(e) =>
                  handleArrayChange(
                    setRegistrationNumbers,
                    i,
                    e.target.value,
                    registrationNumbers
                  )
                }
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() =>
                  removeArrayItem(
                    setRegistrationNumbers,
                    registrationNumbers,
                    i
                  )
                }
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem(setRegistrationNumbers, registrationNumbers, "")
            }
            className="mt-1 text-blue-600 font-semibold"
          >
            + Add Registration Number
          </button>
        </div>

        {/* Routes */}
        <div className="mb-3">
          <label className="block font-semibold">Routes</label>
          {routes.map((r, i) => (
            <div key={i} className="flex space-x-2 mt-1">
              <input
                placeholder="From"
                value={r.from}
                onChange={(e) =>
                  handleObjectArrayChange(
                    setRoutes,
                    i,
                    "from",
                    e.target.value,
                    routes
                  )
                }
                className="p-2 border rounded flex-1"
              />
              <input
                placeholder="To"
                value={r.to}
                onChange={(e) =>
                  handleObjectArrayChange(
                    setRoutes,
                    i,
                    "to",
                    e.target.value,
                    routes
                  )
                }
                className="p-2 border rounded flex-1"
              />
              <input
                placeholder="Distance"
                value={r.distance}
                onChange={(e) =>
                  handleObjectArrayChange(
                    setRoutes,
                    i,
                    "distance",
                    e.target.value,
                    routes
                  )
                }
                className="p-2 border rounded flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(setRoutes, routes, i)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem(setRoutes, routes, {
                from: "",
                to: "",
                distance: "",
              })
            }
            className="mt-1 text-blue-600 font-semibold"
          >
            + Add Route
          </button>
        </div>

        {/* Rates */}
        <div className="mb-3">
          <label className="block font-semibold">Rates</label>
          {rates.map((r, i) => (
            <div key={i} className="flex space-x-2 mt-1">
              <input
                placeholder="Type"
                value={r.type}
                onChange={(e) =>
                  handleObjectArrayChange(
                    setRates,
                    i,
                    "type",
                    e.target.value,
                    rates
                  )
                }
                className="p-2 border rounded flex-1"
              />
              <input
                placeholder="Rate"
                type="number"
                value={r.rate}
                onChange={(e) =>
                  handleObjectArrayChange(
                    setRates,
                    i,
                    "rate",
                    e.target.value,
                    rates
                  )
                }
                className="p-2 border rounded flex-1"
              />
              <input
                placeholder="Currency"
                value={r.currency}
                onChange={(e) =>
                  handleObjectArrayChange(
                    setRates,
                    i,
                    "currency",
                    e.target.value,
                    rates
                  )
                }
                className="p-2 border rounded flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(setRates, rates, i)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addArrayItem(setRates, rates, {
                type: "",
                rate: "",
                currency: "ZAR",
              })
            }
            className="mt-1 text-blue-600 font-semibold"
          >
            + Add Rate
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
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default TruckerRegister;
