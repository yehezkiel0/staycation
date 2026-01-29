import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../elements/Button";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ minHeight: "70vh" }}>
      <div
        className="row align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <div className="error-content">
            <h1 className="display-1 fw-bold text-danger mb-4">401</h1>
            <h2 className="mb-3">Unauthorized Access</h2>
            <p className="text-muted mb-4">
              You need to be logged in to access this page. Please login or
              register to continue.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/login" className="btn btn-primary px-4">
                <i className="fas fa-sign-in-alt me-2"></i>
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-primary px-4">
                <i className="fas fa-user-plus me-2"></i>
                Register
              </Link>
              <Button
                className="btn btn-outline-secondary px-4"
                type="button"
                onClick={() => navigate(-1)}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
