import Button from "elements/Button";
import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Star from "elements/Star";
import { formatPrice } from "utils/currency";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MostPicked(props) {
  const { data, loading, error } = props;

  // Loading state
  if (loading) {
    return (
      <section className="container py-5" ref={props.refMostPicked}>
        <Fade direction="up" delay={300} triggerOnce>
          <div className="text-center mb-5">
            <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
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
            <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
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
            <p className="mb-0">Please try again later. {error}</p>
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
            <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
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
          <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
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
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
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
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-fluid w-100 property-image"
                    style={{ height: "250px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = `/images/image-mostpicked-${
                        index + 1
                      }.jpg`;
                    }}
                  />
                  <div className="property-overlay"></div>

                  {/* Badge for popular/first item */}
                  {(item.isPopular || index === 0) && (
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                        ⭐ {item.isPopular ? "Popular" : "#1 Pick"}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="position-absolute bottom-0 end-0 m-3">
                    <span className="badge bg-dark text-white px-3 py-2 rounded-pill">
                      {formatPrice(item.price, item.unit || "night")}
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h5 className="fw-bold mb-2">{item.name}</h5>
                  <p className="text-muted mb-2">
                    {item.city}, {item.country}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="property-rating d-flex align-items-center">
                      <Star
                        value={item.rating}
                        width={16}
                        height={16}
                        spacing={2}
                      />
                      <small className="text-muted ms-2">
                        {item.rating?.toFixed(1)} ({item.reviewCount || 0})
                      </small>
                    </div>
                    <Button
                      className="btn btn-primary btn-sm px-3"
                      type="link"
                      href={`/properties/${item._id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
        
        .most-picked-swiper .swiper-pagination {
          bottom: 10px;
        }
        
        .most-picked-swiper .swiper-button-next,
        .most-picked-swiper .swiper-button-prev {
          color: #007bff;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
