import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
import Breadcrumb from "elements/Breadcrumb";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import { storiesAPI, IMAGE_BASE_URL } from "services/api";

export default function StoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const data = await storiesAPI.getById(id);
        setStory(data);
        document.title = `${data.title} | Staycation Stories`;
      } catch (err) {
        setError(err.message);
        console.error("Error fetching story:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStory();
    }
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("blob:")) return url;
    return `${IMAGE_BASE_URL}/${url.replace(/^\/+/, "")}`;
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="container py-5">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-3">Loading story...</p>
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
                <h4>Story Not Found</h4>
                <p>
                  The story you're looking for doesn't exist or has been
                  removed.
                </p>
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("/stories")}
                >
                  Browse Stories
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <div className="container py-3">
          <Breadcrumb
            data={[
              { pageTitle: "Home", pageHref: "/" },
              { pageTitle: "Stories", pageHref: "/stories" },
              { pageTitle: story.title, pageHref: "" },
            ]}
          />
        </div>

        <Fade direction="up" triggerOnce>
          <section className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                {/* Story Featured Image */}
                <div className="mb-4 text-center">
                  <img
                    src={getImageUrl(story.featuredImage?.url)}
                    alt={story.title}
                    className="img-fluid rounded-4 shadow-sm w-100"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>

                {/* Story Header */}
                <div className="mb-4">
                  <h1 className="h2 fw-bold mb-3">{story.title}</h1>
                  <div className="d-flex align-items-center text-muted mb-4 flex-wrap gap-3">
                    {story.author && (
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            getImageUrl(story.author.avatar) ||
                            "https://via.placeholder.com/150"
                          }
                          alt={story.author.name}
                          className="rounded-circle me-2"
                          width="40"
                          height="40"
                        />
                        <span>By {story.author.name || "Unknown Author"}</span>
                      </div>
                    )}
                    {story.createdAt && (
                      <div className="d-flex align-items-center">
                        <i className="fas fa-calendar me-2"></i>
                        {new Date(story.createdAt).toLocaleDateString()}
                      </div>
                    )}
                    {story.readTime && (
                      <div className="d-flex align-items-center">
                        <i className="fas fa-clock me-2"></i>
                        {story.readTime}
                      </div>
                    )}
                    <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                      {story.category}
                    </div>
                  </div>

                  {story.excerpt && (
                    <p className="lead text-dark fst-italic ps-4 border-start border-4 border-primary bg-light p-3 rounded-end">
                      {story.excerpt}
                    </p>
                  )}
                </div>

                {/* Story Content */}
                <div className="mb-5 story-content-container">
                  {story.content ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: story.content }}
                      className="story-content lh-lg"
                    />
                  ) : (
                    <p>Story content not available.</p>
                  )}
                </div>

                {/* Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="mb-5 border-top pt-4">
                    <h6 className="fw-bold mb-3">Tags:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {story.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-secondary border px-3 py-2 rounded-pill fw-normal"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to Stories */}
                <div className="text-center mt-5 mb-5">
                  <Button
                    className="btn btn-outline-primary custom-back-btn px-4 py-2"
                    type="button"
                    onClick={() => navigate("/stories")}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Stories
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Fade>

        {/* Custom Styles */}
        <style>{`
          .story-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          
          .story-content h2, .story-content h3 {
             margin-top: 1.5rem;
             margin-bottom: 1rem;
             font-weight: 700;
          }

          .story-content p {
             margin-bottom: 1.2rem;
             color: #4a4a4a;
          }

          .custom-back-btn {
            border: 2px solid #007bff;
            color: #007bff;
            background-color: transparent;
            font-weight: 600;
            border-radius: 50px;
            transition: all 0.3s ease;
          }
          
          .custom-back-btn:hover {
            background-color: #007bff;
            color: #ffffff !important;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
            transform: translateY(-2px);
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
