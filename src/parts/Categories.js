import Button from "elements/Button";
import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Categories({ data }) {
  return (
    <section className="categories-section py-5 bg-light">
      <div className="container">
        {data.map((category, index1) => (
          <div key={`category-${index1}`} className="category-group mb-5">
            <Fade direction="up" triggerOnce>
              <div className="text-center mb-5">
                <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                  🏠 Browse {category.name}
                </span>
                <h2 className="display-6 fw-bold mb-3">{category.name}</h2>
                <p className="text-muted">
                  Discover amazing {category.name.toLowerCase()} for your
                  perfect getaway
                </p>
              </div>
            </Fade>

            {category.items.length === 0 ? (
              <Fade direction="up" triggerOnce>
                <div className="text-center py-5">
                  <div className="empty-state">
                    <i className="fas fa-home fa-4x text-muted mb-4"></i>
                    <h4 className="text-muted">No properties available</h4>
                    <p className="text-muted">
                      There are no properties in this category yet.
                    </p>
                  </div>
                </div>
              </Fade>
            ) : (
              <Slide direction="up" triggerOnce>
                <div className="category-carousel">
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
                    loop={category.items.length > 3}
                    className="category-swiper"
                  >
                    {category.items.map((item, index2) => (
                      <SwiperSlide key={`category-${index1}-item-${index2}`}>
                        <div className="category-card h-100">
                          <div className="card border-0 shadow-sm h-100 category-card-inner">
                            <div className="position-relative overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="card-img-top category-image"
                                style={{ height: "200px", objectFit: "cover" }}
                              />
                              <div className="category-overlay"></div>

                              {item.isPopular && (
                                <div className="popular-badge position-absolute top-0 start-0 m-3">
                                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                                    🔥 Popular
                                  </span>
                                </div>
                              )}

                              <div className="category-actions position-absolute top-0 end-0 m-3">
                                <button className="btn btn-light btn-sm rounded-circle me-2 p-2 category-action-btn">
                                  <i className="fas fa-heart"></i>
                                </button>
                                <button className="btn btn-light btn-sm rounded-circle p-2 category-action-btn">
                                  <i className="fas fa-eye"></i>
                                </button>
                              </div>
                            </div>

                            <div className="card-body d-flex flex-column">
                              <h5 className="card-title fw-bold mb-2">
                                {item.name}
                              </h5>
                              <p className="card-text text-muted mb-3 flex-grow-1">
                                {item.city}, {item.country}
                              </p>

                              <div className="property-features mb-3">
                                <div className="row g-2">
                                  <div className="col-4">
                                    <div className="text-center p-2 bg-light rounded">
                                      <i className="fas fa-bed text-primary"></i>
                                      <div className="small fw-bold">
                                        3 Beds
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="text-center p-2 bg-light rounded">
                                      <i className="fas fa-bath text-primary"></i>
                                      <div className="small fw-bold">
                                        2 Baths
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="text-center p-2 bg-light rounded">
                                      <i className="fas fa-wifi text-primary"></i>
                                      <div className="small fw-bold">WiFi</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="price-section mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <span className="h5 fw-bold text-primary">
                                      ${item.price}
                                    </span>
                                    <span className="text-muted">
                                      /{item.unit}
                                    </span>
                                  </div>
                                  <div className="rating">
                                    <i className="fas fa-star text-warning"></i>
                                    <span className="ms-1 fw-bold">4.8</span>
                                  </div>
                                </div>
                              </div>

                              <Button
                                type="link"
                                className="btn btn-outline-primary w-100 rounded-pill mt-auto"
                                href={`/properties/${item._id}`}
                              >
                                <i className="fas fa-eye me-2"></i>
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Slide>
            )}
          </div>
        ))}
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

        .category-action-btn {
          opacity: 0;
          transition: all 0.3s ease;
          transform: translateY(-10px);
        }

        .category-card-inner:hover .category-action-btn {
          opacity: 1;
          transform: translateY(0);
        }

        /* Empty State */
        .empty-state {
          padding: 3rem;
          border-radius: 20px;
          background: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* Carousel Styles */
        .category-swiper {
          padding: 20px 0 50px 0;
        }

        .category-carousel {
          position: relative;
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

        /* Responsive */
        @media (max-width: 768px) {
          .property-features {
            margin-bottom: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
