import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { toast } from "react-toastify";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { validateRegister } from "services/logic/authLogic";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateRegister(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || err.message || "Registration failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section
          className="register-section"
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
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
                          <div className="position-relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              placeholder="Create a password"
                              value={formData.password}
                              onChange={handleChange}
                              style={{ paddingRight: "2.5rem" }}
                            />
                            <button
                              type="button"
                              className="btn btn-link position-absolute text-decoration-none"
                              style={{
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                                padding: "0.375rem 0.75rem",
                                color: "#6c757d",
                              }}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                              ></i>
                            </button>
                          </div>
                          {errors.password && (
                            <div className="invalid-feedback d-block">
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
                          <div className="position-relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              className={`form-control ${
                                errors.confirmPassword ? "is-invalid" : ""
                              }`}
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              style={{ paddingRight: "2.5rem" }}
                            />
                            <button
                              type="button"
                              className="btn btn-link position-absolute text-decoration-none"
                              style={{
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                                padding: "0.375rem 0.75rem",
                                color: "#6c757d",
                              }}
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              <i
                                className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                              ></i>
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <div className="invalid-feedback d-block">
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
                    <button className="btn btn-social btn-google">
                      <i className="fab fa-google fa-fw me-2"></i>
                      Sign up with Google
                    </button>
                    <button className="btn btn-social btn-facebook">
                      <i className="fab fa-facebook-f fa-fw me-2"></i>
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
