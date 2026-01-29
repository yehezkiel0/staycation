import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
import BookingForm from "parts/BookingForm";
import Breadcrumb from "elements/Breadcrumb";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import Star from "elements/Star";
import { propertyService } from "services/property.service";
import { formatIDRCurrency } from "utils/currency";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getDetail(id);
        setProperty(data);
        document.title = `${data.title} | Staycation`;
      } catch (err) {
        setError(err.message);
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="container py-5">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="text-muted mt-3">Loading property details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <main>
          <div className="container py-5">
            <div className="text-center">
              <div className="alert alert-danger" role="alert">
                <h4>Property Not Found</h4>
                <p>
                  The property you're looking for doesn't exist or has been
                  removed.
                </p>
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("/browse-by")}
                >
                  Browse Properties
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!property) {
    return null;
  }

  const images = property.images;

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container py-3">
          <Breadcrumb
            data={[
              { pageTitle: "Home", pageHref: "/" },
              { pageTitle: "Properties", pageHref: "/properties" },
              { pageTitle: property?.title, pageHref: "" },
            ]}
          />
        </div>

        {/* Property Details */}
        <section className="container pb-5">
          <div className="row">
            {/* Property Images */}
            <div className="col-lg-8">
              <Fade direction="up" triggerOnce>
                <div className="property-gallery mb-4">
                  {/* Main Image */}
                  <div className="main-image mb-3">
                    <img
                      src={
                        images[selectedImage]?.url ||
                        "/images/img-featured-1.jpg"
                      }
                      alt={property.title}
                      className="img-fluid w-100 rounded-3"
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </div>

                  {/* Thumbnail Images */}
                  {images.length > 1 && (
                    <div className="row g-2">
                      {images.map((image, index) => (
                        <div key={index} className="col-2">
                          <img
                            src={image.url}
                            alt={`${property.title} ${index + 1}`}
                            className={`img-fluid w-100 rounded-2 cursor-pointer ${
                              selectedImage === index
                                ? "border border-primary border-3"
                                : ""
                            }`}
                            style={{ height: "80px", objectFit: "cover" }}
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Fade>

              {/* Property Info */}
              <Fade direction="up" triggerOnce delay={200}>
                <div className="property-info">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h1 className="h2 fw-bold mb-2">{property.title}</h1>
                      <p className="text-muted mb-2">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {property.location.address}, {property.location.city},{" "}
                        {property.location.state}
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <Star
                          value={property.ratings.average}
                          width={20}
                          height={20}
                          spacing={2}
                        />
                        <span className="ms-2 fw-bold">
                          {property.ratings.average}
                        </span>
                        <span className="text-muted ms-1">
                          ({property.ratings.count} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-end">
                      <h3 className="text-primary fw-bold mb-0">
                        {formatIDRCurrency(property.price.amount)}
                        <small className="text-muted fw-normal">
                          /{property.price.per}
                        </small>
                      </h3>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-3 col-6">
                      <div className="spec-item text-center p-3 bg-light rounded">
                        <i
                          className="fas fa-bed text-primary mb-2"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <div className="fw-bold">
                          {property.specifications.bedrooms}
                        </div>
                        <small className="text-muted">Bedrooms</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="spec-item text-center p-3 bg-light rounded">
                        <i
                          className="fas fa-bath text-primary mb-2"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <div className="fw-bold">
                          {property.specifications.bathrooms}
                        </div>
                        <small className="text-muted">Bathrooms</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="spec-item text-center p-3 bg-light rounded">
                        <i
                          className="fas fa-users text-primary mb-2"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <div className="fw-bold">
                          {property.specifications.maxGuests}
                        </div>
                        <small className="text-muted">Max Guests</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="spec-item text-center p-3 bg-light rounded">
                        <i
                          className="fas fa-expand-arrows-alt text-primary mb-2"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <div className="fw-bold">
                          {property.specifications.area.size}
                        </div>
                        <small className="text-muted">
                          {property.specifications.area.unit}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h4 className="fw-bold mb-3">Description</h4>
                    <p className="text-muted">{property.description}</p>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <h4 className="fw-bold mb-3">Amenities</h4>
                    <div className="row g-2">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="col-md-6">
                          <div className="d-flex align-items-center p-2">
                            <i
                              className={`${amenity.icon} text-primary me-3`}
                            ></i>
                            <span>{amenity.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agent Info */}
                  {property.agent && (
                    <div className="mb-4">
                      <h4 className="fw-bold mb-3">Your Host</h4>
                      <div className="card border-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex align-items-center px-2">
                            <img
                              src={
                                property.agent.profileImage ||
                                property.agent.avatar ||
                                "/images/testimonial-landingpages.jpg"
                              }
                              alt={`${property.agent.firstName || "Agent"} ${
                                property.agent.lastName || ""
                              }`}
                              className="rounded-circle me-3"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.src =
                                  "/images/testimonial-landingpages.jpg";
                              }}
                            />
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">
                                {property.agent.firstName || "Agent"}{" "}
                                {property.agent.lastName || ""}
                              </h6>
                              <p className="text-muted mb-1">
                                {property.agent.bio ||
                                  "Professional property host with years of experience."}
                              </p>
                              <div className="d-flex align-items-center">
                                <Star
                                  value={property.agent.rating || 4.8}
                                  width={16}
                                  height={16}
                                  spacing={1}
                                />
                                <small className="text-muted ms-2">
                                  {property.agent.rating || 4.8} (
                                  {property.agent.reviewCount || 127} reviews)
                                </small>
                              </div>
                            </div>
                            <Button
                              className="btn btn-outline-primary custom-contact-btn"
                              type="button"
                              onClick={() => {
                                // Check if agent has a valid ObjectId or use fallback
                                const agentId =
                                  property.agent._id || property.agent.id;
                                if (agentId && agentId.length === 24) {
                                  // Valid MongoDB ObjectId (24 characters)
                                  navigate(`/agents/${agentId}`);
                                } else {
                                  // For demo purposes, use a mock ObjectId or show message
                                  console.log(
                                    "Agent ID not in ObjectId format:",
                                    agentId,
                                  );
                                  // You can navigate to a generic agent page or show a contact form
                                  navigate(`/agents/demo`);
                                }
                              }}
                            >
                              Contact Host
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Fade>
            </div>

            {/* Booking Sidebar */}
            <div className="col-lg-4">
              <Fade direction="up" triggerOnce delay={400}>
                <BookingForm property={property} />
              </Fade>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
