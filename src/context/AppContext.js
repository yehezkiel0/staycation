import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
// import { authAPI } from "../services/api";

// Initial state
const initialState = {
  // Auth state
  user: null,
  token: null,
  isAuthenticated: false,

  // UI state
  loading: false,
  error: null,

  // App data
  categories: [],
  featuredProperties: [],
  favoriteProperties: [],
  bookings: [],
};

// Action types
export const actionTypes = {
  // Auth actions
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",

  // UI actions
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",

  // Data actions
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_FEATURED_PROPERTIES: "SET_FEATURED_PROPERTIES",
  SET_FAVORITE_PROPERTIES: "SET_FAVORITE_PROPERTIES",
  ADD_TO_FAVORITES: "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES: "REMOVE_FROM_FAVORITES",
  SET_BOOKINGS: "SET_BOOKINGS",
  ADD_BOOKING: "ADD_BOOKING",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        favoriteProperties: [],
        bookings: [],
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case actionTypes.SET_FEATURED_PROPERTIES:
      return {
        ...state,
        featuredProperties: action.payload,
      };

    case actionTypes.SET_FAVORITE_PROPERTIES:
      return {
        ...state,
        favoriteProperties: action.payload,
      };

    case actionTypes.ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteProperties: [...state.favoriteProperties, action.payload],
      };

    case actionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteProperties: state.favoriteProperties.filter(
          (prop) => prop._id !== action.payload
        ),
      };

    case actionTypes.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };

    case actionTypes.ADD_BOOKING:
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    // Auth actions
    login: async (credentials) => {
      dispatch({ type: actionTypes.LOGIN_START });
      try {
        // const response = await authAPI.login(credentials);
        // Mock response for now
        const response = {
          token: "mock-token",
          user: { id: 1, name: "Mock User" },
        };
        const { token, user } = response;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { token, user },
        });

        return response;
      } catch (error) {
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: error.message,
        });
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: actionTypes.LOGOUT });
    },

    register: async (userData) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        // const response = await authAPI.register(userData);
        // Mock response for now
        const response = { success: true, message: "Registration successful" };
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        return response;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: error.message,
        });
        throw error;
      }
    },

    fetchProfile: async () => {
      try {
        // const user = await authAPI.getProfile();
        // Mock user for now
        const user = { id: 1, name: "Mock User", email: "mock@example.com" };
        dispatch({ type: actionTypes.SET_USER, payload: user });
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } catch (error) {
        // If unauthorized, logout
        if (
          error.message.includes("unauthorized") ||
          error.message.includes("token")
        ) {
          actions.logout();
        }
        throw error;
      }
    },

    // UI actions
    setLoading: (loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    },

    // Data actions
    setCategories: (categories) => {
      dispatch({ type: actionTypes.SET_CATEGORIES, payload: categories });
    },

    setFeaturedProperties: (properties) => {
      dispatch({
        type: actionTypes.SET_FEATURED_PROPERTIES,
        payload: properties,
      });
    },

    setFavoriteProperties: (properties) => {
      dispatch({
        type: actionTypes.SET_FAVORITE_PROPERTIES,
        payload: properties,
      });
    },

    addToFavorites: (property) => {
      dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: property });
    },

    removeFromFavorites: (propertyId) => {
      dispatch({
        type: actionTypes.REMOVE_FROM_FAVORITES,
        payload: propertyId,
      });
    },

    setBookings: (bookings) => {
      dispatch({ type: actionTypes.SET_BOOKINGS, payload: bookings });
    },

    addBooking: (booking) => {
      dispatch({ type: actionTypes.ADD_BOOKING, payload: booking });
    },
  };

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { token, user },
        });

        // Optionally validate token by fetching fresh profile
        actions.fetchProfile().catch(() => {
          // If profile fetch fails, logout
          actions.logout();
        });
      } catch (error) {
        // If stored data is corrupted, logout
        actions.logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    state,
    actions,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
