import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context";
import Login from "./pages/Login";
import RegistrationLanding from "./pages/RegistrationLanding";
import FarmerRegister from "./pages/FarmerRegister";
import TruckerRegister from "./pages/TruckerRegister";
import MarketRegister from "./pages/MarketRegister";
import FarmerDashboard from "./pages/FarmerDashboard";
import TruckingDashboard from "./pages/TruckingDashboard";
import MarketDashboard from "./pages/MarketDashboard";

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.user_role !== allowedRole) {
    return <Navigate to={`/dashboard/${user.user_role}`} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<RegistrationLanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/farmer" element={<FarmerRegister />} />
      <Route path="/register/trucker" element={<TruckerRegister />} />
      <Route path="/register/market" element={<MarketRegister />} />

      {/* Protected Dashboard routes */}
      <Route
        path="/dashboard/farmer"
        element={
          <ProtectedRoute allowedRole="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/trucking"
        element={
          <ProtectedRoute allowedRole="trucking">
            <TruckingDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/market"
        element={
          <ProtectedRoute allowedRole="market">
            <MarketDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all - comment out temporarily to debug */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
