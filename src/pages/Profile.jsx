import React, { useState, useEffect } from "react";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { useAuth } from "context/AuthContext";
import Button from "elements/Button";
import { toast } from "react-toastify";
import { authAPI } from "services/api";
import { Fade } from "react-awesome-reveal";

export default function Profile() {
  const { user, fetchProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
      setImagePreview(user.avatar || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      let avatarUrl = formData.avatar;

      // Upload image if a new one was selected
      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", imageFile);

        const uploadResponse = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/uploads/image`,
          {
            method: "POST",
            body: uploadFormData,
            credentials: "include",
          },
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const uploadData = await uploadResponse.json();
        avatarUrl = uploadData.url;
      }

      // Update profile
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        avatar: avatarUrl,
      };

      await authAPI.updateProfile(updateData);
      await fetchProfile(); // Refresh user data

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setImageFile(null);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
      setImagePreview(user.avatar || "");
      setImageFile(null);
    }
    setErrors({});
    setIsEditing(false);
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="container my-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="profile-section py-5" style={{ minHeight: "70vh" }}>
        <div className="container">
          <Fade triggerOnce>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-primary text-white py-3">
                    <h3 className="mb-0">
                      <i className="fas fa-user-circle me-2"></i>
                      My Profile
                    </h3>
                  </div>
                  <div className="card-body p-4">
                    {/* Profile Image */}
                    <div className="text-center mb-4">
                      <div className="position-relative d-inline-block">
                        <img
                          src={
                            imagePreview && imagePreview.startsWith("data:")
                              ? imagePreview
                              : imagePreview && !imagePreview.startsWith("http")
                                ? `${process.env.REACT_APP_API_URL.replace("/api", "")}${imagePreview}`
                                : imagePreview || "https://placehold.co/150"
                          }
                          alt="Profile"
                          className="rounded-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        {isEditing && (
                          <label
                            htmlFor="avatarInput"
                            className="position-absolute bottom-0 end-0 btn btn-sm btn-primary rounded-circle"
                            style={{
                              width: "40px",
                              height: "40px",
                              padding: "0",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fas fa-camera"></i>
                            <input
                              type="file"
                              id="avatarInput"
                              className="d-none"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>
                      {imageFile && (
                        <div className="mt-2">
                          <small className="text-success">
                            <i className="fas fa-check-circle me-1"></i>
                            New image selected
                          </small>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label
                            htmlFor="firstName"
                            className="form-label fw-semibold"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                          {errors.firstName && (
                            <div className="invalid-feedback">
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="lastName"
                            className="form-label fw-semibold"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                          {errors.lastName && (
                            <div className="invalid-feedback">
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          disabled
                          title="Email cannot be changed"
                        />
                        <small className="text-muted">
                          <i className="fas fa-info-circle me-1"></i>
                          Email cannot be changed
                        </small>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="phone"
                          className="form-label fw-semibold"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="+62 812 3456 7890"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Account Role
                        </label>
                        <div>
                          <span
                            className={`badge bg-${user.role === "admin" ? "danger" : "primary"} fs-6`}
                          >
                            {user.role?.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex gap-2 justify-content-end">
                        {!isEditing ? (
                          <button
                            type="button"
                            className="btn btn-primary px-4"
                            onClick={() => setIsEditing(true)}
                          >
                            <i className="fas fa-edit me-2"></i>
                            Edit Profile
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-secondary px-4"
                              onClick={handleCancel}
                              disabled={isLoading}
                            >
                              <i className="fas fa-times me-2"></i>
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success px-4"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2"></span>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-save me-2"></i>
                                  Save Changes
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>
      <Footer />
    </>
  );
}
