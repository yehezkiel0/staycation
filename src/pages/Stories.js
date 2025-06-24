import React from "react";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade, Slide, Zoom, AttentionSeeker } from "react-awesome-reveal";
import Button from "elements/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCards,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";

const stories = [
  {
    id: 1,
    title: "A Perfect Weekend Getaway in Bali",
    excerpt:
      "Discover how Sarah and John spent their romantic weekend in a beautiful beachfront villa in Bali.",
    image: "/images/img-featured-1.jpg",
    author: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b0e0?w=150&h=150&fit=crop&crop=face",
    date: "March 15, 2024",
    readTime: "5 min read",
    tags: ["Bali", "Romance", "Beach"],
    category: "Romance",
    likes: 245,
    comments: 18,
  },
  {
    id: 2,
    title: "Family Adventure in Yogyakarta",
    excerpt:
      "Follow the Anderson family as they explore the cultural heart of Java in their comfortable city apartment.",
    image: "/images/img-featured-2.jpg",
    author: "Mike Anderson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    date: "March 10, 2024",
    readTime: "7 min read",
    tags: ["Yogyakarta", "Family", "Culture"],
    category: "Family",
    likes: 189,
    comments: 24,
  },
  {
    id: 3,
    title: "Solo Traveler's Guide to Jakarta",
    excerpt:
      "Tips and experiences from Maria's solo adventure staying in modern Jakarta apartments.",
    image: "/images/img-featured-3.jpg",
    author: "Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    date: "March 5, 2024",
    readTime: "6 min read",
    tags: ["Jakarta", "Solo Travel", "Urban"],
    category: "Solo",
    likes: 167,
    comments: 12,
  },
  {
    id: 4,
    title: "Mountain Retreat: Finding Peace in Bandung",
    excerpt:
      "Escape the city noise and discover tranquility in the mountains of West Java.",
    image: "/images/image-mostpicked-1.jpg",
    author: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "February 28, 2024",
    readTime: "8 min read",
    tags: ["Bandung", "Mountains", "Wellness"],
    category: "Wellness",
    likes: 298,
    comments: 31,
  },
  {
    id: 5,
    title: "Luxury Villa Experience in Ubud",
    excerpt:
      "An unforgettable stay in a traditional Balinese villa surrounded by rice terraces.",
    image: "/images/image-mostpicked-2.jpg",
    author: "Lisa Chen",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    date: "February 20, 2024",
    readTime: "4 min read",
    tags: ["Ubud", "Luxury", "Nature"],
    category: "Luxury",
    likes: 356,
    comments: 42,
  },
  {
    id: 6,
    title: "Business Trip Made Special in Surabaya",
    excerpt:
      "How to turn a business trip into a memorable experience with the right accommodation.",
    image: "/images/image-mostpicked-3.jpg",
    author: "Robert Taylor",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    date: "February 15, 2024",
    readTime: "5 min read",
    tags: ["Surabaya", "Business", "Productivity"],
    category: "Business",
    likes: 134,
    comments: 8,
  },
  {
    id: 7,
    title: "Honeymoon Paradise in Lombok",
    excerpt:
      "Create magical memories in the pristine beaches and crystal waters of Lombok.",
    image: "/images/image-category-1.jpg",
    author: "Emma Watson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    date: "February 10, 2024",
    readTime: "6 min read",
    tags: ["Lombok", "Honeymoon", "Beach"],
    category: "Romance",
    likes: 412,
    comments: 55,
  },
  {
    id: 8,
    title: "Culinary Journey Through Medan",
    excerpt:
      "Taste the authentic flavors of North Sumatra while staying in cozy local accommodations.",
    image: "/images/image-category-2.jpg",
    author: "Ahmad Rizky",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    date: "February 5, 2024",
    readTime: "9 min read",
    tags: ["Medan", "Culinary", "Local"],
    category: "Culinary",
    likes: 278,
    comments: 29,
  },
];

const featuredStory = stories[0];
const trendingStories = stories.slice(1, 4);
const otherStories = stories.slice(4);

