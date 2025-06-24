import React from "react";
import Star from "elements/Star";
import Button from "elements/Button";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

export default function Testimony({ data }) {
  return (
    <section className="testimony-section bg-light py-5">
      <div className="container">
        {/* Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-5">
            <span className="badge bg-success px-3 py-2 rounded-pill mb-3">
              💬 Guest Reviews
            </span>
            <h2 className="display-5 fw-bold mb-3">What Our Guests Say</h2>
            <p className="text-muted">
              Real experiences from real travelers who stayed with us
            </p>
          </div>
        </Fade>

        {/* Main Testimony */}
        <div className="row align-items-center g-5">
          {/* Image Section */}
          <div className="col-lg-6">
            <Slide direction="left" triggerOnce>
              <div className="testimony-image-wrapper position-relative">
                <div className="testimony-image-container">
                  <img
                    src={data.imageUrl}
                    alt="Happy Guest"
                    className="img-fluid testimony-main-image rounded-4 shadow-lg"
                  />
                  <div className="floating-elements">
                    {/* Floating Rating Badge */}
                    <div className="floating-badge position-absolute">
                      <div className="bg-white rounded-4 p-3 shadow">
                        <div className="d-flex align-items-center">
                          <Star
                            value={data.rate}
                            width={20}
                            height={20}
                            spacing={2}
                          />
                          <span className="ms-2 fw-bold text-primary">
                            {data.rate}/5
                          </span>
                        </div>
                        <div className="small text-muted mt-1">Excellent</div>
                      </div>
                    </div>

                    {/* Floating Stats */}
                    <div className="floating-stats position-absolute">
                      <div className="bg-primary rounded-4 p-3 text-white shadow">
                        <div className="fw-bold h4 mb-0">98%</div>
                        <div className="small">Happy Guests</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slide>
          </div>

          {/* Content Section */}
          <div className="col-lg-6">
            <Slide direction="right" triggerOnce delay={200}>
              <div className="testimony-content">
                <div className="mb-4">
                  <h3 className="fw-bold text-primary mb-2">{data.name}</h3>
                  <div className="d-flex align-items-center mb-3">
                    <Star
                      value={data.rate}
                      width={25}
                      height={25}
                      spacing={3}
                    />
                    <span className="ms-2 badge bg-warning text-dark px-2 py-1">
                      {data.rate} Stars
                    </span>
                  </div>
                </div>

                <blockquote className="blockquote">
                  <p className="lead fst-italic mb-4">"{data.content}"</p>
                </blockquote>

                <div className="guest-info bg-white rounded-4 p-4 shadow-sm mb-4">
                  <div className="d-flex align-items-center">
                    <div
                      className="guest-avatar bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <span className="text-white fw-bold fs-5">
                        {data.familyName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="fw-bold">{data.familyName}</div>
                      <div className="text-muted small">
                        {data.familyOccupation}
                      </div>
                      <div className="text-primary small">✓ Verified Guest</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <Button
                    className="btn btn-primary px-4 py-2 rounded-pill"
                    type="link"
                    href={`/testimonial/${data._id}`}
                  >
                    <i className="fas fa-eye me-2"></i>
                    Read Full Review
                  </Button>
                  <Button
                    className="btn btn-outline-primary px-4 py-2 rounded-pill"
                    type="link"
                    href="/stories"
                  >
                    <i className="fas fa-book me-2"></i>
                    More Stories
                  </Button>
                </div>
              </div>
            </Slide>
          </div>
        </div>

        {/* Additional Stats */}
        <Zoom triggerOnce delay={400}>
          <div className="row mt-5">
            <div className="col-12">
              <div className="stats-section bg-white rounded-4 p-4 shadow-sm">
                <div className="row text-center">
                  <div className="col-md-3 col-6">
                    <div className="stat-item">
                      <div className="h2 fw-bold text-primary mb-1">5000+</div>
                      <div className="text-muted">Happy Guests</div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="stat-item">
                      <div className="h2 fw-bold text-success mb-1">4.9</div>
                      <div className="text-muted">Average Rating</div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="stat-item">
                      <div className="h2 fw-bold text-warning mb-1">98%</div>
                      <div className="text-muted">Satisfaction Rate</div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="stat-item">
                      <div className="h2 fw-bold text-info mb-1">24/7</div>
                      <div className="text-muted">Customer Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Zoom>
      </div>{" "}
      <style>{`
        .testimony-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        .testimony-image-wrapper {
          position: relative;
        }
        
        .testimony-main-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .testimony-main-image:hover {
          transform: scale(1.02);
        }
        
        .floating-badge {
          top: -10px;
          right: -10px;
          animation: float 3s ease-in-out infinite;
        }
        
        .floating-stats {
          bottom: -15px;
          left: -15px;
          animation: float 3s ease-in-out infinite reverse;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .blockquote {
          position: relative;
        }
        
        .blockquote::before {
          content: '"';
          font-size: 4rem;
          color: #007bff;
          position: absolute;
          left: -20px;
          top: -20px;
          font-family: serif;
        }
        
        .stat-item {
          padding: 1rem;
          transition: transform 0.3s ease;
        }
        
        .stat-item:hover {
          transform: translateY(-5px);
        }
        
        .guest-info {
          border-left: 4px solid #007bff;
        }
        
        @media (max-width: 768px) {
          .floating-badge,
          .floating-stats {
            position: static !important;
            display: inline-block;
            margin: 10px;
          }
          
          .testimony-main-image {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
