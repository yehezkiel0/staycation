import Button from "elements/Button";
import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Categories({ data, loading, error }) {
  // Loading state
  if (loading) {
    return (
      <section className="categories-section py-5 bg-light">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="text-center mb-5">
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                🏠 Browse Categories
              </span>
              <h2 className="display-6 fw-bold mb-3">Property Categories</h2>
              <p className="text-muted">
                Discover amazing properties for your perfect getaway
              </p>
            </div>
          </Fade>

          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-muted mt-3">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="categories-section py-5 bg-light">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="text-center mb-5">
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                🏠 Browse Categories
              </span>
              <h2 className="display-6 fw-bold mb-3">Property Categories</h2>
              <p className="text-muted">
                Discover amazing properties for your perfect getaway
              </p>
            </div>
          </Fade>

          <div className="text-center py-5">
            <div className="alert alert-warning" role="alert">
              <h5>Unable to load categories</h5>
              <p className="mb-0">Please try again later. {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <section className="categories-section py-5 bg-light">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="text-center mb-5">
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                🏠 Browse Categories
              </span>
              <h2 className="display-6 fw-bold mb-3">Property Categories</h2>
              <p className="text-muted">
                Discover amazing properties for your perfect getaway
              </p>
            </div>
          </Fade>

          <div className="text-center py-5">
            <p className="text-muted">No categories available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="categories-section py-5 bg-light">
      <div className="container">
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-5">
            <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
              🏠 Browse Categories
            </span>
            <h2 className="display-6 fw-bold mb-3">Property Categories</h2>
            <p className="text-muted">
              Discover amazing properties for your perfect getaway
            </p>
          </div>
        </Fade>

        <Slide direction="up" triggerOnce>
          <div className="categories-grid">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={data.length > 3}
              className="categories-swiper"
            >
              {data.map((category, index) => (
                <SwiperSlide
                  key={`category-${category._id || "fallback"}-${index}`}
                >
                  <Zoom triggerOnce delay={index * 100}>
                    <div className="category-card h-100">
                      <div className="card border-0 shadow-sm h-100 category-card-inner">
                        <div className="position-relative overflow-hidden">
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="card-img-top category-image"
                            style={{ height: "200px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.src = `/images/image-category-${
                                index + 1
                              }.jpg`;
                            }}
                          />
                          <div className="category-overlay"></div>

                          {category.featured && (
                            <div className="featured-badge position-absolute top-0 start-0 m-3">
                              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                                ⭐ Featured
                              </span>
                            </div>
                          )}

                          <div className="category-info position-absolute bottom-0 start-0 end-0 p-3 text-white">
                            <h5 className="fw-bold mb-1">{category.name}</h5>
                            <p className="mb-0 small">
                              {category.propertiesCount || category.cities}{" "}
                              {category.propertiesCount
                                ? "Properties"
                                : "Cities"}
                            </p>
                          </div>
                        </div>

                        <div className="card-body d-flex flex-column">
                          <p className="card-text text-muted mb-3">
                            {category.description}
                          </p>

                          <div className="category-stats mb-3">
                            <div className="row g-2 text-center">
                              <div className="col-6">
                                <div className="p-2 bg-light rounded">
                                  <i className="fas fa-home text-primary"></i>
                                  <div className="small fw-bold">
                                    {category.propertiesCount || 0}
                                  </div>
                                  <div className="small text-muted">
                                    Properties
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="p-2 bg-light rounded">
                                  <i className="fas fa-map-marker-alt text-primary"></i>
                                  <div className="small fw-bold">
                                    {category.cities || 1}
                                  </div>
                                  <div className="small text-muted">Cities</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Button
                            type="link"
                            className="btn btn-outline-primary w-100 rounded-pill mt-auto"
                            href={`/browse-by?category=${category._id}`}
                          >
                            <i className="fas fa-search me-2"></i>
                            Browse {category.name}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Slide>
      </div>

      <style>{`
        /* Category Cards */
        .category-card-inner {
          transition: all 0.3s ease;
          border-radius: 20px;
          overflow: hidden;
        }

        .category-card-inner:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        .category-image {
          transition: transform 0.3s ease;
        }

        .category-card-inner:hover .category-image {
          transform: scale(1.05);
        }

        .category-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(0, 0, 0, 0.8)
          );
        }

        /* Carousel Styles */
        .categories-swiper {
          padding: 20px 0 50px 0;
        }

        /* Swiper Custom Styles */
        .swiper-pagination-bullet {
          background: #007bff;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #007bff;
          background: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #007bff;
          color: white;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px;
        }

        /* Button Styles */
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

        .btn-outline-primary i {
          transition: transform 0.3s ease;
        }

        .btn-outline-primary:hover i {
          transform: scale(1.1);
        }

        /* Category Info */
        .category-info {
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .category-stats {
            margin-bottom: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