export default function Stories() {
  return (
    <>
      <Header />
      {/* Enhanced Hero Section */}
      <section className="stories-hero position-relative overflow-hidden">
        <div className="hero-background"></div>
        <div className="container position-relative">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              {" "}
              <Fade direction="up" triggerOnce>
                <div className="hero-content text-white">
                  <AttentionSeeker effect="pulse" triggerOnce>
                    <span className="hero-badge bg-primary px-4 py-2 rounded-pill fw-bold mb-3 d-inline-block text-white">
                      ✨ Guest Stories
                    </span>
                  </AttentionSeeker>
                  <h1 className="display-3 fw-bold mb-4 hero-title text-white">
                    Real Stories,
                    <span className="text-warning d-block">
                      Real Experiences
                    </span>
                  </h1>
                  <p className="lead mb-4 text-white opacity-90">
                    Discover amazing adventures and create memories that last a
                    lifetime through authentic stories from our guests across
                    Indonesia.
                  </p>
                  <div className="hero-stats row g-3 mb-4">
                    <div className="col-4">
                      <div className="stat-item text-center">
                        <h3 className="h2 fw-bold text-warning">1000+</h3>
                        <p className="small mb-0 text-white opacity-80">
                          Stories Shared
                        </p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item text-center">
                        <h3 className="h2 fw-bold text-warning">25+</h3>
                        <p className="small mb-0 text-white opacity-80">
                          Cities Covered
                        </p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item text-center">
                        <h3 className="h2 fw-bold text-warning">50k+</h3>
                        <p className="small mb-0 text-white opacity-80">
                          Happy Guests
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hero-actions">
                    <Button
                      className="btn btn-primary btn-lg px-5 py-3 me-3 rounded-pill"
                      type="button"
                    >
                      Read Stories
                    </Button>
                    <Button
                      className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
                      type="button"
                    >
                      Share Your Story
                    </Button>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-6">
              <Slide direction="right" triggerOnce>
                <div className="hero-image-container position-relative">
                  <div className="floating-cards">
                    <div className="floating-card card-1">
                      <img
                        src="/images/img-featured-1.jpg"
                        alt="Story 1"
                        className="rounded-3"
                      />
                    </div>
                    <div className="floating-card card-2">
                      <img
                        src="/images/img-featured-2.jpg"
                        alt="Story 2"
                        className="rounded-3"
                      />
                    </div>
                    <div className="floating-card card-3">
                      <img
                        src="/images/img-featured-3.jpg"
                        alt="Story 3"
                        className="rounded-3"
                      />
                    </div>
                  </div>
                </div>
              </Slide>
            </div>
          </div>
        </div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>
      {/* Featured Story with Enhanced Layout */}
      <section className="featured-story-section py-5 bg-light">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="text-center mb-5">
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                Featured Story
              </span>
              <h2 className="display-5 fw-bold">Story of the Month</h2>
              <p className="text-muted">
                The most inspiring journey shared by our community
              </p>
            </div>
          </Fade>

          <Zoom triggerOnce>
            <div className="featured-story-card position-relative">
              <div className="row g-0 align-items-center">
                <div className="col-lg-7">
                  <div className="story-image-wrapper position-relative overflow-hidden">
                    <img
                      src={featuredStory.image}
                      alt={featuredStory.title}
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: "cover", minHeight: "500px" }}
                    />
                    <div className="image-overlay"></div>
                    <div className="story-category position-absolute top-0 start-0 m-4">
                      <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold">
                        {featuredStory.category}
                      </span>
                    </div>
                    <div className="story-engagement position-absolute bottom-0 start-0 m-4 d-flex gap-3">
                      <div className="engagement-item bg-white rounded-pill px-3 py-2 d-flex align-items-center">
                        <i className="fas fa-heart text-danger me-2"></i>
                        <span className="fw-bold">{featuredStory.likes}</span>
                      </div>
                      <div className="engagement-item bg-white rounded-pill px-3 py-2 d-flex align-items-center">
                        <i className="fas fa-comment text-primary me-2"></i>
                        <span className="fw-bold">
                          {featuredStory.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="story-content p-5">
                    <div className="story-meta mb-3 d-flex align-items-center">
                      <span className="badge bg-primary me-2">
                        {featuredStory.readTime}
                      </span>
                      <span className="text-muted small">
                        {featuredStory.date}
                      </span>
                    </div>
                    <h2 className="story-title fw-bold mb-4 h3">
                      {featuredStory.title}
                    </h2>
                    <p className="story-excerpt text-muted mb-4 lead">
                      {featuredStory.excerpt}
                    </p>

                    <div className="author-info d-flex align-items-center mb-4">
                      <img
                        src={featuredStory.avatar}
                        alt={featuredStory.author}
                        className="rounded-circle me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div className="fw-bold">{featuredStory.author}</div>
                        <div className="text-muted small">
                          Travel Enthusiast
                        </div>
                      </div>
                    </div>

                    <div className="story-tags mb-4">
                      {featuredStory.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark me-2 mb-2 px-3 py-2"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      className="btn btn-primary btn-lg px-4 py-3 rounded-pill"
                      type="button"
                    >
                      <i className="fas fa-book-open me-2"></i>
                      Read Full Story
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </div>
      </section>{" "}
      {/* Trending Stories Carousel */}
      <section className="trending-stories-section py-5">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="text-center mb-5">
              <span className="badge bg-warning px-3 py-2 rounded-pill mb-3">
                🔥 Trending Now
              </span>
              <h2 className="display-5 fw-bold">Stories Everyone's Reading</h2>
              <p className="text-muted">
                The most popular stories from our community
              </p>
            </div>
          </Fade>

          <Slide direction="up" triggerOnce>
            <div className="trending-carousel-wrapper">
              {" "}
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
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="trending-swiper"
              >
                {trendingStories.map((story, index) => (
                  <SwiperSlide key={story.id} className="trending-slide">
                    <div className="trending-card">
                      <div className="card-image-wrapper position-relative overflow-hidden">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="card-image w-100"
                        />
                        <div className="card-overlay"></div>
                        <div className="trending-badge position-absolute top-0 end-0 m-3">
                          <span className="badge bg-warning text-dark px-2 py-1 rounded-pill">
                            #{index + 1} Trending
                          </span>
                        </div>
                        <div className="card-engagement position-absolute bottom-0 start-0 end-0 p-3">
                          <div className="d-flex justify-content-between align-items-center text-white">
                            <div className="d-flex gap-3">
                              <span>
                                <i className="fas fa-heart me-1"></i>
                                {story.likes}
                              </span>
                              <span>
                                <i className="fas fa-comment me-1"></i>
                                {story.comments}
                              </span>
                            </div>
                            <span className="badge bg-white text-dark">
                              {story.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="card-content p-4">
                        <div className="story-category mb-2">
                          <span className="badge bg-primary">
                            {story.category}
                          </span>
                        </div>
                        <h4 className="card-title fw-bold mb-3">
                          {story.title}
                        </h4>
                        <p className="card-text text-muted mb-3">
                          {story.excerpt}
                        </p>
                        <div className="author-info d-flex align-items-center mb-3">
                          <img
                            src={story.avatar}
                            alt={story.author}
                            className="rounded-circle me-2"
                            style={{
                              width: "32px",
                              height: "32px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <div className="fw-semibold small">
                              {story.author}
                            </div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {story.date}
                            </div>
                          </div>
                        </div>
                        <Button
                          className="btn btn-outline-primary w-100 rounded-pill"
                          type="button"
                        >
                          Read Story
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Slide>
        </div>
      </section>
      {/* Stories Grid with Enhanced Cards */}
      <section className="stories-grid-section py-5 bg-light">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold">More Amazing Stories</h2>
              <p className="text-muted">
                Discover more incredible journeys from our travelers
              </p>
            </div>
          </Fade>

          <div className="stories-masonry">
            {otherStories.map((story, index) => (
              <div
                key={story.id}
                className={`masonry-item ${index % 3 === 0 ? "tall" : ""}`}
              >
                <Fade direction="up" triggerOnce delay={100 * index}>
                  <div className="story-card-enhanced h-100">
                    <div className="card-image-container position-relative overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="story-image w-100 h-100"
                      />
                      <div className="image-gradient"></div>
                      <div className="story-category-badge position-absolute top-0 start-0 m-3">
                        <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold">
                          {story.category}
                        </span>
                      </div>
                      <div className="quick-actions position-absolute top-0 end-0 m-3">
                        <button className="btn btn-light btn-sm rounded-circle me-2 p-2 quick-action-btn">
                          <i className="fas fa-heart"></i>
                        </button>
                        <button className="btn btn-light btn-sm rounded-circle p-2 quick-action-btn">
                          <i className="fas fa-bookmark"></i>
                        </button>
                      </div>
                      <div className="story-stats position-absolute bottom-0 start-0 end-0 p-4">
                        <div className="d-flex justify-content-between align-items-center text-white">
                          <div className="d-flex gap-3">
                            <div className="stat-item d-flex align-items-center">
                              <i className="fas fa-heart me-1"></i>
                              <span>{story.likes}</span>
                            </div>
                            <div className="stat-item d-flex align-items-center">
                              <i className="fas fa-comment me-1"></i>
                              <span>{story.comments}</span>
                            </div>
                          </div>
                          <div className="read-time">
                            <span className="badge bg-dark bg-opacity-75">
                              {story.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-content p-4">
                      <h5 className="story-title fw-bold mb-3 lh-sm">
                        {story.title}
                      </h5>
                      <p className="story-excerpt text-muted mb-3 small">
                        {story.excerpt}
                      </p>

                      <div className="author-section d-flex align-items-center mb-3">
                        <img
                          src={story.avatar}
                          alt={story.author}
                          className="author-avatar rounded-circle me-3"
                        />
                        <div className="author-details flex-grow-1">
                          <div className="author-name fw-semibold small">
                            {story.author}
                          </div>
                          <div
                            className="story-date text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {story.date}
                          </div>
                        </div>
                        <Button
                          className="btn btn-primary btn-sm rounded-pill px-3"
                          type="button"
                        >
                          Read
                        </Button>
                      </div>

                      <div className="story-tags">
                        {story.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="badge bg-light text-dark me-1 mb-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            #{tag}
                          </span>
                        ))}
                        {story.tags.length > 2 && (
                          <span
                            className="badge bg-secondary me-1 mb-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            +{story.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="bg-light py-5">
        <div className="container">
          <Fade direction="up" triggerOnce>
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h3 className="fw-bold mb-3">Share Your Story</h3>
                <p className="text-gray-600 mb-4">
                  Have an amazing staycation experience? We'd love to hear about
                  it and share it with our community.
                </p>
                <Button className="btn btn-primary me-3" type="button">
                  Submit Your Story
                </Button>
                <Button className="btn btn-outline-primary" type="button">
                  Subscribe to Stories
                </Button>
              </div>
            </div>
          </Fade>
        </div>
      </section>{" "}
      <Footer />
      <style jsx>{`
        /* Enhanced Hero Section */
        .stories-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          position: relative;
        }

        .hero-background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("/images/img-featured-1.jpg") center/cover;
          opacity: 0.1;
          z-index: 1;
        }

        .min-vh-75 {
          min-height: 75vh;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
        }

        .hero-badge {
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .floating-cards {
          position: relative;
          height: 500px;
        }

        .floating-card {
          position: absolute;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: floatCard 6s ease-in-out infinite;
        }

        .floating-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-1 {
          width: 200px;
          height: 280px;
          top: 20px;
          left: 50px;
          animation-delay: 0s;
        }

        .card-2 {
          width: 180px;
          height: 240px;
          top: 150px;
          right: 80px;
          animation-delay: 2s;
        }

        .card-3 {
          width: 160px;
          height: 200px;
          bottom: 80px;
          left: 20px;
          animation-delay: 4s;
        }

        @keyframes floatCard {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(2deg);
          }
          66% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        .hero-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 1;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: shapeFloat 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 20%;
          animation-delay: 3s;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 30%;
          animation-delay: 6s;
        }

        @keyframes shapeFloat {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }

        /* Featured Story Enhanced */
        .featured-story-card {
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          background: white;
          transition: transform 0.3s ease;
        }

        .featured-story-card:hover {
          transform: translateY(-10px);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), transparent);
        }

        .engagement-item {
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        } /* Trending Stories Carousel */
        .trending-carousel-wrapper {
          padding: 30px 0;
        }

        .trending-swiper {
          width: 100%;
          padding: 20px 0 50px 0;
        }

        .trending-slide {
          height: auto;
        }

        .trending-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          height: 100%;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .trending-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }

        .card-image {
          height: 250px;
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 60%,
            rgba(0, 0, 0, 0.8)
          );
        }

        /* Stories Grid Masonry */
        .stories-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          grid-gap: 30px;
          grid-auto-rows: 300px;
        }

        .masonry-item {
          transition: transform 0.3s ease;
        }

        .masonry-item:hover {
          transform: translateY(-10px);
        }

        .masonry-item.tall {
          grid-row-end: span 2;
        }

        .story-card-enhanced {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .story-card-enhanced:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-image-container {
          height: 60%;
          position: relative;
        }

        .story-image {
          transition: transform 0.3s ease;
        }

        .story-card-enhanced:hover .story-image {
          transform: scale(1.05);
        }

        .image-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 0, 0.7)
          );
        }

        .quick-action-btn {
          opacity: 0;
          transition: all 0.3s ease;
          transform: translateY(-10px);
        }

        .story-card-enhanced:hover .quick-action-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .author-avatar {
          width: 35px;
          height: 35px;
          object-fit: cover;
        }

        /* Newsletter Section Enhanced */
        .newsletter-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .newsletter-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }        /* Responsive Design */
        @media (max-width: 767.98px) {
          .hero-title {
            font-size: 2rem;
          }

          .floating-cards {
            height: 250px;
            display: none; /* Hide floating cards on very small screens */
          }

          .card-1,
          .card-2,
          .card-3 {
            width: 100px;
            height: 140px;
          }

          .stories-masonry {
            grid-template-columns: 1fr;
            grid-auto-rows: 350px;
            gap: 1rem;
          }

          .trending-slide {
            width: 280px;
            height: 400px;
          }

          .hero-stats .col-4 {
            margin-bottom: 1rem;
          }

          .hero-actions {
            flex-direction: column;
            gap: 0.5rem;
          }

          .hero-actions .btn {
            width: 100%;
            margin: 0;
          }

          .featured-story-card .row {
            flex-direction: column-reverse;
          }

          .featured-story-card .col-lg-7,
          .featured-story-card .col-lg-5 {
            flex: none;
            width: 100%;
          }

          .story-content {
            padding: 1.5rem !important;
          }

          .story-image-wrapper {
            min-height: 250px !important;
          }

          .trending-swiper {
            padding: 15px 0 40px 0;
          }

          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .min-vh-75 {
            min-height: 60vh;
          }

          .display-3 {
            font-size: 2.5rem;
          }

          .display-5 {
            font-size: 1.75rem;
          }
        }

        @media (min-width: 768px) and (max-width: 991.98px) {
          .hero-title {
            font-size: 3rem;
          }

          .floating-cards {
            height: 350px;
          }

          .card-1,
          .card-2,
          .card-3 {
            width: 140px;
            height: 190px;
          }

          .stories-masonry {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 350px;
          }

          .trending-slide {
            width: 320px;
            height: 420px;
          }

          .story-content {
            padding: 2rem !important;
          }

          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        /* Swiper Custom Styles */
        .swiper-pagination-bullet {
          background: #007bff;
          opacity: 0.5;
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
          width: 44px;
          height: 44px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
        }

        /* Button Fixes for Hover States */
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

        .btn-outline-light {
          border: 2px solid rgba(255, 255, 255, 0.5);
          color: white;
          background: transparent;
          transition: all 0.3s ease;
        }

        .btn-outline-light:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: white;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
        }

        .btn-outline-light:focus,
        .btn-outline-light:active {
          background: rgba(255, 255, 255, 0.3) !important;
          border-color: white !important;
          color: white !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25) !important;
        }
      `}</style>
    </>
  );
}
