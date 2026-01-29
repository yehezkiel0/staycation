import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
// import { storiesAPI } from "services/api";

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
        // For now, just set mock data to avoid API call issues
        const mockStory = {
          id: id,
          title: "Sample Story",
          author: { firstName: "John", lastName: "Doe" },
          publishedAt: new Date(),
          readTime: "5 min",
          excerpt: "This is a sample story excerpt.",
          content: "<p>This is the story content.</p>",
          tags: ["travel", "adventure"],
        };
        setStory(mockStory);
        document.title = `${mockStory.title} | Staycation Stories`;
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
        <Fade triggerOnce>
          <section className="container py-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/stories">Stories</a>
                </li>
                <li className="breadcrumb-item active">{story?.title}</li>
              </ol>
            </nav>
          </section>
        </Fade>

        <Fade direction="up" triggerOnce>
          <section className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                {/* Story Header */}
                <div className="mb-4">
                  <h1 className="h2 mb-3">{story.title}</h1>
                  <div className="text-muted mb-3">
                    {story.author && (
                      <span className="me-3">
                        <i className="fas fa-user me-1"></i>
                        By {story.author.firstName} {story.author.lastName}
                      </span>
                    )}
                    {story.publishedAt && (
                      <span className="me-3">
                        <i className="fas fa-calendar me-1"></i>
                        {new Date(story.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                    {story.readTime && (
                      <span>
                        <i className="fas fa-clock me-1"></i>
                        {story.readTime} read
                      </span>
                    )}
                  </div>
                  {story.excerpt && (
                    <p className="lead text-muted">{story.excerpt}</p>
                  )}
                </div>

                {/* Story Content */}
                <div className="mb-5">
                  {story.content ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: story.content }}
                      className="story-content"
                    />
                  ) : (
                    <p>Story content not available.</p>
                  )}
                </div>

                {/* Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="mb-4">
                    <h6>Tags:</h6>
                    <div>
                      {story.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark me-2 mb-2"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to Stories */}
                <div className="text-center mt-5">
                  <Button
                    className="btn btn-outline-primary custom-back-btn"
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

        {/* Custom Button Styles */}
        <style>{`
          .custom-back-btn {
            border: 2px solid #007bff;
            color: #007bff;
            background-color: transparent;
            padding: 12px 24px;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          
          .custom-back-btn:hover {
            background-color: #007bff;
            color: #ffffff !important;
            border-color: #007bff;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
          }
          
          .custom-back-btn:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
          }
          
          .custom-back-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0, 123, 255, 0.3);
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
