import React, { useState } from "react";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import Star from "elements/Star";

const agents = [
  {
    id: 1,
    name: "Sarah Williams",
    title: "Senior Property Specialist",
    location: "Bali & Nusa Tenggara",
    image: "/images/testimonial-landingpages.jpg",
    rating: 4.9,
    reviews: 127,
    experience: "5+ years",
    languages: ["English", "Indonesian", "Mandarin"],
    specialties: ["Beach Properties", "Luxury Villas", "Romantic Getaways"],
    bio: "Sarah specializes in luxury beachfront properties across Bali. With over 5 years of experience, she has helped hundreds of guests find their perfect tropical escape.",
    verified: true,
    responseTime: "< 1 hour",
    properties: 45,
  },
  {
    id: 2,
    name: "Ahmad Rizki",
    title: "Cultural Heritage Specialist",
    location: "Yogyakarta & Central Java",
    image: "/images/testimonial-detailspage.jpg",
    rating: 4.8,
    reviews: 89,
    experience: "4+ years",
    languages: ["Indonesian", "English", "Javanese"],
    specialties: ["Cultural Sites", "Traditional Houses", "Family Stays"],
    bio: "Ahmad is your go-to expert for cultural experiences in Yogyakarta and Central Java. He knows the best traditional accommodations near historical sites.",
    verified: true,
    responseTime: "< 2 hours",
    properties: 32,
  },
  {
    id: 3,
    name: "Maria Santos",
    title: "Urban Living Expert",
    location: "Jakarta & Surrounding Areas",
    image: "/images/testimonial-landingpages.jpg",
    rating: 4.9,
    reviews: 156,
    experience: "6+ years",
    languages: ["English", "Indonesian", "Spanish"],
    specialties: ["City Apartments", "Business Travel", "Modern Living"],
    bio: "Maria helps busy professionals find the perfect urban accommodations in Jakarta. She understands the needs of business travelers and city explorers.",
    verified: true,
    responseTime: "< 30 minutes",
    properties: 67,
  },
  {
    id: 4,
    name: "David Chen",
    title: "Adventure & Nature Guide",
    location: "Bandung & West Java",
    image: "/images/testimonial-detailspage.jpg",
    rating: 4.7,
    reviews: 73,
    experience: "3+ years",
    languages: ["English", "Indonesian", "Chinese"],
    specialties: ["Mountain Lodges", "Adventure Tours", "Nature Retreats"],
    bio: "David is passionate about mountain adventures and nature retreats. He'll help you find the perfect cabin or lodge for your outdoor adventure.",
    verified: true,
    responseTime: "< 1 hour",
    properties: 28,
  },
  {
    id: 5,
    name: "Lisa Putri",
    title: "Wellness & Spa Specialist",
    location: "Ubud & Spiritual Bali",
    image: "/images/testimonial-landingpages.jpg",
    rating: 5.0,
    reviews: 94,
    experience: "4+ years",
    languages: ["Indonesian", "English", "Japanese"],
    specialties: ["Wellness Retreats", "Spa Resorts", "Meditation Centers"],
    bio: "Lisa specializes in wellness and spiritual retreats in Ubud and surrounding areas. She'll guide you to the most peaceful and rejuvenating accommodations.",
    verified: true,
    responseTime: "< 1 hour",
    properties: 23,
  },
  {
    id: 6,
    name: "Robert Johnson",
    title: "Family Vacation Planner",
    location: "Surabaya & East Java",
    image: "/images/testimonial-detailspage.jpg",
    rating: 4.8,
    reviews: 112,
    experience: "5+ years",
    languages: ["English", "Indonesian"],
    specialties: ["Family Resorts", "Kid-Friendly", "Educational Tours"],
    bio: "Robert specializes in creating memorable family vacations. He knows all the best family-friendly accommodations and activities in East Java.",
    verified: true,
    responseTime: "< 2 hours",
    properties: 41,
  },
];

