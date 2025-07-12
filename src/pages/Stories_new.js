import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getStories } from "services/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";

export default function Stories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await getStories({
          category: selectedCategory !== "all" ? selectedCategory : undefined,
        });
        const data = response.data || response;
        const storiesData = data.stories || data;

        // Transform stories data with safe object handling
        const transformedStories = (storiesData || []).map((story) => ({
          ...story,
          _id: story._id || story.id,
          title: story.title || "Untitled Story",
          excerpt: story.excerpt || "No excerpt available",
          featuredImage:
            story.featuredImage?.url || "/images/img-featured-1.jpg",
          author: story.author?.name || "Unknown Author",
          avatar: story.author?.avatar || "https://via.placeholder.com/150",
          date: story.formattedDate || "Unknown Date",
          readTime: story.readTimeDisplay || `${story.readTime || 5} min read`,
          tags: Array.isArray(story.tags) ? story.tags : [],
          category: story.category || "General",
          likes: story.engagement?.likes?.count || story.likeCount || 0,
          comments: story.commentCount || 0,
          location: story.location,
        }));

        setStories(transformedStories);
        setError(null);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("Failed to load stories. Please try again later.");
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [selectedCategory]);

  // Get unique categories from stories
  const categories = [
    "all",
    ...new Set(stories.map((story) => story.category).filter(Boolean)),
  ];

  const filteredStories = stories.filter(
    (story) => selectedCategory === "all" || story.category === selectedCategory
  );

  const featuredStories = stories.filter((story) => story.featured);

  const handleStoryClick = (storyId) => {
    navigate(`/stories/${storyId}`);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading stories...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mt-5 pt-5">
          <div className="text-center">
            <h2>Something went wrong</h2>
            <p className="text-muted">{error}</p>
            <Button type="link" href="/stories" className="btn btn-primary">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const otherStories = stories.filter((story) => !story.featured);

  return (
    <>
      <Header />
      {/* Enhanced Hero Section */}
      <section className="stories-hero position-relative overflow-hidden">
        <div className="hero-background"></div>
        <div className="container position-relative">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <Fade direction="up" delay={200}>
                <h1 className="display-4 fw-bold text-white mb-4">
                  Travel Stories
                  <span className="d-block text-primary">& Experiences</span>
                </h1>
                <p className="lead text-white-50 mb-4">
                  Discover inspiring travel stories from our community of
                  travelers. Get insights, tips, and inspiration for your next
                  adventure.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() =>
                      document
                        .getElementById("featured-stories")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore Stories
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-outline-light btn-lg"
                    onClick={() => navigate("/write-story")}
                  >
                    Share Your Story
                  </Button>
                </div>
              </Fade>
            </div>
            <div className="col-lg-6">
              <Fade direction="right" delay={400}>
                <div className="hero-image-container">
                  <img
                    src="/images/img-featured-1.jpg"
                    alt="Travel Stories"
                    className="img-fluid rounded-4 shadow-lg"
                  />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      {featuredStories.length > 0 && (
        <section id="featured-stories" className="py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <Fade direction="up">
                <h2 className="display-5 fw-bold">Featured Stories</h2>
                <p className="lead text-muted">
                  Handpicked stories that inspire wanderlust
                </p>
              </Fade>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={{ clickable: true }}
              className="featured-stories-swiper"
            >
              {featuredStories.map((story, index) => (
                <SwiperSlide key={story._id} className="swiper-slide-custom">
                  <Zoom delay={index * 100}>
                    <div className="story-card featured-story h-100">
                      <div className="position-relative overflow-hidden rounded-4">
                        <img
                          src={story.featuredImage}
                          alt={story.title}
                          className="card-img-top"
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                        <div className="position-absolute top-0 start-0 m-3">
                          <span className="badge bg-primary">
                            {story.category}
                          </span>
                        </div>
                        <div className="position-absolute bottom-0 start-0 end-0 p-4 bg-gradient-overlay">
                          <h3 className="text-white mb-2">{story.title}</h3>
                          <p className="text-white-75 mb-3">{story.excerpt}</p>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <img
                                src={story.avatar}
                                alt={story.author}
                                className="rounded-circle me-2"
                                width="32"
                                height="32"
                              />
                              <small className="text-white">
                                {story.author}
                              </small>
                            </div>
                            <Button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() => handleStoryClick(story._id)}
                            >
                              Read More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h4 className="mb-0">Browse by Category</h4>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    className={`btn btn-sm ${
                      selectedCategory === category
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Stories" : category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-5">
        <div className="container">
          {filteredStories.length === 0 ? (
            <div className="text-center py-5">
              <h3>No stories found</h3>
              <p className="text-muted">
                Try selecting a different category or check back later.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredStories.map((story, index) => (
                <div key={story._id} className="col-lg-4 col-md-6">
                  <Fade direction="up" delay={index * 100}>
                    <div className="story-card h-100 bg-white rounded-4 shadow-sm border-0 overflow-hidden">
                      <div className="position-relative">
                        <img
                          src={story.featuredImage}
                          alt={story.title}
                          className="card-img-top"
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <div className="position-absolute top-0 start-0 m-3">
                          <span className="badge bg-primary">
                            {story.category}
                          </span>
                        </div>
                      </div>
                      <div className="card-body p-4">
                        <h5 className="card-title fw-bold mb-3">
                          {story.title}
                        </h5>
                        <p className="card-text text-muted mb-3">
                          {story.excerpt}
                        </p>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {story.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="badge bg-light text-dark"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <img
                              src={story.avatar}
                              alt={story.author}
                              className="rounded-circle me-2"
                              width="40"
                              height="40"
                            />
                            <div>
                              <small className="fw-medium d-block">
                                {story.author}
                              </small>
                              <small className="text-muted">{story.date}</small>
                            </div>
                          </div>
                          <small className="text-muted">{story.readTime}</small>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <small className="text-muted">
                              <i className="fas fa-heart me-1"></i>
                              {story.likes}
                            </small>
                            <small className="text-muted">
                              <i className="fas fa-comment me-1"></i>
                              {story.comments}
                            </small>
                          </div>
                          <Button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleStoryClick(story._id)}
                          >
                            Read Story
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Fade>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .stories-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 70vh;
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
          z-index: -1;
        }

        .min-vh-75 {
          min-height: 75vh;
        }

        .hero-image-container {
          position: relative;
        }

        .hero-image-container::before {
          content: "";
          position: absolute;
          top: -20px;
          left: -20px;
          right: 20px;
          bottom: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          z-index: -1;
        }

        .story-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .story-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }

        .featured-story {
          max-width: 400px;
          margin: 0 auto;
        }

        .bg-gradient-overlay {
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        }

        .text-white-75 {
          color: rgba(255, 255, 255, 0.75);
        }

        .swiper-slide-custom {
          width: 400px;
          height: auto;
        }

        .featured-stories-swiper {
          padding: 50px 0;
        }

        .featured-stories-swiper .swiper-slide {
          transition: transform 0.3s ease;
        }

        .featured-stories-swiper .swiper-slide-active {
          transform: scale(1.05);
        }

        .btn-primary {
          background: linear-gradient(45deg, #007bff, #0056b3);
          border: none;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: linear-gradient(45deg, #0056b3, #004085);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
        }

        .btn-outline-primary {
          border: 2px solid #007bff;
          color: #007bff;
          background: transparent;
          transition: all 0.3s ease;
        }

        .btn-outline-primary:hover {
          background: #007bff;
          border-color: #007bff;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
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

        @media (max-width: 768px) {
          .hero-image-container {
            margin-top: 2rem;
          }

          .display-4 {
            font-size: 2.5rem;
          }

          .swiper-slide-custom {
            width: 300px;
          }
        }
      `}</style>
    </>
  );
}
