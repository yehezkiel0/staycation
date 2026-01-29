import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "configs/axios";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import ImageUploader from "components/Admin/ImageUploader";
import { PROPERTY_TYPES, COMMON_AMENITIES, PRICE_UNITS } from "constants/admin";
import "assets/scss/admin.scss";

export default function PropertyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    unit: "night",
    type: "apartment",
    category: "",
    city: "",
    state: "",
    country: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    features: [],
    imageUrls: [],
  });

  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProperty();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`/properties/${id}`);
      const property = res.data.property || res.data;
      // Map backend nested structure to flat form structure
      setFormData({
        title: property.title || "",
        description: property.description || "",
        price: property.price?.amount || property.price || "",
        unit: property.price?.per || "night",
        type: property.type || "apartment",
        category: property.category?._id || property.category || "",
        city: property.location?.city || "",
        state: property.location?.state || "",
        country: property.location?.country || "",
        address: property.location?.address || "",
        bedrooms: property.specifications?.bedrooms || 1,
        bathrooms: property.specifications?.bathrooms || 1,
        maxGuests: property.specifications?.maxGuests || 1,
        features: property.amenities?.map((a) => a.name) || [],
        imageUrls: property.images || [],
      });
    } catch (err) {
      toast.error("Failed to fetch property details");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({ ...prev, imageUrls: newImages }));
  };

  const addFeature = (featureName = null) => {
    const feature = featureName || featureInput.trim();
    if (feature && !formData.features.includes(feature)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const toggleFeature = (featureName) => {
    if (formData.features.includes(featureName)) {
      removeFeature(formData.features.indexOf(featureName));
    } else {
      addFeature(featureName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Transform flat form data to backend's nested structure
      const apiData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        status: "active", // Set to active so it appears in list
        price: {
          amount: parseFloat(formData.price),
          currency: "IDR",
          per: formData.unit,
        },
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state || formData.city, // Use city as state if not provided
          country: formData.country || "Indonesia",
        },
        specifications: {
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          maxGuests: parseInt(formData.maxGuests),
        },
        amenities: formData.features.map((name) => ({ name })),
        images: formData.imageUrls.map((img, index) => ({
          url: typeof img === "string" ? img : img.url,
          isMain: index === 0,
        })),
      };

      if (isEdit) {
        await axios.put(`/properties/${id}`, apiData);
        toast.success("Property updated successfully!");
      } else {
        await axios.post("/properties", apiData);
        toast.success("Property created successfully!");
      }

      navigate("/admin/properties");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to save property";
      const validationErrors = err.response?.data?.errors;
      if (validationErrors && validationErrors.length > 0) {
        validationErrors.forEach((e) => toast.error(e.msg));
      } else {
        toast.error(errorMsg);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Fade triggerOnce>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h2 mb-1 text-gray-900 fw-bold">
              {isEdit ? "Edit Property" : "Add New Property"}
            </h1>
            <p className="text-muted mb-0">
              {isEdit
                ? "Update property details"
                : "Create a new property listing"}
            </p>
          </div>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin/properties")}
          >
            <i className="fas fa-arrow-left me-2"></i> Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column - Basic Info */}
            <div className="col-lg-8">
              {/* Basic Information Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-info-circle text-primary me-2"></i>
                    Basic Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">
                        Property Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Luxury Villa in Bali"
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your property..."
                        required
                        rows="4"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Property Type
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {PROPERTY_TYPES.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            className={`btn type-btn ${formData.type === type.value ? "selected btn-primary" : "btn-outline-secondary"}`}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                type: type.value,
                              }))
                            }
                          >
                            <i className={`fas ${type.icon} me-2`}></i>
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select form-select-lg"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-map-marker-alt text-danger me-2"></i>
                    Location
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Full street address"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g., Denpasar"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        State/Province <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g., Bali"
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="e.g., Indonesia (default)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-concierge-bell text-success me-2"></i>
                    Amenities & Features
                  </h5>
                </div>
                <div className="card-body">
                  {/* Quick Add Amenities */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Quick Add</label>
                    <div className="d-flex flex-wrap gap-2">
                      {COMMON_AMENITIES.map((amenity) => (
                        <button
                          key={amenity.name}
                          type="button"
                          className={`btn btn-sm amenity-btn ${formData.features.includes(amenity.name) ? "selected btn-success" : "btn-outline-secondary"}`}
                          onClick={() => toggleFeature(amenity.name)}
                        >
                          <i className={`fas ${amenity.icon} me-1`}></i>
                          {amenity.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Feature Input */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Add Custom Feature
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Private Chef"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                      />
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => addFeature()}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Selected Features */}
                  {formData.features.length > 0 && (
                    <div>
                      <label className="form-label fw-semibold">
                        Selected Features
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {formData.features.map((feature, index) => (
                          <span key={index} className="feature-tag">
                            <i className="fas fa-check"></i>
                            {feature}
                            <button
                              type="button"
                              className="btn-close ms-1"
                              onClick={() => removeFeature(index)}
                            ></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Images Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-images text-info me-2"></i>
                    Property Images
                  </h5>
                </div>
                <div className="card-body">
                  <ImageUploader
                    images={formData.imageUrls}
                    onImagesChange={handleImagesChange}
                    maxImages={10}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Specs */}
            <div className="col-lg-4">
              {/* Pricing Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-tag text-warning me-2"></i>
                    Pricing
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Price <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-success text-white fw-bold">
                        Rp
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="1000000"
                        required
                        min="0"
                        step="1000000"
                      />
                    </div>
                  </div>
                  <div className="mb-0">
                    <label className="form-label fw-semibold">Per</label>
                    <div className="d-flex gap-2">
                      {PRICE_UNITS.map((unit) => (
                        <button
                          key={unit.value}
                          type="button"
                          className={`btn flex-fill ${formData.unit === unit.value ? "btn-primary" : "btn-outline-secondary"}`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              unit: unit.value,
                            }))
                          }
                        >
                          {unit.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Specs Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-bed text-secondary me-2"></i>
                    Property Specs
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-bed me-2 text-muted"></i>Bedrooms
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-bath me-2 text-muted"></i>Bathrooms
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  <div className="mb-0">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-users me-2 text-muted"></i>Max Guests
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="maxGuests"
                      value={formData.maxGuests}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Card */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        {isEdit ? "Update Property" : "Create Property"}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => navigate("/admin/properties")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Fade>
    </div>
  );
}
