import { useState, useEffect, useCallback } from "react";
import {
  categoriesAPI,
  propertiesAPI,
  reviewsAPI,
  agentsAPI,
  storiesAPI,
  authAPI,
} from "../services/api";

// Hook untuk categories
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesAPI.getAll(params);
      setCategories(data.categories || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeaturedCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesAPI.getFeatured();
      setCategories(data.categories || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchFeaturedCategories,
    refetch: fetchCategories,
  };
};

// Hook untuk properties
export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchProperties = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertiesAPI.getAll(params);
      setProperties(data.properties || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMostPicked = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertiesAPI.getMostPicked();
      setProperties(data.properties || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProperties = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertiesAPI.search(searchParams);
      setProperties(data.properties || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    loading,
    error,
    pagination,
    fetchProperties,
    fetchMostPicked,
    searchProperties,
    refetch: fetchProperties,
  };
};

// Hook untuk single property
export const useProperty = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProperty = useCallback(async (id = propertyId) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await propertiesAPI.getById(id);
      setProperty(data.property || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      fetchProperty(propertyId);
    }
  }, [propertyId, fetchProperty]);

  return {
    property,
    loading,
    error,
    fetchProperty,
    refetch: () => fetchProperty(propertyId),
  };
};

// Hook untuk reviews
export const useReviews = (propertyId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchReviews = useCallback(async (params = {}) => {
    if (!propertyId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await reviewsAPI.getByProperty(propertyId, params);
      setReviews(data.reviews || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId, fetchReviews]);

  return {
    reviews,
    loading,
    error,
    pagination,
    fetchReviews,
    refetch: fetchReviews,
  };
};

// Hook untuk agents
export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchAgents = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentsAPI.getAll(params);
      setAgents(data.agents || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchAgents = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentsAPI.search(searchParams);
      setAgents(data.agents || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    agents,
    loading,
    error,
    pagination,
    fetchAgents,
    searchAgents,
    refetch: fetchAgents,
  };
};

// Hook untuk stories
export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchStories = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await storiesAPI.getAll(params);
      setStories(data.stories || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0,
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await storiesAPI.getFeatured();
      setStories(data.stories || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    stories,
    loading,
    error,
    pagination,
    fetchStories,
    fetchFeaturedStories,
    refetch: fetchStories,
  };
};

// Hook untuk authentication
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.login(credentials);
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.register(userData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.getProfile();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      setError(err.message);
      // If unauthorized, clear local storage
      if (
        err.message.includes("unauthorized") ||
        err.message.includes("token")
      ) {
        logout();
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // Optionally validate token by fetching profile
        fetchProfile().catch(() => {
          // If profile fetch fails, logout
          logout();
        });
      } catch (err) {
        // If stored user data is invalid, logout
        logout();
      }
    }
  }, [fetchProfile]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    fetchProfile,
    isAuthenticated: !!user,
  };
};
