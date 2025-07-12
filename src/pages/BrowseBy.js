import React, { useState, useEffect } from "react";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import Star from "elements/Star";
import api from "services/api";

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
            properties
              .map(
                (p) =>
                  `${p.location?.city || p.city}, ${
                    p.location?.country || p.country
                  }`
              )
              .filter(Boolean)
          ),
        ]
      : [];

  const priceRanges = [
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 - $250", min: 100, max: 250 },
    { label: "$250 - $500", min: 250, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "Above $1000", min: 1000, max: Infinity },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProperties();
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
      const [categoriesResponse, propertiesResponse] = await Promise.all([
        api.getCategories(),
        api.getProperties(),
      ]);

      setCategories(categoriesResponse.categories || []);
      setProperties(propertiesResponse.properties || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    if (!properties || properties.length === 0) {
      setFilteredProperties([]);
      return;
    }

    let filtered = [...properties];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (property) =>
          property.category?.slug === selectedCategory ||
          property.category?.name === selectedCategory
      );
    }

    // Filter by location
    if (selectedLocation !== "all") {
      filtered = filtered.filter(
        (property) =>
          `${property.location?.city || property.city}, ${
            property.location?.country || property.country
          }` === selectedLocation
      );
    }

    // Filter by price range
    if (selectedPrice !== "all") {
      const priceRange = priceRanges.find(
        (range) => range.label === selectedPrice
      );
      if (priceRange) {
        filtered = filtered.filter((property) => {
          const price = property.price?.amount || property.price || 0;
          return price >= priceRange.min && price <= priceRange.max;
        });
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          (property.title || property.name || "")
            .toLowerCase()
            .includes(query) ||
          (property.description || "").toLowerCase().includes(query) ||
          (property.location?.city || property.city || "")
            .toLowerCase()
            .includes(query) ||
          (property.location?.country || property.country || "")
            .toLowerCase()
            .includes(query)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = () => {
    // The filtering is already handled by useEffect
    // This function can be used for additional search logic if needed
    filterProperties();
  };

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
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Search</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select"
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
                    <label className="form-label fw-semibold">Location</label>
                    <select
                      className="form-select"
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
                        <option key={index} value={price.label}>
                          {price.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleSearch}
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
                                  (p) => p.category?.slug === category.slug
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
                          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                            ⭐ Popular
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="position-absolute bottom-0 end-0 m-3">
                        <span className="badge bg-dark text-white px-3 py-2 rounded-pill">
                          ${property.price?.amount || property.price}{" "}
                          <small>
                            per{" "}
                            {property.price?.unit || property.unit || "night"}
                          </small>
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
                          className="btn btn-primary btn-sm px-3"
                          type="link"
                          href={`/properties/${property._id}`}
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
        .btn-outline-primary:active {
          background: #0056b3 !important;
          border-color: #0056b3 !important;
          color: white !important;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
        }
      `}</style>
    </>
  );
}