export default function Agents() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const locations = [...new Set(agents.map((agent) => agent.location))];
  const specialties = [
    ...new Set(agents.flatMap((agent) => agent.specialties)),
  ];

  const filteredAgents = agents.filter((agent) => {
    const locationMatch =
      selectedLocation === "all" || agent.location === selectedLocation;
    const specialtyMatch =
      selectedSpecialty === "all" ||
      agent.specialties.includes(selectedSpecialty);
    return locationMatch && specialtyMatch;
  });

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="container pt-4 pb-5">
        <Fade direction="up" triggerOnce>
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold mb-3">Meet Our Agents</h1>
              <p className="lead text-gray-500 mb-4">
                Expert local guides ready to help you find the perfect
                staycation
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
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Location</label>
                    <select
                      className="form-select"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Specialty</label>
                    <select
                      className="form-select"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                      <option value="all">All Specialties</option>
                      {specialties.map((specialty, index) => (
                        <option key={index} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <Button className="btn btn-primary w-100" type="button">
                      Find Agent
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>

      {/* Agents Grid */}
      <section className="container pb-5">
        <div className="row g-4">
          {filteredAgents.map((agent, index) => (
            <div key={agent.id} className="col-lg-4 col-md-6">
              <Fade direction="up" triggerOnce delay={300 + index * 100}>
                <div className="card border-0 shadow-sm h-100 agent-card">
                  <div className="card-body p-4">
                    {/* Agent Header */}
                    <div className="d-flex align-items-center mb-3">
                      <div className="position-relative me-3">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="rounded-circle"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                        {agent.verified && (
                          <div
                            className="position-absolute bottom-0 end-0 bg-success rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "20px", height: "20px" }}
                          >
                            <i
                              className="text-white"
                              style={{ fontSize: "10px" }}
                            >
                              ✓
                            </i>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1 fw-bold">
                          {agent.name}
                        </h5>
                        <p className="text-primary mb-0 small fw-semibold">
                          {agent.title}
                        </p>
                        <p className="text-muted mb-0 small">
                          {agent.location}
                        </p>
                      </div>
                    </div>

                    {/* Rating and Stats */}
                    <div className="d-flex align-items-center mb-3">
                      <Star
                        value={agent.rating}
                        width={80}
                        height={16}
                        spacing={1}
                      />
                      <span className="ms-2 fw-bold">{agent.rating}</span>
                      <span className="ms-1 text-muted small">
                        ({agent.reviews} reviews)
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="row g-2 mb-3">
                      <div className="col-4">
                        <div className="text-center p-2 bg-light rounded">
                          <div className="fw-bold text-primary">
                            {agent.properties}
                          </div>
                          <div className="small text-muted">Properties</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-center p-2 bg-light rounded">
                          <div className="fw-bold text-primary">
                            {agent.experience}
                          </div>
                          <div className="small text-muted">Experience</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-center p-2 bg-light rounded">
                          <div className="fw-bold text-primary">
                            {agent.responseTime}
                          </div>
                          <div className="small text-muted">Response</div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p
                      className="card-text text-gray-600 mb-3"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {agent.bio}
                    </p>

                    {/* Languages */}
                    <div className="mb-3">
                      <div className="small text-muted mb-1">Languages:</div>
                      <div>
                        {agent.languages.map((language, langIndex) => (
                          <span
                            key={langIndex}
                            className="badge bg-light text-dark me-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="small text-muted mb-1">Specialties:</div>
                      <div>
                        {agent.specialties.map((specialty, specIndex) => (
                          <span
                            key={specIndex}
                            className="badge bg-primary me-1 mb-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-2">
                      <Button className="btn btn-primary" type="button">
                        Contact Agent
                      </Button>
                      <Button
                        className="btn btn-outline-secondary"
                        type="button"
                      >
                        View Properties
                      </Button>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          ))}
        </div>
      </section>

      {/* Become an Agent Section */}
      <section className="bg-light py-5">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h3 className="fw-bold mb-3">Become a Staycation Agent</h3>
                <p className="text-gray-600 mb-4">
                  Join our team of expert property specialists and help
                  travelers find their perfect staycation. Share your local
                  knowledge and earn while doing what you love.
                </p>
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <div className="text-center">
                      <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <span className="text-white fw-bold">1</span>
                      </div>
                      <h6 className="fw-bold">Apply Online</h6>
                      <p className="small text-muted">
                        Submit your application with your local expertise
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center">
                      <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <span className="text-white fw-bold">2</span>
                      </div>
                      <h6 className="fw-bold">Get Verified</h6>
                      <p className="small text-muted">
                        Complete our verification and training process
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center">
                      <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <span className="text-white fw-bold">3</span>
                      </div>
                      <h6 className="fw-bold">Start Earning</h6>
                      <p className="small text-muted">
                        Begin helping guests and earning commissions
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="btn btn-primary me-3" type="button">
                  Apply Now
                </Button>
                <Button className="btn btn-outline-primary" type="button">
                  Learn More
                </Button>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .agent-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .agent-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </>
  );
}
