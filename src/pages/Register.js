import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
import Breadcrumb from "elements/Breadcrumb";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll just navigate to login
      setIsLoading(false);
      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    }, 2000);
  };

  const breadcrumb = [
    { pageTitle: "Home", pageHref: "/" },
    { pageTitle: "Register", pageHref: "" },
  ];
  return (
    <>
      <Header />
      <main>
        <div className="container py-3">
          <Breadcrumb data={breadcrumb} />
        </div>

        <section className="register-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-9">
                <div className="register-card">
                  <div className="register-header text-center mb-4">
                    <h2 className="register-title">Create Account</h2>
                    <p className="register-subtitle">
                      Join us and start your journey
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="register-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="firstName" className="form-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className={`form-control ${
                              errors.firstName ? "is-invalid" : ""
                            }`}
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          {errors.firstName && (
                            <div className="invalid-feedback">
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="lastName" className="form-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={`form-control ${
                              errors.lastName ? "is-invalid" : ""
                            }`}
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                          {errors.lastName && (
                            <div className="invalid-feedback">
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`form-control ${
                              errors.confirmPassword ? "is-invalid" : ""
                            }`}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          {errors.confirmPassword && (
                            <div className="invalid-feedback">
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <div className="form-check">
                        <input
                          className={`form-check-input ${
                            errors.agreeTerms ? "is-invalid" : ""
                          }`}
                          type="checkbox"
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="agreeTerms"
                        >
                          I agree to the{" "}
                          <Link to="/terms" className="terms-link">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="terms-link">
                            Privacy Policy
                          </Link>
                        </label>
                        {errors.agreeTerms && (
                          <div className="invalid-feedback d-block">
                            {errors.agreeTerms}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-register w-100 mb-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    <div className="text-center">
                      <p className="login-text">
                        Already have an account?
                        <Link to="/login" className="login-link">
                          {" "}
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </form>

                  <div className="divider my-4">
                    <span>or</span>
                  </div>

                  <div className="social-register">
                    <button className="btn btn-social btn-google w-100 mb-2">
                      <i className="fab fa-google me-2"></i>
                      Sign up with Google
                    </button>
                    <button className="btn btn-social btn-facebook w-100">
                      <i className="fab fa-facebook-f me-2"></i>
                      Sign up with Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
