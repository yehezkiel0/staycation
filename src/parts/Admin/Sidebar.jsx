import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "elements/Button";
import { useAuth } from "hooks/useAPI";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "nav-link active fw-bold bg-primary text-white rounded"
      : "nav-link text-dark";
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end"
      style={{ width: "280px", minHeight: "100vh" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <span className="fs-4 fw-bold text-primary">Staycation Admin</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link to="/admin" className={getNavLinkClass("/admin")}>
            <i className="fas fa-tachometer-alt me-2"></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/admin/categories"
            className={getNavLinkClass("/admin/categories")}
          >
            <i className="fas fa-list me-2"></i>
            Categories
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/admin/properties"
            className={getNavLinkClass("/admin/properties")}
          >
            <i className="fas fa-building me-2"></i>
            Properties
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/admin/transactions"
            className={getNavLinkClass("/admin/transactions")}
          >
            <i className="fas fa-shopping-cart me-2"></i>
            Transactions
          </Link>
        </li>
      </ul>
      <hr />
      <div>
        <Button
          className="btn btn-outline-danger w-100"
          type="button"
          onClick={logout}
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </Button>
      </div>
    </div>
  );
}
