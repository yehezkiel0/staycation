// API Base Configuration
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// API Helper function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  getProfile: () => apiRequest("/users/profile"),

  updateProfile: (profileData) =>
    apiRequest("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

// Categories API
export const categoriesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/categories${queryString ? `?${queryString}` : ""}`);
  },

  getById: (id) => apiRequest(`/categories/${id}`),

  getFeatured: () => apiRequest("/categories/featured"),
};

// Properties API
export const propertiesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/properties${queryString ? `?${queryString}` : ""}`);
  },

  getById: (id) => apiRequest(`/properties/${id}`),

  getMostPicked: () => apiRequest("/properties/most-picked"),

  search: (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    return apiRequest(`/properties/search?${queryString}`);
  },

  checkAvailability: (propertyId, dates) =>
    apiRequest(`/properties/${propertyId}/availability`, {
      method: "POST",
      body: JSON.stringify(dates),
    }),

  addToFavorites: (propertyId) =>
    apiRequest(`/users/favorites/${propertyId}`, {
      method: "POST",
    }),

  removeFromFavorites: (propertyId) =>
    apiRequest(`/users/favorites/${propertyId}`, {
      method: "DELETE",
    }),
};

// Bookings API
export const bookingsAPI = {
  create: (bookingData) =>
    apiRequest("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    }),

  getMyBookings: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/users/bookings${queryString ? `?${queryString}` : ""}`);
  },

  getById: (id) => apiRequest(`/bookings/${id}`),

  updateStatus: (id, status) =>
    apiRequest(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  cancel: (id, reason) =>
    apiRequest(`/bookings/${id}/cancel`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    }),
};

// Reviews API
export const reviewsAPI = {
  getByProperty: (propertyId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(
      `/properties/${propertyId}/reviews${queryString ? `?${queryString}` : ""}`
    );
  },

  create: (reviewData) =>
    apiRequest("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    }),

  update: (id, reviewData) =>
    apiRequest(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(reviewData),
    }),

  delete: (id) =>
    apiRequest(`/reviews/${id}`, {
      method: "DELETE",
    }),

  markHelpful: (id) =>
    apiRequest(`/reviews/${id}/helpful`, {
      method: "POST",
    }),
};

// Agents API
export const agentsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/agents${queryString ? `?${queryString}` : ""}`);
  },

  getById: (id) => apiRequest(`/agents/${id}`),

  search: (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    return apiRequest(`/agents/search?${queryString}`);
  },

  contact: (agentId, messageData) =>
    apiRequest(`/agents/${agentId}/contact`, {
      method: "POST",
      body: JSON.stringify(messageData),
    }),
};

// Stories API
export const storiesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/stories${queryString ? `?${queryString}` : ""}`);
  },

  getById: (id) => apiRequest(`/stories/${id}`),

  getFeatured: () => apiRequest("/stories/featured"),

  getTrending: () => apiRequest("/stories/trending"),

  like: (id) =>
    apiRequest(`/stories/${id}/like`, {
      method: "POST",
    }),

  addComment: (id, commentData) =>
    apiRequest(`/stories/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
    }),
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (bookingData) =>
    apiRequest("/payments/create-payment-intent", {
      method: "POST",
      body: JSON.stringify(bookingData),
    }),

  confirmPayment: (paymentData) =>
    apiRequest("/payments/confirm-payment", {
      method: "POST",
      body: JSON.stringify(paymentData),
    }),
};

// Uploads API
export const uploadsAPI = {
  uploadImage: (file, type = "general") => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    return apiRequest("/uploads/image", {
      method: "POST",
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  },

  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return apiRequest("/uploads/avatar", {
      method: "POST",
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  },
};

// Simplified API methods for easier use
export const getCategories = () => categoriesAPI.getAll();
export const getProperties = (params) => propertiesAPI.getAll(params);
export const getMostPickedProperties = () => propertiesAPI.getMostPicked();
export const getProperty = (id) => propertiesAPI.getById(id);
export const searchProperties = (params) => propertiesAPI.search(params);
export const getAgents = (params) => agentsAPI.getAll(params);
export const getAgent = (id) => agentsAPI.getById(id);
export const getStories = (params) => storiesAPI.getAll(params);
export const getStory = (id) => storiesAPI.getById(id);

// Main API object
const api = {
  // Simple methods
  getCategories,
  getProperties,
  getMostPickedProperties,
  getProperty,
  searchProperties,
  getAgents,
  getAgent,
  getStories,
  getStory,

  // Organized APIs
  auth: authAPI,
  categories: categoriesAPI,
  properties: propertiesAPI,
  bookings: bookingsAPI,
  reviews: reviewsAPI,
  agents: agentsAPI,
  stories: storiesAPI,
  payments: paymentsAPI,
  uploads: uploadsAPI,
};

export default api;
