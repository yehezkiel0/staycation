// Auth Service - Business logic for authentication
import { authAPI } from "./api";

class AuthService {
  /**
   * Login user with credentials
   * @param {Object} credentials - {email, password}
   * @returns {Promise<Object>} User data
   */
  async login(credentials) {
    try {
      const response = await authAPI.login(credentials);
      return {
        success: true,
        user: response.user,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Login failed",
      };
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration result
   */
  async register(userData) {
    try {
      // Validate data before sending
      const validationError = this.validateRegistrationData(userData);
      if (validationError) {
        return {
          success: false,
          error: validationError,
        };
      }

      const response = await authAPI.register(userData);
      return {
        success: true,
        user: response.user,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Registration failed",
      };
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    try {
      const response = await authAPI.getProfile();
      return {
        success: true,
        user: response.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to fetch profile",
      };
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - Profile update data
   * @returns {Promise<Object>} Update result
   */
  async updateProfile(profileData) {
    try {
      const response = await authAPI.updateProfile(profileData);
      return {
        success: true,
        user: response.user,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Profile update failed",
      };
    }
  }

  /**
   * Logout user
   * @returns {Promise<Object>} Logout result
   */
  async logout() {
    try {
      await authAPI.logout();
      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error) {
      // Even if API fails, consider it a success for frontend
      return {
        success: true,
        message: "Logged out",
      };
    }
  }

  /**
   * Validate registration data
   * @param {Object} data - Registration form data
   * @returns {string|null} Error message or null if valid
   */
  validateRegistrationData(data) {
    if (!data.firstName || data.firstName.trim().length < 2) {
      return "First name must be at least 2 characters";
    }
    if (!data.lastName || data.lastName.trim().length < 2) {
      return "Last name must be at least 2 characters";
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return "Please enter a valid email address";
    }
    if (!data.password || data.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (data.password !== data.confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  }

  /**
   * Validate login credentials
   * @param {Object} credentials - {email, password}
   * @returns {string|null} Error message or null if valid
   */
  validateLoginCredentials(credentials) {
    if (!credentials.email || !/\S+@\S+\.\S+/.test(credentials.email)) {
      return "Please enter a valid email address";
    }
    if (!credentials.password || credentials.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  }

  /**
   * Check if user is authenticated (has valid session)
   * @returns {boolean}
   */
  isAuthenticated() {
    const user = localStorage.getItem("user");
    return !!user;
  }

  /**
   * Get stored user data
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Clear local authentication data
   */
  clearAuthData() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
