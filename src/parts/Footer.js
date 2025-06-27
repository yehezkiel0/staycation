import React from "react";
import Button from "elements/Button";
import IconText from "parts/IconText";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <Button
                className="brand-text-icon text-white"
                href="/"
                type="link"
              >
                Stay<span className="text-primary">cation.</span>
              </Button>
            </div>
            <p className="text-light mb-4">
              We make your beauty holiday instantly and memorable. Discover
              amazing places across Indonesia with our curated staycation
              experiences.
            </p>
            <div className="d-flex gap-3">
              <Button
                className="btn btn-outline-light btn-sm rounded-circle p-2"
                isExternal
                type="link"
                href="https://facebook.com"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="fab fa-facebook-f"></i>
              </Button>
              <Button
                className="btn btn-outline-light btn-sm rounded-circle p-2"
                isExternal
                type="link"
                href="https://instagram.com"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <Button
                className="btn btn-outline-light btn-sm rounded-circle p-2"
                isExternal
                type="link"
                href="https://twitter.com"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn btn-outline-light btn-sm rounded-circle p-2"
                isExternal
                type="link"
                href="https://youtube.com"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="fab fa-youtube"></i>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Button className="text-light footer-link" type="link" href="/">
                  Home
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/browse-by"
                >
                  Browse Properties
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/stories"
                >
                  Guest Stories
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/agents"
                >
                  Our Agents
                </Button>
              </li>
            </ul>
          </div>

          {/* For Travelers */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">For Travelers</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/register"
                >
                  Create Account
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/booking-guide"
                >
                  Booking Guide
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/payments"
                >
                  Payment Methods
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/rewards"
                >
                  Loyalty Program
                </Button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/help"
                >
                  Help Center
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/safety"
                >
                  Safety Center
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/cancellation"
                >
                  Cancellation Policy
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  type="link"
                  href="/community"
                >
                  Community
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">Contact</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  isExternal
                  type="link"
                  href="mailto:support@staycation.id"
                >
                  <i className="fas fa-envelope me-2"></i>
                  support@staycation.id
                </Button>
              </li>
              <li className="mb-2">
                <Button
                  className="text-light footer-link"
                  isExternal
                  type="link"
                  href="tel:+622122081996"
                >
                  <i className="fas fa-phone me-2"></i>
                  021-2208-1996
                </Button>
              </li>
              <li className="mb-2">
                <span className="text-light">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Jakarta, Indonesia
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light">
                  <i className="fas fa-clock me-2"></i>
                  24/7 Support
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="my-4 border-secondary" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-light">
              © 2024 Staycation. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <Button
                className="text-light footer-link small"
                type="link"
                href="/privacy"
              >
                Privacy Policy
              </Button>
              <Button
                className="text-light footer-link small"
                type="link"
                href="/terms"
              >
                Terms of Service
              </Button>
              <Button
                className="text-light footer-link small"
                type="link"
                href="/cookies"
              >
                Cookie Policy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          transition: all 0.3s ease;
          text-decoration: none !important;
        }

        .footer-link:hover {
          color: #007bff !important;
          transform: translateX(5px);
        }

        .brand-text-icon {
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none !important;
        }

        .brand-text-icon:hover {
          transform: scale(1.05);
        }
      `}</style>
    </footer>
  );
}
