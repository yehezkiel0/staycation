import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
// import Breadcrumb from "elements/Breadcrumb";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import Star from "elements/Star";
import { agentsAPI } from "services/api";
import { formatPrice } from "utils/currency";

export default function AgentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await agentsAPI.getById(id);
        const agentData = response.agent || response.data || response;
        setAgent(agentData);
        document.title = `${agentData.user?.firstName} ${agentData.user?.lastName} | Staycation Agents`;
      } catch (err) {
        setError(err.message);
        console.error("Error fetching agent:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgent();
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
              <p className="text-muted mt-3">Loading agent profile...</p>
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
                <h4>Agent Not Found</h4>
                <p>
                  The agent you're looking for doesn't exist or has been
                  removed.
                </p>
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("/agents")}
                >
                  Browse Agents
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!agent) {
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <Fade triggerOnce>
          <section className="container py-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/agents">Agents</a>
                </li>
                <li className="breadcrumb-item active">
                  {agent?.user?.firstName} {agent?.user?.lastName}
                </li>
              </ol>
            </nav>
          </section>
        </Fade>
        <Fade direction="up" triggerOnce>
          <section className="container">
            <div className="row">
              <div className="col-lg-4">
                {/* Agent Profile Card */}
                <div className="card mb-4">
                  <div className="card-body text-center">
                    {/* Profile Image */}
                    <div className="mb-3">
                      <img
                        src={
                          agent.profileImage?.url ||
                          agent.profileImage ||
                          agent.user?.avatar ||
                          agent.user?.profileImage ||
                          agent.avatar ||
                          "/images/testimonial-landingpages.jpg"
                        }
                        alt={`${
                          agent.user?.firstName || agent.firstName || "Agent"
                        } ${agent.user?.lastName || agent.lastName || ""}`}
                        className="rounded-circle"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = "/images/testimonial-landingpages.jpg";
                        }}
                      />
                    </div>

                    {/* Name and Title */}
                    <h4 className="mb-1">
                      {agent.user?.firstName || agent.firstName || "Agent"}{" "}
                      {agent.user?.lastName || agent.lastName || ""}
                    </h4>
                    <p className="text-muted mb-3">
                      {agent.specialization ||
                        agent.title ||
                        "Real Estate Agent"}
                    </p>

                    {/* Rating */}
                    {agent.ratings?.average > 0 && (
                      <div className="mb-3">
                        <Star
                          value={agent.ratings.average}
                          height={16}
                          width={16}
                          spacing={4}
                        />
                        <span className="ms-2 text-muted">
                          {agent.ratings.average.toFixed(1)} (
                          {agent.ratings.count} reviews)
                        </span>
                      </div>
                    )}

                    {/* Status */}
                    <div className="mb-3">
                      <span
                        className={`badge ${
                          agent.status === "active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {agent.status === "active"
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-3">
                      {agent.contact?.phone && (
                        <div className="mb-2">
                          <i className="fas fa-phone text-primary me-2"></i>
                          <small>{agent.contact.phone}</small>
                        </div>
                      )}
                      {(agent.user?.email || agent.email) && (
                        <div className="mb-2">
                          <i className="fas fa-envelope text-primary me-2"></i>
                          <small>{agent.user?.email || agent.email}</small>
                        </div>
                      )}
                      {agent.contact?.whatsapp && (
                        <div className="mb-2">
                          <i className="fab fa-whatsapp text-success me-2"></i>
                          <small>{agent.contact.whatsapp}</small>
                        </div>
                      )}
                      {agent.location?.city && (
                        <div className="mb-2">
                          <i className="fas fa-map-marker-alt text-primary me-2"></i>
                          <small>
                            {agent.location.city},{" "}
                            {agent.location.country || agent.location.state}
                          </small>
                        </div>
                      )}
                    </div>

                    {/* Contact Button */}
                    <Button
                      className="btn btn-primary w-100"
                      type="button"
                      onClick={() => {
                        // Handle contact action
                        if (agent.contact?.phone) {
                          window.open(`tel:${agent.contact.phone}`);
                        }
                      }}
                    >
                      <i className="fas fa-phone me-2"></i>
                      Contact Agent
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Quick Stats</h6>
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="text-primary fw-bold">
                          {agent.propertyCount || 0}
                        </div>
                        <small className="text-muted">Properties</small>
                      </div>
                      <div className="col-4">
                        <div className="text-primary fw-bold">
                          {agent.statistics?.totalBookings || 0}
                        </div>
                        <small className="text-muted">Sales</small>
                      </div>
                      <div className="col-4">
                        <div className="text-primary fw-bold">
                          {agent.experience?.yearsInBusiness || 0}+
                        </div>
                        <small className="text-muted">Years</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                {/* About Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">About</h5>
                    <p className="card-text">
                      {agent.bio ||
                        "Professional real estate agent dedicated to helping you find your perfect property."}
                    </p>

                    {/* Specializations */}
                    {agent.specialties && agent.specialties.length > 0 && (
                      <div className="mb-3">
                        <h6>Specializations:</h6>
                        <div>
                          {agent.specialties.map((spec, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-dark me-2 mb-2"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Languages */}
                    {agent.languages && agent.languages.length > 0 && (
                      <div className="mb-3">
                        <h6>Languages:</h6>
                        <p>
                          {agent.languages
                            .map((lang) =>
                              typeof lang === "object"
                                ? `${lang.language || lang} (${
                                    lang.level || ""
                                  })`
                                : String(lang)
                            )
                            .join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Properties Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Properties</h5>
                    {agent.properties && agent.properties.length > 0 ? (
                      <div className="row">
                        {agent.properties.slice(0, 6).map((property, index) => (
                          <div
                            key={`property-${
                              property._id || "fallback"
                            }-${index}`}
                            className="col-md-6 mb-3"
                          >
                            <div className="card h-100">
                              <img
                                src={
                                  property.imageUrls?.[0]?.url ||
                                  property.imageUrls?.[0] ||
                                  property.images?.[0]?.url ||
                                  property.images?.[0] ||
                                  property.mainImage ||
                                  `/images/image-mostpicked-${
                                    (index % 5) + 1
                                  }.jpg`
                                }
                                className="card-img-top"
                                alt={property.title || "Property"}
                                style={{ height: "150px", objectFit: "cover" }}
                                onError={(e) => {
                                  e.target.src = `/images/image-mostpicked-${
                                    (index % 5) + 1
                                  }.jpg`;
                                }}
                              />
                              <div className="card-body">
                                <h6 className="card-title">
                                  {property.title ||
                                    property.name ||
                                    "Property"}
                                </h6>
                                <p className="card-text text-muted small">
                                  {property.location?.city ||
                                    property.city ||
                                    "Unknown"}
                                  ,{" "}
                                  {property.location?.country ||
                                    property.country ||
                                    "Location"}
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="text-primary fw-bold">
                                    {formatPrice(
                                      property.price?.amount || property.price,
                                      property.price?.per ||
                                        property.unit ||
                                        "night"
                                    )}
                                  </span>
                                  <Button
                                    className="btn btn-sm btn-outline-primary"
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/properties/${
                                          property._id || property.id
                                        }`
                                      )
                                    }
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No properties available.</p>
                    )}

                    {agent.properties && agent.properties.length > 6 && (
                      <div className="text-center mt-3">
                        <Button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={() =>
                            navigate(`/properties?agent=${agent._id}`)
                          }
                        >
                          View All Properties
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reviews Section */}
                {agent.reviews && agent.reviews.length > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Reviews</h5>
                      {agent.reviews.slice(0, 3).map((review, index) => (
                        <div
                          key={`review-${review._id || "fallback"}-${index}`}
                          className="mb-3 pb-3 border-bottom"
                        >
                          <div className="d-flex align-items-center mb-2">
                            <img
                              src={
                                review.user?.avatar ||
                                "/images/default-avatar.jpg"
                              }
                              alt={review.user?.firstName}
                              className="rounded-circle me-2"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <div className="fw-bold">
                                {review.user?.firstName} {review.user?.lastName}
                              </div>
                              <Star
                                value={review.rating}
                                height={14}
                                width={14}
                                spacing={2}
                              />
                            </div>
                          </div>
                          <p className="mb-0">{review.comment}</p>
                          <small className="text-muted">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back to Agents */}
            <div className="text-center mt-5">
              <Button
                className="btn btn-outline-primary"
                type="button"
                onClick={() => navigate("/agents")}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Agents
              </Button>
            </div>
          </section>
        </Fade>{" "}
      </main>
      <Footer />
    </>
  );
}
