import React, { useState, useEffect } from "react";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import Star from "elements/Star";
import { formatPrice } from "utils/currency";
import Breadcrumb from "elements/Breadcrumb";
import { propertyService, PRICE_RANGES } from "services/property.service";

export default function BrowseBy() {
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique locations from properties
  const locations =
    properties && properties.length > 0
      ? [
          ...new Set(
            properties.map((p) => `${p.city}, ${p.country}`).filter(Boolean),
          ),
        ]
      : [];

  useEffect(() => {
    fetchData();
  }, []);

  // Effect for filtering properties when dependencies change
  useEffect(() => {
    if (!properties || properties.length === 0) {
      setFilteredProperties([]);
      return;
    }

    const filtered = propertyService.filterProperties(properties, {
      category: selectedCategory,
      location: selectedLocation,
      priceLabel: selectedPrice,
      query: searchQuery,
    });

    setFilteredProperties(filtered);
  }, [
    properties,
    selectedCategory,
    selectedLocation,
    selectedPrice,
    searchQuery,
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { categories, properties } =
        await propertyService.getAllForBrowse();

      setCategories(categories);
      setProperties(properties);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // Search is handled by useEffect
    console.log("Search triggered with query:", searchQuery);
  };

  return (
    <>
      <Header />

      <div className="container py-3">
        <Breadcrumb
          data={[
            { pageTitle: "Home", pageHref: "/" },
            { pageTitle: "Browse By", pageHref: "" },
          ]}
        />
      </div>

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
              <div className="filter-card card shadow-sm border-0 p-4">
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">
                      Search
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0 rounded-end-pill custom-input"
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">
                      Category
                    </label>
                    <select
                      className="form-select rounded-pill custom-select ps-3"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category) => (
                          <option key={category._id} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">
                      Location
                    </label>
                    <select
                      className="form-select rounded-pill custom-select ps-3"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations &&
                        locations.length > 0 &&
                        locations.map((location, index) => (
                          <option key={index} value={location}>
                            {location}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">
                      Price Range
                    </label>
                    <select
                      className="form-select rounded-pill custom-select ps-3"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      {PRICE_RANGES.map((price, index) => (
                        <option key={index} value={price.label}>
                          {price.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 text-center">
                    <Button
                      className="btn btn-primary d-inline-block px-5 py-2 rounded-pill fw-bold"
                      type="button"
                      onClick={handleSearch}
                      style={{ background: "#198754", border: "none" }}
                    >
                      Search Properties ({filteredProperties?.length || 0}{" "}
                      found)
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

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-muted mt-3">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <div className="alert alert-warning" role="alert">
              <h5>Unable to load categories</h5>
              <p className="mb-0">{error}</p>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <div
                  key={`category-${category._id || "fallback"}-${index}`}
                  className="col-lg-4 col-md-6"
                >
                  <Fade direction="up" triggerOnce delay={500 + index * 100}>
                    <div className="card border-0 shadow-sm h-100 category-card">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={
                            category.imageUrl ||
                            `/images/image-category-${index + 1}.jpg`
                          }
                          alt={category.name}
                          className="card-img-top category-image"
                          style={{ height: "200px", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.src = `/images/image-category-${
                              index + 1
                            }.jpg`;
                          }}
                        />
                        <div className="category-overlay">
                          <span className="badge bg-primary position-absolute top-0 end-0 m-3">
                            {properties && properties.length > 0
                              ? properties.filter(
                                  (p) => p.category?.slug === category.slug,
                                ).length
                              : 0}{" "}
                            Properties
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
                          onClick={() => setSelectedCategory(category.slug)}
                        >
                          View Properties
                        </Button>
                      </div>
                    </div>
                  </Fade>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Properties Section */}
      <section className="container pb-5">
        <Fade direction="up" triggerOnce delay={600}>
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="h3 fw-bold">
                {selectedCategory !== "all"
                  ? `${
                      (categories &&
                        categories.find((c) => c.slug === selectedCategory)
                          ?.name) ||
                      "Category"
                    } Properties`
                  : "All Properties"}
              </h2>
              <p className="text-gray-500">
                {(filteredProperties && filteredProperties.length) || 0}{" "}
                properties found
              </p>
            </div>
          </div>
        </Fade>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-muted mt-3">Loading properties...</p>
          </div>
        ) : !filteredProperties || filteredProperties.length === 0 ? (
          <div className="text-center py-5">
            <div className="alert alert-info" role="alert">
              <h5>No properties found</h5>
              <p className="mb-0">Try adjusting your search criteria.</p>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProperties.map((property, index) => (
              <div
                key={`property-${property._id || "fallback"}-${index}`}
                className="col-lg-4 col-md-6"
              >
                <Fade direction="up" triggerOnce delay={700 + index * 100}>
                  <div className="card border-0 shadow-sm h-100 property-card">
                    <div className="position-relative overflow-hidden">
                      <img
                        src={
                          property.imageUrls?.[0]?.url ||
                          property.imageUrls?.[0] ||
                          property.imageUrl ||
                          `/images/image-mostpicked-${(index % 5) + 1}.jpg`
                        }
                        alt={property.title || property.name}
                        className="card-img-top property-image"
                        style={{ height: "250px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = `/images/image-mostpicked-${
                            (index % 5) + 1
                          }.jpg`;
                        }}
                      />
                      <div className="property-overlay"></div>

                      {/* Popular badge */}
                      {property.isPopular && (
                        <div className="position-absolute top-0 start-0 m-3">
                          <span
                            className="badge px-3 py-2 rounded-pill fw-bold shadow-sm"
                            style={{
                              backgroundColor: "#FF498B",
                              color: "white",
                            }}
                          >
                            ⭐ Popular
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="position-absolute bottom-0 end-0 m-3">
                        <span
                          className="badge px-3 py-2 rounded-pill"
                          style={{ backgroundColor: "#0dcaf0", color: "white" }}
                        >
                          {formatPrice(
                            property.price?.amount || property.price,
                            property.price?.unit || property.unit || "night",
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">
                        {property.title || property.name}
                      </h5>
                      <p className="card-text text-gray-500 mb-2">
                        {property.location?.city || property.city},{" "}
                        {property.location?.country || property.country}
                      </p>
                      <p className="card-text text-muted mb-3 flex-grow-1">
                        {property.description?.substring(0, 100)}...
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="property-rating d-flex align-items-center">
                          <Star
                            value={
                              property.ratings?.average || property.rating || 0
                            }
                            width={16}
                            height={16}
                            spacing={2}
                          />
                          <small className="text-muted ms-2">
                            {(
                              property.ratings?.average ||
                              property.rating ||
                              0
                            ).toFixed(1)}{" "}
                            (
                            {property.ratings?.count ||
                              property.reviewCount ||
                              0}
                            )
                          </small>
                        </div>
                        <Button
                          className="btn btn-sm px-3 fw-bold text-white shadow-sm"
                          type="link"
                          href={`/properties/${property._id}`}
                          style={{
                            backgroundColor: "#198754",
                            borderColor: "#198754",
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      <style>{`
        .category-card,
        .property-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .category-card:hover,
        .property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .category-image,
        .property-image {
          transition: transform 0.3s ease;
        }

        .category-card:hover .category-image,
        .property-card:hover .property-image {
          transform: scale(1.05);
        }
        
        .category-overlay,
        .property-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), transparent);
        }

        .property-rating {
          font-size: 0.9rem;
        }

        /* Button Outline Primary Fix */
        .btn-outline-primary {
          border: 2px solid #1ABC9C;
          color: #1ABC9C;
          background: white;
          transition: all 0.3s ease;
        }

        .btn-outline-primary:hover {
          background: #1ABC9C;
          border-color: #1ABC9C;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(13, 202, 240, 0.3);
        }

        .btn-outline-primary:focus,
        .btn-outline-primary:active {
          background: #0bacbe !important;
          border-color: #0bacbe !important;
          color: white !important;
          box-shadow: 0 0 0 0.2rem rgba(13, 202, 240, 0.25) !important;
        }

        /* Filter Section Styles */
        .filter-card {
          border-radius: 16px;
        }

        .custom-input, .custom-select {
          border-color: #e2e8f0;
          padding-top: 10px;
          padding-bottom: 10px;
          transition: all 0.2s;
        }

        .custom-input:focus, .custom-select:focus {
          border-color: #0dcaf0;
          box-shadow: 0 0 0 4px rgba(13, 202, 240, 0.1);
        }
        
        .ls-1 {
          letter-spacing: 1px;
        }
      `}</style>
    </>
  );
}
