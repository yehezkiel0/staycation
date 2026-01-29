import React, { useState } from "react";
import PropTypes from "prop-types";
import { uploadsAPI } from "services/api";
import { toast } from "react-toastify";

/**
 * ImageUploader Component
 * Handles image file uploads with preview
 */
export default function ImageUploader({
  images = [],
  onImagesChange,
  maxImages = 10,
  acceptedTypes = "image/*",
}) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState(
    images.map((img) =>
      typeof img === "string"
        ? img
        : `${process.env.REACT_APP_API_URL?.replace("/api", "") || ""}/${img.url}`,
    ),
  );

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.warning(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    const newPreviews = [...previews];
    const newImages = [...images];

    for (const file of files) {
      try {
        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
          newPreviews.push(event.target.result);
          setPreviews([...newPreviews]);
        };
        reader.readAsDataURL(file);

        // Upload file
        const result = await uploadsAPI.uploadImage(file, "property");
        if (result.url) {
          newImages.push({ url: result.url, _id: result._id || Date.now() });
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error(error);
      }
    }

    onImagesChange(newImages);
    setUploading(false);
    toast.success(`${files.length} image(s) uploaded`);
  };

  const handleRemove = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newImages = images.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onImagesChange(newImages);
  };

  return (
    <div className="image-uploader">
      {/* Upload Area */}
      <div className="mb-3">
        <div className="upload-area">
          <input
            type="file"
            id="imageUpload"
            className="d-none"
            accept={acceptedTypes}
            multiple
            onChange={handleUpload}
            disabled={uploading || images.length >= maxImages}
          />
          <label
            htmlFor="imageUpload"
            className="mb-0 w-100"
            style={{ cursor: uploading ? "wait" : "pointer" }}
          >
            {uploading ? (
              <div className="py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Uploading...</span>
                </div>
                <p className="mb-0 mt-2 text-muted">Uploading images...</p>
              </div>
            ) : (
              <div className="py-3">
                <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-2"></i>
                <p className="mb-0 text-muted">
                  Click to upload or drag and drop
                </p>
                <small className="text-muted">
                  PNG, JPG up to 10MB each (max {maxImages} images)
                </small>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="row g-2">
          {previews.map((preview, index) => (
            <div key={index} className="col-md-3 col-6">
              <div className="position-relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="img-fluid rounded border"
                  style={{
                    height: "100px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/150x100?text=Error";
                  }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                  style={{ padding: "2px 6px" }}
                  onClick={() => handleRemove(index)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ImageUploader.propTypes = {
  images: PropTypes.array,
  onImagesChange: PropTypes.func.isRequired,
  maxImages: PropTypes.number,
  acceptedTypes: PropTypes.string,
};
