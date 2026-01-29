import React from "react";
import Button from "elements/Button";
import BrandIcon from "parts/IconText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

export default function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? " active" : "";
  };

  if (props.isCentered)
    return (
      <header className="spacing-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Button className="brand-text-icon mx-auto" href="" type="link">
              Stay<span className="text-gray-900">cation.</span>
            </Button>
          </nav>
        </div>
      </header>
    );
  return (
    <header
      className="spacing-sm sticky-top bg-white shadow-sm"
      style={{ zIndex: 9999 }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          <BrandIcon />
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className={`nav-item${getNavLinkClass("/")}`}>
                <Button
                  className="nav-link px-3 py-2 rounded-pill mx-1 nav-link-custom"
                  href="/"
                  type="link"
                >
                  Home
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/browse-by")}`}>
                <Button
                  className="nav-link px-3 py-2 rounded-pill mx-1 nav-link-custom"
                  href="/browse-by"
                  type="link"
                >
                  Browse By
                </Button>
              </li>
              <li className={`nav-item${getNavLinkClass("/stories")}`}>
                <Button
                  className="nav-link px-3 py-2 rounded-pill mx-1 nav-link-custom"
                  href="/stories"
                  type="link"
                >
                  Stories
                </Button>
              </li>{" "}
              <li className={`nav-item${getNavLinkClass("/agents")}`}>
                <Button
                  className="nav-link px-3 py-2 rounded-pill mx-1 nav-link-custom"
                  href="/agents"
                  type="link"
                >
                  Agents
                </Button>
              </li>
              {/* Auth Section */}
              {/* Auth Section */}
              {isAuthenticated ? (
                <li className="nav-item dropdown ms-2">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center btn btn-link border-0 p-0"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="user-avatar me-2">
                      {user?.avatar ? (
                        <img
                          src={
                            user.avatar.startsWith("http")
                              ? user.avatar
                              : `${process.env.REACT_APP_API_URL.replace("/api", "")}${user.avatar}`
                          }
                          alt="avatar"
                          className="rounded-circle"
                          style={{
                            width: 30,
                            height: 30,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <i className="fas fa-user-circle fs-4"></i>
                      )}
                    </div>
                    <span className="d-none d-md-inline">
                      {user?.firstName || user?.email?.split("@")[0]}
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/profile">
                        <i className="fas fa-user me-2"></i>Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/my-bookings">
                        <i className="fas fa-calendar me-2"></i>My Bookings
                      </a>
                    </li>
                    {user?.role === "admin" && (
                      <li>
                        <a className="dropdown-item" href="/admin">
                          <i className="fas fa-tachometer-alt me-2"></i>
                          Dashboard
                        </a>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item ms-3">
                    <Button
                      className="btn btn-link text-primary px-3 py-2 fw-semibold nav-link-login"
                      href="/login"
                      type="link"
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>Login
                    </Button>
                  </li>
                  <li className="nav-item ms-1">
                    <Button
                      className="btn btn-primary px-4 py-2 rounded-pill shadow-sm nav-link-register"
                      href="/register"
                      type="link"
                    >
                      <i className="fas fa-user-plus me-2"></i>Register
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <style>{`
          .nav-link-custom {
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .nav-link-custom:hover {
            background-color: rgba(26, 188, 156, 0.1);
            color: #1ABC9C !important;
          }

          .nav-item.active .nav-link-custom {
            background-color: rgba(26, 188, 156, 0.1);
            color: #1ABC9C !important;
            font-weight: 600;
          }

          .navbar-brand:hover {
            transform: scale(1.05);
          }

          .btn-primary {
            transition: all 0.3s ease;
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(26, 188, 156, 0.3);
          }

          .btn-outline-primary {
            transition: all 0.3s ease;
            border: 2px solid #1ABC9C;
          }

          .btn-outline-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(26, 188, 156, 0.2);
          }

          /* Login Button Styling */
          .nav-link-login {
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            background: transparent;
          }

          .nav-link-login:hover {
            color: #16a085 !important;
            transform: translateY(-1px);
            text-decoration: none;
          }

          .nav-link-login:focus {
            box-shadow: none;
          }

          /* Register Button Styling */
          .nav-link-register {
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            background: linear-gradient(135deg, #1ABC9C 0%, #16a085 100%);
            color: white !important;
          }

          .nav-link-register:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(26, 188, 156, 0.4);
            background: linear-gradient(135deg, #16a085 0%, #149174 100%);
            color: white !important;
          }

          .nav-link-register:active {
            transform: translateY(0);
          }

          .user-avatar {
            color: #1ABC9C;
          }

          /* Dropdown Menu Styling */
          .dropdown-menu {
            border: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 8px;
            margin-top: 15px;
            animation: fadeInDropdown 0.3s ease forwards;
            min-width: 220px;
            background: #ffffff;
          }

          @keyframes fadeInDropdown {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Custom arrow for dropdown */
          .dropdown-menu::before {
            content: '';
            position: absolute;
            top: -6px;
            right: 20px;
            width: 12px;
            height: 12px;
            background: #ffffff;
            transform: rotate(45deg);
            box-shadow: -2px -2px 5px rgba(0,0,0,0.03); 
            border-left: 1px solid rgba(0,0,0,0.05);
            border-top: 1px solid rgba(0,0,0,0.05);
          }

          .dropdown-item {
            padding: 10px 16px;
            transition: all 0.2s ease;
            border-radius: 8px;
            margin-bottom: 2px;
            color: #4a4a4a;
            font-weight: 500;
          }

          .dropdown-item:hover {
            background-color: rgba(26, 188, 156, 0.1);
            color: #1ABC9C;
            transform: translateX(3px);
          }
          
          .dropdown-item i {
            width: 20px;
            text-align: center;
            margin-right: 10px;
            color: #b0b0b0;
            transition: color 0.2s ease;
          }
          
          .dropdown-item:hover i {
            color: #1ABC9C;
          }

          .dropdown-divider {
            margin: 6px 0;
            opacity: 0.1;
          }

          /* Avatar Hover Effect */
          .user-avatar-btn {
            border: 2px solid transparent;
            border-radius: 50px;
            padding: 4px 12px 4px 4px;
            transition: all 0.3s ease;
          }
          
          .user-avatar-btn:hover {
            background-color: rgba(26, 188, 156, 0.1);
            border-color: rgba(26, 188, 156, 0.2);
          }
        `}</style>
    </header>
  );
}
