import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // NOT LOGGED IN → redirect to normal login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // IF ROLE REQUIRED BUT USER ROLE DOESN'T MATCH
  if (role && userRole !== role) {
    if (userRole === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (userRole === "department")
      return <Navigate to="/officer/dashboard" replace />;
    return <Navigate to="/" replace />; // normal user
  }

  return children;
}
