import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        {...rest}
        element={
          loading ? (
            null
          ) : !isAuthenticated ? (
            <Navigate to="/login" />
          ) : isAdmin && user.role !== "admin" ? (
            <Navigate to="/login" />
          ) : (
            <Component />
          )
        }
      />
    </Routes>
  );
};

export default ProtectedRoute;
