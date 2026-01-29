import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { toast } from "react-toastify";
import Button from "elements/Button";
import ImageUploader from "components/Admin/ImageUploader";
import { storiesAPI } from "services/api";

export default function WriteStory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    image: null,
    images: [], // For ImageUploader compatibility
  });

  const categories = [
    "Romance",
    "Family",
    "Solo",
    "Business",
    "Adventure",
    "Luxury",
    "Budget",
    "Wellness",
    "Culinary",
    "Cultural",
    "Nature",
    "Urban",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
      image: newImages.length > 0 ? newImages[0].url : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload a featured image");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        image: formData.image,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        published: true, // Auto-publish for now, or could vary based on logic
      };

      await storiesAPI.create(payload);
      toast.success("Story created successfully!");
      navigate("/stories");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold mb-4">Share Your Story</h2>

                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Story Title
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Give your story a catchy title"
                      required
                    />
                  </div>

                  {/* Featured Image */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Featured Image
                    </label>
                    <div className="bg-light rounded-3 p-3">
                      <ImageUploader
                        images={formData.images}
                        onImagesChange={handleImageChange}
                        maxImages={1}
                        acceptedTypes="image/*"
                      />
                    </div>
                    <small className="text-muted">
                      Upload a high-quality image that represents your story.
                    </small>
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Excerpt */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Short Excerpt
                    </label>
                    <textarea
                      className="form-control"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      rows="3"
                      placeholder="A brief summary of your story (appears in cards)"
                      maxLength={300}
                      required
                    />
                    <div className="form-text text-end">
                      {formData.excerpt.length}/300 characters
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Story Content
                    </label>
                    <textarea
                      className="form-control"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows="12"
                      placeholder="Share your experience, tips, and memorable moments..."
                      required
                    />
                  </div>

                  {/* Tags */}
                  <div className="mb-5">
                    <label className="form-label fw-semibold">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="e.g. Bali, Beach, Family, Summer (comma separated)"
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill shadow-sm"
                      isPrimary
                      isLoading={loading}
                    >
                      Publish Story
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
