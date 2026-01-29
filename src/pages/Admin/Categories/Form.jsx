import React, { useState, useEffect } from "react";
import axios from "configs/axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";

export default function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    visible: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/categories/${id}`);
        const category = res.data.category || res.data;
        setFormData({
          name: category.name || "",
          description: category.description || "",
          icon: category.icon || "",
          visible: category.visible !== undefined ? category.visible : true,
        });
      } catch (err) {
        setError("Failed to fetch category data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isEdit) {
      fetchCategory();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEdit) {
        await axios.put(`/categories/${id}`, formData);
      } else {
        await axios.post("/categories", formData);
      }
      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to save category. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Fade triggerOnce>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">
            {isEdit ? "Edit Category" : "Add Category"}
          </h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="icon" className="form-label">
                  Icon (Emoji or Text)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="e.g. 🏠 or fa-home"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Only show visibility toggle if editing or advanced */}
              {/* <div className="mb-3 form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="visible" 
                  name="visible"
                  checked={formData.visible}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="visible">Visible</label>
              </div> */}

              <div className="d-flex justify-content-end gap-2">
                <Link to="/admin/categories" className="btn btn-secondary">
                  Cancel
                </Link>
                <Button
                  className="btn btn-primary"
                  type="submit"
                  isLoading={loading}
                >
                  Save Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </div>
  );
}
