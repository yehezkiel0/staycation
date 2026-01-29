import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAPI";
import { toast } from "react-toastify";
import Header from "parts/Header";
import Footer from "parts/Footer";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  /* eslint-disable no-unused-vars */
  const { login, loading: authLoading, error: authError } = useAuth();
  /* eslint-enable no-unused-vars */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });
      toast.success("Welcome back!");

      if (res.user && res.user.role === "admin") {
        navigate("/admin");
      } else {
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }
    } catch (err) {
      console.error("Login failed", err);
      const msg = err.response?.data?.message || err.message || "Login failed";
      toast.error(msg);
      setErrors((prev) => ({
        ...prev,
        form: msg,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section
          className="login-section"
          style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7">
                <div className="login-card">
                  <div className="login-header text-center mb-4">
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your account</p>
                    {errors.form && (
                      <div className="alert alert-danger mt-3">
                        {errors.form}
                      </div>
                    )}
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
                      <div className="position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          placeholder="Enter your password"
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
                    <button className="btn btn-social btn-google">
                      <i className="fab fa-google fa-fw me-2"></i>
                      Continue with Google
                    </button>
                    <button className="btn btn-social btn-facebook">
                      <i className="fab fa-facebook-f fa-fw me-2"></i>
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
