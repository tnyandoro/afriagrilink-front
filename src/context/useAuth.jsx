// src/context/useAuth.jsx
import { useContext } from "react";
import { AuthContext } from "./authContext";

export const useAuth = () => {
  const context = useContext(AuthContext); // ✅ Correct - imported useContext
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
