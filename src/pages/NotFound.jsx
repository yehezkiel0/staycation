import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../elements/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ minHeight: "70vh" }}>
      <div
        className="row align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <div className="error-content">
            <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
            <h2 className="mb-3">Oops! Page Not Found</h2>
            <p className="text-muted mb-4">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button
                className="btn btn-primary px-4"
                type="button"
                onClick={() => navigate(-1)}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Go Back
              </Button>
              <Link to="/" className="btn btn-outline-primary px-4">
                <i className="fas fa-home me-2"></i>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
