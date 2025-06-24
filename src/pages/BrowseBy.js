import React, { useState } from "react";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";

const categories = [
  {
    id: 1,
    name: "Beach House",
    count: 15,
    image: "/images/image-category-1.jpg",
    description: "Relax by the ocean with stunning beach views",
  },
  {
    id: 2,
    name: "Mountain Lodge",
    count: 8,
    image: "/images/image-category-2.jpg",
    description: "Escape to peaceful mountain retreats",
  },
  {
    id: 3,
    name: "City Apartment",
    count: 22,
    image: "/images/image-category-3.jpg",
    description: "Modern living in the heart of the city",
  },
  {
    id: 4,
    name: "Villa",
    count: 12,
    image: "/images/image-category-4.jpg",
    description: "Luxury villas for exclusive getaways",
  },
  {
    id: 5,
    name: "Cabin",
    count: 6,
    image: "/images/image-category-5.jpg",
    description: "Cozy cabins for nature lovers",
  },
  {
    id: 6,
    name: "Resort",
    count: 18,
    image: "/images/image-category-6.jpg",
    description: "All-inclusive resort experiences",
  },
];

const locations = [
  "Bali, Indonesia",
  "Jakarta, Indonesia",
  "Yogyakarta, Indonesia",
  "Bandung, Indonesia",
  "Surabaya, Indonesia",
  "Medan, Indonesia",
];

const priceRanges = [
  "Under $100",
  "$100 - $250",
  "$250 - $500",
  "$500 - $1000",
  "Above $1000",
];

export default function BrowseBy() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="container pt-4 pb-5">
        <Fade direction="up" triggerOnce>
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold mb-3">Browse Properties</h1>
              <p className="lead text-gray-500 mb-4">
                Find your perfect staycation destination from our curated
                collection
              </p>
            </div>
          </div>
        </Fade>
      </section>

      {/* Filter Section */}
      <section className="container mb-5">
        <Fade direction="up" triggerOnce delay={200}>
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm border-0 p-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Location</label>
                    <select
                      className="form-select"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Price Range
                    </label>
                    <select
                      className="form-select"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      {priceRanges.map((price, index) => (
                        <option key={index} value={price}>
                          {price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <Button className="btn btn-primary w-100" type="button">
                      Search Properties
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>

      {/* Categories Section */}
      <section className="container pb-5">
        <Fade direction="up" triggerOnce delay={400}>
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="h3 fw-bold">Browse by Category</h2>
              <p className="text-gray-500">
                Choose from our diverse range of property types
              </p>
            </div>
          </div>
        </Fade>

        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={category.id} className="col-lg-4 col-md-6">
              <Fade direction="up" triggerOnce delay={500 + index * 100}>
                <div className="card border-0 shadow-sm h-100 category-card">
                  <div className="position-relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="card-img-top category-image"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="category-overlay">
                      <span className="badge bg-primary position-absolute top-0 end-0 m-3">
                        {category.count} Properties
                      </span>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{category.name}</h5>
                    <p className="card-text text-gray-500 flex-grow-1">
                      {category.description}
                    </p>
                    <Button
                      className="btn btn-outline-primary mt-auto"
                      type="button"
                    >
                      View Properties
                    </Button>
                  </div>
                </div>
              </Fade>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .category-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .category-image {
          transition: transform 0.3s ease;
        }

        .category-card:hover .category-image {
          transform: scale(1.05);
        }
        .category-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), transparent);
        }

        /* Button Outline Primary Fix */
        .btn-outline-primary {
          border: 2px solid #007bff;
          color: #007bff;
          background: white;
          transition: all 0.3s ease;
        }

        .btn-outline-primary:hover {
          background: #007bff;
          border-color: #007bff;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
        }

        .btn-outline-primary:focus,
        .btn-outline-primary:active {          background: #0056b3 !important;
          border-color: #0056b3 !important;
          color: white !important;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
        }

        /* Mobile Responsive */
        @media (max-width: 767.98px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .display-4 {
            font-size: 2rem;
          }

          .lead {
            font-size: 1rem;
          }

          .card {
            margin-bottom: 1rem;
          }

          .card-body {
            padding: 1rem;
          }

          .category-image {
            height: 180px !important;
          }

          .btn {
            padding: 12px 20px;
            font-size: 0.9rem;
          }

          .btn-outline-primary {
            width: 100%;
          }

          .form-select {
            margin-bottom: 1rem;
          }

          .col-md-4 {
            margin-bottom: 1rem;
          }

          .row.g-4 > * {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }

          .section-padding {
            padding: 2rem 0;
          }

          .pt-4 {
            padding-top: 2rem !important;
          }

          .pb-5 {
            padding-bottom: 2rem !important;
          }

          .mb-5 {
            margin-bottom: 2rem !important;
          }

          .h3 {
            font-size: 1.5rem;
          }
        }

        /* Tablet Responsive */
        @media (min-width: 768px) and (max-width: 991.98px) {
          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          .display-4 {
            font-size: 2.5rem;
          }

          .category-image {
            height: 190px !important;
          }

          .card-body {
            padding: 1.25rem;
          }

          .btn {
            padding: 13px 22px;
            font-size: 0.95rem;
          }
        }

        /* Desktop improvements */
        @media (min-width: 992px) {
          .category-card:hover {
            transform: translateY(-5px);
          }

          .category-card:hover .category-image {
            transform: scale(1.05);
          }

          .btn-outline-primary:hover {
            transform: translateY(-2px);
          }
        }

        /* Touch device improvements */
        @media (hover: none) and (pointer: coarse) {
          .category-card:hover {
            transform: none;
          }

          .category-card:hover .category-image {
            transform: none;
          }

          .btn-outline-primary:hover {
            transform: none;
          }

          .btn {
            min-height: 44px;
          }
        }
      `}</style>
    </>
  );
}
