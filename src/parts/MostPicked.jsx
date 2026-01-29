import Button from "elements/Button";
import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import Carousel, { SwiperSlide } from "elements/Carousel";
import Star from "elements/Star";
import { formatPrice } from "utils/currency";

export default function MostPicked(props) {
  const { data, loading, error } = props;

  // Loading state
  if (loading) {
    return (
      <section className="container py-5" ref={props.refMostPicked}>
        <Fade direction="up" delay={300} triggerOnce>
          <div className="text-center mb-5">
            <span className="badge section-badge px-3 py-2 rounded-pill mb-3">
              🏆 Most Popular
            </span>
            <h2 className="display-5 fw-bold mb-3">Most Picked Properties</h2>
            <p className="text-muted">
              Discover the most loved destinations by our travelers
            </p>
          </div>
        </Fade>

        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading amazing properties...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="container py-5" ref={props.refMostPicked}>
        <Fade direction="up" delay={300} triggerOnce>
          <div className="text-center mb-5">
            <span className="badge section-badge px-3 py-2 rounded-pill mb-3">
              🏆 Most Popular
            </span>
            <h2 className="display-5 fw-bold mb-3">Most Picked Properties</h2>
            <p className="text-muted">
              Discover the most loved destinations by our travelers
            </p>
          </div>
        </Fade>

        <div className="text-center py-5">
          <div className="alert alert-warning" role="alert">
            <h5>Unable to load properties</h5>
            <p className="mb-0">
              Please try again later. {error?.message || "Unknown error"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <section className="container py-5" ref={props.refMostPicked}>
        <Fade direction="up" delay={300} triggerOnce>
          <div className="text-center mb-5">
            <span className="badge section-badge px-3 py-2 rounded-pill mb-3">
              🏆 Most Popular
            </span>
            <h2 className="display-5 fw-bold mb-3">Most Picked Properties</h2>
            <p className="text-muted">
              Discover the most loved destinations by our travelers
            </p>
          </div>
        </Fade>

        <div className="text-center py-5">
          <p className="text-muted">No properties available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-5" ref={props.refMostPicked}>
      <Fade direction="up" delay={300} triggerOnce>
        <div className="text-center mb-5">
          <span className="badge section-badge px-3 py-2 rounded-pill mb-3">
            🏆 Most Popular
          </span>
          <h2 className="display-5 fw-bold mb-3">Most Picked Properties</h2>
          <p className="text-muted">
            Discover the most loved destinations by our travelers
          </p>
        </div>
      </Fade>
      {/* Properties Swiper */}
      <Slide direction="up" triggerOnce delay={400}>
        <Carousel
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="most-picked-swiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={`mostpicked-${item._id || "fallback"}-${index}`}>
              <div className="property-card h-100">
                <div className="position-relative overflow-hidden rounded-3">
                  <img
                    src={
                      item.imageUrls?.[0]?.url ||
                      item.imageUrls?.[0] ||
                      item.images?.[0]?.url ||
                      item.images?.[0] ||
                      item.imageUrl ||
                      item.mainImage ||
                      `/images/image-mostpicked-${(index % 5) + 1}.jpg`
                    }
                    alt={item.name || item.title || "Property"}
                    className="img-fluid w-100 property-image"
                    style={{ height: "250px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = `/images/image-mostpicked-${
                        (index % 5) + 1
                      }.jpg`;
                    }}
                  />
                  <div className="property-overlay"></div>

                  {/* Badge for popular/first item */}
                  {(item.isPopular || index === 0) && (
                    <div className="position-absolute top-0 start-0 m-3 z-2">
                      <span className="badge custom-badge-popular d-flex align-items-center gap-2">
                        <span className="star-icon">⭐</span>
                        {item.isPopular ? "Popular Choice" : "#1 Top Pick"}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="position-absolute bottom-0 end-0 m-3 z-2">
                    <span className="badge custom-badge-price">
                      <span className="text-secondary fw-normal">
                        Start from{" "}
                      </span>
                      <span className="price-amount">
                        {formatPrice(
                          item.price?.amount || item.price,
                          item.price?.per || item.unit || "night",
                        )}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h5 className="fw-bold mb-2">
                    {item.name || item.title || "Property"}
                  </h5>
                  <p className="text-muted mb-2">
                    {item.location?.city || item.city || "Unknown"},{" "}
                    {item.location?.country || item.country || "Location"}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="property-rating d-flex align-items-center">
                      <Star
                        value={item.rating || item.ratings?.average || 0}
                        width={16}
                        height={16}
                        spacing={2}
                      />
                      <small className="text-muted ms-2">
                        {(item.rating || item.ratings?.average || 0).toFixed(1)}{" "}
                        ({item.reviewCount || item.ratings?.count || 0})
                      </small>
                    </div>
                    <Button
                      className="btn btn-sm px-3 fw-bold text-white shadow-sm"
                      type="link"
                      style={{
                        backgroundColor: "#198754",
                        borderColor: "#198754",
                      }}
                      href={`/properties/${item._id || item.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Carousel>
      </Slide>{" "}
      <style>{`
        .property-card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        
        .property-image {
          transition: transform 0.3s ease;
        }
        
        .property-card:hover .property-image {
          transform: scale(1.05);
        }
        
        .property-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0,0,0,0.1), transparent);
        }
        
        .most-picked-swiper {
          padding-bottom: 50px;
        }
        
        .custom-badge-popular {
          padding: 8px 16px;
          background: #FF498B; /* Soft Pink / Reddish tone */
          color: white;
          border-radius: 30px; /* Consistent Pill Shape */
          font-weight: 500;
          box-shadow: 2px 2px 10px rgba(255, 73, 139, 0.3);
          z-index: 10;
        }

        .custom-badge-price {
          background: white;
          padding: 6px 14px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          font-weight: 500;
          color: #198754; /* Green for Price */
          z-index: 10;
        }

        .section-badge {
          background-color: #d1ecf1; /* Light Cyan */
          color: #0dcaf0; /* Cyan Text */
          font-weight: 600;
        }

        .most-picked-swiper .swiper-pagination {
          bottom: 10px;
        }
        
        .most-picked-swiper .swiper-button-next,
        .most-picked-swiper .swiper-button-prev {
          color: #0dcaf0; /* Cyan */
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          margin-top: -20px;
          z-index: 50;
          transition: all 0.3s ease;
        }

        .most-picked-swiper .swiper-button-next:hover,
        .most-picked-swiper .swiper-button-prev:hover {
          background: #0dcaf0; /* Cyan */
          color: white;
          box-shadow: 0 6px 16px rgba(13, 202, 240, 0.4);
        }
        
        .most-picked-swiper .swiper-button-next:after,
        .most-picked-swiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        
        .property-rating {
          font-size: 0.9rem;
        }
      `}</style>
    </section>
  );
}
