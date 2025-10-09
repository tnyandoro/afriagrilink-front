import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import TruckingDashboard from "./pages/TruckingDashboard";
import MarketDashboard from "./pages/MarketDashboard";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={user ? `/dashboard/${user.user_role}` : "/login"} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
        <Route path="/dashboard/trucking" element={<TruckingDashboard />} />
        <Route path="/dashboard/market" element={<MarketDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
