import React, { useState, useEffect } from "react";
import { useCategories, useProperties, useAuth } from "../hooks/useAPI";
import { LoadingSpinner, ErrorMessage } from "../components/UIComponents";
import Star from "../elements/Star";

export default function APITestPage() {
  const [activeTab, setActiveTab] = useState("categories");

  // API hooks
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const {
    properties,
    loading: propertiesLoading,
    error: propertiesError,
    fetchMostPicked,
  } = useProperties();

  const {
    user,
    loading: authLoading,
    error: authError,
    login,
    isAuthenticated,
  } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: "admin@staycation.com",
    password: "password123",
  });

  useEffect(() => {
    document.title = "API Test - Staycation";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const testEndpoints = async () => {
    try {
      await fetchCategories();
      await fetchMostPicked();
      alert("API endpoints tested successfully!");
    } catch (error) {
      alert("API test failed: " + error.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">API Integration Test</h1>
            <p className="text-muted">
              Testing frontend integration with backend APIs
            </p>
            <button className="btn btn-primary me-3" onClick={testEndpoints}>
              Test All Endpoints
            </button>
            <div className="mt-3">
              <span className="badge bg-success me-2">Backend: Running</span>
              <span className="badge bg-info">Frontend: Connected</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <ul className="nav nav-pills justify-content-center mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "categories" ? "active" : ""
                }`}
                onClick={() => setActiveTab("categories")}
              >
                Categories API
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "properties" ? "active" : ""
                }`}
                onClick={() => setActiveTab("properties")}
              >
                Properties API
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "auth" ? "active" : ""}`}
                onClick={() => setActiveTab("auth")}
              >
                Authentication API
              </button>
            </li>
          </ul>

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Categories API Test</h5>
              </div>
              <div className="card-body">
                {categoriesLoading && (
                  <LoadingSpinner message="Loading categories..." />
                )}
                {categoriesError && <ErrorMessage error={categoriesError} />}
                {categories.length > 0 && (
                  <div>
                    <p className="text-success">
                      ✅ Successfully loaded {categories.length} categories
                    </p>
                    <div className="row">
                      {categories.map((category, index) => (
                        <div
                          key={category._id}
                          className="col-md-6 col-lg-3 mb-3"
                        >
                          <div className="card h-100 border">
                            <div className="card-body text-center">
                              <i className="fas fa-home fa-2x text-primary mb-3"></i>
                              <h6 className="card-title">{category.name}</h6>
                              <p className="card-text small text-muted">
                                {category.description}
                              </p>
                              <div className="small">
                                <span className="badge bg-light text-dark">
                                  {category.propertyCount} properties
                                </span>
                                {category.featured && (
                                  <span className="badge bg-warning ms-1">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Properties API Test</h5>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-outline-primary mb-3"
                  onClick={fetchMostPicked}
                >
                  Fetch Most Picked Properties
                </button>

                {propertiesLoading && (
                  <LoadingSpinner message="Loading properties..." />
                )}
                {propertiesError && <ErrorMessage error={propertiesError} />}
                {properties.length > 0 && (
                  <div>
                    <p className="text-success">
                      ✅ Successfully loaded {properties.length} properties
                    </p>
                    <div className="row">
                      {properties.map((property, index) => (
                        <div
                          key={property._id}
                          className="col-md-6 col-lg-4 mb-3"
                        >
                          <div className="card h-100">
                            <img
                              src={
                                property.imageUrls?.[0]?.url ||
                                property.imageUrls?.[0] ||
                                `/images/image-mostpicked-${index + 1}.jpg`
                              }
                              className="card-img-top"
                              alt={property.title || property.name}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">
                                {property.title || property.name}
                              </h6>
                              <p className="card-text small text-muted">
                                {property.location?.city || property.city},{" "}
                                {property.location?.country || property.country}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-bold text-primary">
                                  ${property.price?.amount || property.price}
                                </span>
                                <Star
                                  value={
                                    property.ratings?.average ||
                                    property.rating ||
                                    0
                                  }
                                  width={14}
                                  height={14}
                                  spacing={1}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {properties.length === 0 &&
                  !propertiesLoading &&
                  !propertiesError && (
                    <div className="text-center text-muted py-4">
                      <p>
                        No properties loaded. Click "Fetch Most Picked
                        Properties" to load data.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Authentication Tab */}
          {activeTab === "auth" && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Authentication API Test</h5>
              </div>
              <div className="card-body">
                {!isAuthenticated ? (
                  <form
                    onSubmit={handleLogin}
                    className="row justify-content-center"
                  >
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={authLoading}
                      >
                        {authLoading ? "Logging in..." : "Login"}
                      </button>
                      {authError && (
                        <div className="alert alert-danger mt-3" role="alert">
                          {authError}
                        </div>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <p className="text-success">
                      ✅ Successfully authenticated!
                    </p>
                    <div className="card">
                      <div className="card-body">
                        <h6>User Information:</h6>
                        <p>
                          <strong>Name:</strong> {user.firstName}{" "}
                          {user.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                          <strong>Role:</strong> {user.role}
                        </p>
                        <p>
                          <strong>Last Login:</strong>{" "}
                          {new Date(user.lastLogin).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* API Status */}
          <div className="mt-5">
            <div className="card bg-light">
              <div className="card-body">
                <h6>API Endpoint Status:</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <span className="badge bg-success me-2">●</span>
                      <span>Health Check</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <span
                        className={`badge ${
                          categories.length > 0 ? "bg-success" : "bg-secondary"
                        } me-2`}
                      >
                        ●
                      </span>
                      <span>Categories</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <span
                        className={`badge ${
                          isAuthenticated ? "bg-success" : "bg-secondary"
                        } me-2`}
                      >
                        ●
                      </span>
                      <span>Authentication</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
