/**
 * Admin Constants
 * Centralized configuration for Admin pages
 */

// Property Types with icons (lowercase values to match backend enum)
export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment", icon: "fa-building" },
  { value: "villa", label: "Villa", icon: "fa-home" },
  { value: "house", label: "House", icon: "fa-house-user" },
  { value: "hotel", label: "Hotel", icon: "fa-hotel" },
  { value: "resort", label: "Resort", icon: "fa-umbrella-beach" },
  { value: "cabin", label: "Cabin", icon: "fa-campground" },
  { value: "cottage", label: "Cottage", icon: "fa-house-chimney" },
];

// Common Amenities with icons
export const COMMON_AMENITIES = [
  { name: "WiFi", icon: "fa-wifi" },
  { name: "Pool", icon: "fa-swimming-pool" },
  { name: "Parking", icon: "fa-car" },
  { name: "Air Conditioning", icon: "fa-snowflake" },
  { name: "Kitchen", icon: "fa-utensils" },
  { name: "TV", icon: "fa-tv" },
  { name: "Washer", icon: "fa-soap" },
  { name: "Gym", icon: "fa-dumbbell" },
  { name: "Pet Friendly", icon: "fa-paw" },
  { name: "Beach Access", icon: "fa-umbrella-beach" },
];

// Booking Status Configuration
export const BOOKING_STATUS = {
  pending: {
    color: "warning",
    icon: "fa-clock",
    label: "Pending",
  },
  confirmed: {
    color: "success",
    icon: "fa-check-circle",
    label: "Confirmed",
  },
  paid: {
    color: "success",
    icon: "fa-check-circle",
    label: "Paid",
  },
  checked_in: {
    color: "info",
    icon: "fa-sign-in-alt",
    label: "Checked In",
  },
  completed: {
    color: "primary",
    icon: "fa-flag-checkered",
    label: "Completed",
  },
  cancelled: {
    color: "danger",
    icon: "fa-times-circle",
    label: "Cancelled",
  },
};

// Status Filter Options
export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "paid", label: "Paid" },
  { value: "checked_in", label: "Checked In" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

// Property Type Filter Options
export const TYPE_FILTER_OPTIONS = [
  { value: "all", label: "All Types" },
  ...PROPERTY_TYPES.map((t) => ({ value: t.value, label: t.label })),
];

// Price Unit Options
export const PRICE_UNITS = [
  { value: "night", label: "Night" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

// Pagination Settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};
