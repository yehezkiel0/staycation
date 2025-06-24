import React, { useState, useEffect } from "react";
import Button from "elements/Button";
import BrandIcon from "parts/IconText";
import { useLocation, useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
export default function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail") || "";
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/");
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? " active" : "";
  };

  if (props.isCentered)
    return (
      <Fade>
        <header className="spacing-sm">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Button className="brand-text-icon mx-auto" href="" type="link">
                Stay<span className="text-gray-900">cation.</span>
              </Button>
            </nav>
          </div>
        </header>
      </Fade>
    );
  return (
    <Fade duration={500}>
      <header className="spacing-sm sticky-top bg-white shadow-sm">
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
                {isLoggedIn ? (
                  <li className="nav-item dropdown ms-2">
                    <a
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="user-avatar me-2">
                        <i className="fas fa-user-circle fs-4"></i>
                      </div>
                      <span className="d-none d-md-inline">
                        {userEmail.split("@")[0]}
                      </span>
                    </a>
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
                        <a className="dropdown-item" href="/bookings">
                          <i className="fas fa-calendar me-2"></i>My Bookings
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/favorites">
                          <i className="fas fa-heart me-2"></i>Favorites
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li className="nav-item ms-2">
                      <Button
                        className="nav-link px-3 py-2 rounded-pill mx-1 nav-link-custom"
                        href="/login"
                        type="link"
                      >
                        Login
                      </Button>
                    </li>
                    <li className="nav-item">
                      <Button
                        className="btn btn-outline-primary px-4 py-2 rounded-pill me-2"
                        href="/register"
                        type="link"
                      >
                        Register
                      </Button>{" "}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
        <style jsx>{`
          .nav-link-custom {
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .nav-link-custom:hover {
            background-color: #f8f9fa;
            color: #007bff !important;
          }

          .nav-item.active .nav-link-custom {
            background-color: #e3f2fd;
            color: #007bff !important;
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
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
          }

          .btn-outline-primary {
            transition: all 0.3s ease;
            border: 2px solid #007bff;
          }

          .btn-outline-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(0, 123, 255, 0.2);
          }

          .user-avatar {
            color: #007bff;
          }

          .dropdown-menu {
            border: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 10px 0;
          }

          .dropdown-item {
            padding: 10px 20px;
            transition: all 0.3s ease;
          }

          .dropdown-item:hover {
            background-color: #f8f9fa;
            transform: translateX(5px);
          }
        `}</style>
      </header>
    </Fade>
  );
}
