import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import Star from "elements/Star";
import { getAgents } from "services/api";

export default function Agents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await getAgents();
        const data = response.data || response;
        const agentsData = data.agents || data;

        // Transform agent data with safe object handling to prevent React child errors
        const transformedAgents = (agentsData || []).map((agent) => {
          const safeAgent = {
            ...agent,
            _id: agent._id || agent.id,
            agentId: String(agent.agentId || ""),
            profileImage: String(
              agent.profileImage || "https://via.placeholder.com/150"
            ),
            bio: String(agent.bio || ""),
            user: agent.user || null,
            specialties: Array.isArray(agent.specialties)
              ? agent.specialties.map((spec) => String(spec))
              : [],
            languages: Array.isArray(agent.languages)
              ? agent.languages.map((lang) => ({
                  language: String(
                    typeof lang === "string"
                      ? lang
                      : lang.language || "Indonesian"
                  ),
                  level: String(
                    typeof lang === "object"
                      ? lang.level || "conversational"
                      : "conversational"
                  ),
                  _id: typeof lang === "object" ? lang._id : undefined,
                }))
              : [{ language: "Indonesian", level: "conversational" }],
            location: {
              city: String(agent.location?.city || "Unknown"),
              state: String(agent.location?.state || "Unknown"),
              country: String(agent.location?.country || "Indonesia"),
              serviceAreas: Array.isArray(agent.location?.serviceAreas)
                ? agent.location.serviceAreas.map((area) => String(area))
                : [],
            },
            contact: {
              phone: String(agent.contact?.phone || ""),
              whatsapp: String(agent.contact?.whatsapp || ""),
              telegram: String(agent.contact?.telegram || ""),
              alternateEmail: String(agent.contact?.alternateEmail || ""),
            },
            // Experience with safe string conversion to prevent React child errors
            experience: {
              yearsInBusiness: Number(agent.experience?.yearsInBusiness) || 0,
              previousWork: String(agent.experience?.previousWork || ""),
              education: String(agent.experience?.education || ""),
              certifications: Array.isArray(agent.experience?.certifications)
                ? agent.experience.certifications.map((cert) => String(cert))
                : [],
            },
            statistics: {
              totalBookings: Number(agent.statistics?.totalBookings) || 0,
              totalRevenue: Number(agent.statistics?.totalRevenue) || 0,
              responseTime: {
                average: Number(agent.statistics?.responseTime?.average) || 1,
                unit: String(agent.statistics?.responseTime?.unit || "hours"),
              },
              successRate: Number(agent.statistics?.successRate) || 95,
            },
            ratings: {
              average: Number(agent.ratings?.average) || 4.5,
              count: Number(agent.ratings?.count) || 0,
              breakdown: agent.ratings?.breakdown || {},
            },
            verification: {
              isVerified: Boolean(agent.verification?.isVerified),
              documents: Array.isArray(agent.verification?.documents)
                ? agent.verification.documents
                : [],
              verifiedAt: agent.verification?.verifiedAt || null,
            },
            status: String(agent.status || "active"),
            featured: Boolean(agent.featured),
            properties: Array.isArray(agent.properties) ? agent.properties : [],
            lastActiveAt: agent.lastActiveAt || null,
            joinedAt: agent.joinedAt || agent.createdAt || null,
            propertyCount: Array.isArray(agent.properties)
              ? agent.properties.length
              : 0,
            displayName:
              agent.user?.firstName && agent.user?.lastName
                ? `${String(agent.user.firstName)} ${String(
                    agent.user.lastName
                  )}`
                : `Agent ${String(
                    agent.agentId || agent._id?.slice(-4) || "Unknown"
                  )}`,
          };

          return safeAgent;
        });

        setAgents(transformedAgents);
        document.title = "Find Your Perfect Agent | Staycation";
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError("Failed to load agents. Please try again later.");
        document.title = "Error Loading Agents | Staycation";
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleAgentClick = (agentId) => {
    if (agentId && typeof agentId === "string" && agentId.length === 24) {
      navigate(`/agents/${agentId}`);
    } else {
      console.warn("Invalid agent ID:", agentId);
      navigate("/agents");
    }
  };

  // Safe filtering functions
  const getUniqueLocations = () => {
    const locations = agents
      .map((agent) =>
        agent.location?.city && agent.location?.state
          ? `${agent.location.city}, ${agent.location.state}`
          : "Unknown"
      )
      .filter((location, index, arr) => arr.indexOf(location) === index)
      .sort();
    return ["all", ...locations];
  };

  const getUniqueSpecialties = () => {
    const specialties = agents
      .flatMap((agent) => agent.specialties || [])
      .map((spec) => String(spec))
      .filter((spec, index, arr) => arr.indexOf(spec) === index)
      .sort();
    return ["all", ...specialties];
  };

  const filteredAgents = agents.filter((agent) => {
    const locationMatch =
      selectedLocation === "all" ||
      (agent.location?.city && agent.location?.state
        ? `${agent.location.city}, ${agent.location.state}`
        : "Unknown") === selectedLocation;

    const specialtyMatch =
      selectedSpecialty === "all" ||
      (agent.specialties || []).some(
        (spec) => String(spec) === selectedSpecialty
      );

    return locationMatch && specialtyMatch;
  });

  if (loading) {
    return (
      <div>
        <Header />
        <div
          className="container"
          style={{ minHeight: "60vh", paddingTop: "120px" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Loading agents...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div
          className="container"
          style={{ minHeight: "60vh", paddingTop: "120px" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error Loading Agents</h4>
                <p className="mb-0">{error}</p>
              </div>
              <Button
                type="link"
                href="/agents"
                className="btn btn-primary mt-3"
              >
                <i className="fas fa-refresh me-2"></i>
                Try Again
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "120px" }}>
        {/* Hero Section */}
        <Fade>
          <section className="hero bg-light py-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h1 className="display-4 fw-bold text-dark mb-3">
                    Find Your Perfect Travel Agent
                  </h1>
                  <p className="lead text-muted mb-4">
                    Connect with experienced local agents who know the best
                    properties and destinations. Get personalized
                    recommendations and expert guidance for your perfect stay.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Fade>

        {/* Filters Section */}
        <section className="py-4 bg-white border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="locationFilter"
                  className="form-label fw-semibold"
                >
                  Filter by Location
                </label>
                <select
                  id="locationFilter"
                  className="form-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {getUniqueLocations().map((location) => (
                    <option key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="specialtyFilter"
                  className="form-label fw-semibold"
                >
                  Filter by Specialty
                </label>
                <select
                  id="specialtyFilter"
                  className="form-select"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {getUniqueSpecialties().map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty === "all"
                        ? "All Specialties"
                        : specialty
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-5">
          <div className="container">
            <Fade cascade damping={0.1}>
              {filteredAgents.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i
                      className="fas fa-search text-muted"
                      style={{ fontSize: "4rem" }}
                    ></i>
                  </div>
                  <h3 className="text-muted mb-3">No agents found</h3>
                  <p className="text-muted">
                    Try adjusting your filters to see more agents.
                  </p>
                  <Button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      setSelectedLocation("all");
                      setSelectedSpecialty("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="row">
                  {filteredAgents.map((agent) => (
                    <div key={agent._id} className="col-lg-4 col-md-6 mb-4">
                      <div
                        className="card h-100 shadow-sm border-0 agent-card"
                        style={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => handleAgentClick(agent._id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-5px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 2px 10px rgba(0,0,0,0.1)";
                        }}
                      >
                        <div className="card-body p-4">
                          {/* Agent Image and Basic Info */}
                          <div className="d-flex align-items-start mb-3">
                            <div className="position-relative me-3">
                              <img
                                src={agent.profileImage}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    agent.displayName
                                  )}&background=007bff&color=fff&size=80`;
                                }}
                                className="rounded-circle"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                                alt={`Agent ${agent.agentId || agent._id}`}
                              />
                              {agent.verification?.isVerified && (
                                <div
                                  className="position-absolute bottom-0 end-0 bg-success rounded-circle d-flex align-items-center justify-content-center"
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    border: "2px solid white",
                                  }}
                                  title="Verified Agent"
                                >
                                  <i
                                    className="fas fa-check text-white"
                                    style={{ fontSize: "10px" }}
                                  ></i>
                                </div>
                              )}
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="card-title mb-1 fw-bold">
                                {agent.displayName}
                              </h5>
                              <p className="text-primary mb-0 small fw-semibold">
                                {agent.specialties?.length > 0
                                  ? agent.specialties[0]
                                      .replace("-", " ")
                                      .replace(/\b\w/g, (l) =>
                                        l.toUpperCase()
                                      ) + " Specialist"
                                  : "Property Specialist"}
                              </p>
                              <p className="text-muted mb-0 small">
                                {agent.location?.city && agent.location?.state
                                  ? `${agent.location.city}, ${agent.location.state}`
                                  : "Indonesia"}
                              </p>
                            </div>
                          </div>

                          {/* Rating and Stats */}
                          <div className="d-flex align-items-center mb-3">
                            <div className="star-rating-container d-flex align-items-center">
                              <Star
                                value={
                                  typeof agent.ratings?.average === "number"
                                    ? agent.ratings.average
                                    : 4.5
                                }
                                width={16}
                                height={16}
                                spacing={2}
                              />
                              <span className="ms-2 small text-muted">
                                {typeof agent.ratings?.average === "number"
                                  ? agent.ratings.average.toFixed(1)
                                  : "4.5"}{" "}
                                ({agent.ratings?.count || 0} reviews)
                              </span>
                            </div>
                          </div>

                          {/* Experience and Response Time */}
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="text-center">
                              <div className="fw-bold text-primary">
                                <i className="fas fa-clock me-1"></i>
                                <span className="small">
                                  {typeof agent.experience?.yearsInBusiness ===
                                    "number" &&
                                  agent.experience.yearsInBusiness >= 0
                                    ? `${agent.experience.yearsInBusiness}+`
                                    : "1+"}{" "}
                                  Years
                                </span>
                              </div>
                              <small className="text-muted">Experience</small>
                            </div>
                            <div className="text-center">
                              <div className="fw-bold text-success">
                                <i className="fas fa-reply me-1"></i>
                                <span className="small">
                                  {agent.statistics?.responseTime?.unit ===
                                  "minutes"
                                    ? "< 1hr"
                                    : `< ${
                                        agent.statistics?.responseTime
                                          ?.average || 2
                                      }hr`}
                                </span>
                              </div>
                              <small className="text-muted">Response</small>
                            </div>
                            <div className="text-center">
                              <div className="fw-bold text-info">
                                <i className="fas fa-home me-1"></i>
                                <span className="small">
                                  {agent.propertyCount || 0}
                                </span>
                              </div>
                              <small className="text-muted">Properties</small>
                            </div>
                          </div>

                          {/* Bio */}
                          <p
                            className="card-text text-gray-600 mb-3"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {String(
                              agent.bio ||
                                "Professional agent ready to assist you."
                            )}
                          </p>

                          {/* Experience Details - Safe rendering to prevent React child errors */}
                          {(agent.experience?.education ||
                            agent.experience?.previousWork) && (
                            <div className="mb-3">
                              <div className="small text-muted mb-1">
                                Background:
                              </div>
                              {agent.experience?.education && (
                                <div className="small text-info mb-1">
                                  <i className="fas fa-graduation-cap me-1"></i>
                                  {String(agent.experience.education)}
                                </div>
                              )}
                              {agent.experience?.previousWork && (
                                <div className="small text-secondary">
                                  <i className="fas fa-briefcase me-1"></i>
                                  {String(agent.experience.previousWork)}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Languages */}
                          <div className="mb-3">
                            <div className="small text-muted mb-1">
                              Languages:
                            </div>
                            <div>
                              {(agent.languages || []).map(
                                (language, langIndex) => (
                                  <span
                                    key={`${agent._id}-lang-${langIndex}`}
                                    className="badge bg-light text-dark me-1 mb-1"
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    {String(language.language || language)}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          {/* Specialties */}
                          <div className="mb-3">
                            <div className="small text-muted mb-1">
                              Specialties:
                            </div>
                            <div>
                              {(agent.specialties || []).map(
                                (specialty, specIndex) => (
                                  <span
                                    key={`${agent._id}-spec-${specIndex}`}
                                    className="badge bg-primary me-1 mb-1"
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    {String(specialty)
                                      .replace("-", " ")
                                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          {/* Certifications - Safe rendering to prevent React child errors */}
                          <div className="mb-4">
                            <div className="small text-muted mb-1">
                              Certifications:
                            </div>
                            <div>
                              {(agent.experience?.certifications || [])
                                .filter((cert) => cert != null)
                                .map((certification, certIndex) => (
                                  <span
                                    key={`${agent._id}-cert-${certIndex}`}
                                    className="badge bg-success me-1 mb-1"
                                    style={{ fontSize: "0.65rem" }}
                                    title={String(certification)}
                                  >
                                    <i className="fas fa-certificate me-1"></i>
                                    {String(certification).length > 30
                                      ? `${String(certification).substring(
                                          0,
                                          30
                                        )}...`
                                      : String(certification)}
                                  </span>
                                ))}
                              {(!agent.experience?.certifications ||
                                agent.experience.certifications.length ===
                                  0) && (
                                <span
                                  className="badge bg-secondary me-1 mb-1"
                                  style={{ fontSize: "0.65rem" }}
                                >
                                  <i className="fas fa-clock me-1"></i>
                                  Certifications Pending
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Contact Button */}
                          <div className="d-grid">
                            <Button
                              type="button"
                              className="btn btn-primary w-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAgentClick(agent._id);
                              }}
                              style={{
                                minHeight: "45px",
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                                textTransform: "uppercase",
                                fontSize: "0.85rem",
                              }}
                            >
                              <i className="fas fa-comment-dots me-2"></i>
                              Contact Agent
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Fade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
