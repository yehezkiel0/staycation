import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAPI";

export default function AdminRoute() {
  const { isAuthenticated, user, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user?.role === "admin") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [loading, isAuthenticated, user]);

  if (loading || isAuthorized === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Redirect to unauthorized if not logged in or not admin
  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
