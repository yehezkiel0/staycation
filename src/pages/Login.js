import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
import Breadcrumb from "elements/Breadcrumb";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll just navigate to home
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", formData.email);
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const breadcrumb = [
    { pageTitle: "Home", pageHref: "/" },
    { pageTitle: "Login", pageHref: "" },
  ];
  return (
    <>
      <Header />
      <main>
        <div className="container py-3">
          <Breadcrumb data={breadcrumb} />
        </div>

        <section className="login-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="login-card">
                  <div className="login-header text-center mb-4">
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your account</p>
                  </div>

                  <form onSubmit={handleSubmit} className="login-form">
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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link
                          to="/forgot-password"
                          className="forgot-password-link"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-login w-100 mb-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    <div className="text-center">
                      <p className="register-text">
                        Don't have an account?
                        <Link to="/register" className="register-link">
                          {" "}
                          Sign up here
                        </Link>
                      </p>
                    </div>
                  </form>

                  <div className="divider my-4">
                    <span>or</span>
                  </div>

                  <div className="social-login">
                    <button className="btn btn-social btn-google w-100 mb-2">
                      <i className="fab fa-google me-2"></i>
                      Continue with Google
                    </button>
                    <button className="btn btn-social btn-facebook w-100">
                      <i className="fab fa-facebook-f me-2"></i>
                      Continue with Facebook
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
