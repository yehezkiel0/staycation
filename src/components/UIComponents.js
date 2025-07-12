import React from "react";

// Loading Spinner Component
export const LoadingSpinner = ({
  size = "md",
  message = "Loading...",
  fullScreen = false,
}) => {
  const sizeClass =
    {
      sm: "spinner-border-sm",
      md: "",
      lg: "spinner-border-lg",
    }[size] || "";

  const content = (
    <div
      className={`d-flex flex-column align-items-center justify-content-center ${
        fullScreen ? "min-vh-100" : "py-5"
      }`}
    >
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className="text-muted mt-3 mb-0">{message}</p>}
    </div>
  );

  return fullScreen ? (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex align-items-center justify-content-center"
      style={{ zIndex: 9999 }}
    >
      {content}
    </div>
  ) : (
    content
  );
};

// Error Message Component
export const ErrorMessage = ({ error, onRetry, fullScreen = false }) => {
  const content = (
    <div
      className={`d-flex flex-column align-items-center justify-content-center text-center ${
        fullScreen ? "min-vh-100" : "py-5"
      }`}
    >
      <div className="mb-4">
        <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
        <h4 className="text-dark">Oops! Something went wrong</h4>
        <p className="text-muted mb-0">
          {typeof error === "string"
            ? error
            : "An unexpected error occurred. Please try again."}
        </p>
      </div>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          <i className="fas fa-redo me-2"></i>
          Try Again
        </button>
      )}
    </div>
  );

  return fullScreen ? (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex align-items-center justify-content-center"
      style={{ zIndex: 9999 }}
    >
      <div className="container">{content}</div>
    </div>
  ) : (
    <div className="container">{content}</div>
  );
};

// Empty State Component
export const EmptyState = ({
  icon = "fas fa-inbox",
  title = "No data available",
  message = "There is no data to display at the moment.",
  action,
  actionText = "Refresh",
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <i className={`${icon} fa-4x text-muted mb-4`}></i>
      <h4 className="text-dark mb-2">{title}</h4>
      <p className="text-muted mb-4">{message}</p>
      {action && (
        <button className="btn btn-outline-primary" onClick={action}>
          <i className="fas fa-redo me-2"></i>
          {actionText}
        </button>
      )}
    </div>
  );
};

// Network Error Component
export const NetworkError = ({ onRetry }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="fas fa-wifi me-3"></i>
      <div className="flex-grow-1">
        <h6 className="mb-1">Connection Error</h6>
        <small>Please check your internet connection and try again.</small>
      </div>
      {onRetry && (
        <button
          className="btn btn-outline-danger btn-sm ms-3"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

// Toast Notification Component
export const Toast = ({
  message,
  type = "info",
  onClose,
  autoClose = 5000,
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const typeClasses = {
    success: "bg-success text-white",
    error: "bg-danger text-white",
    warning: "bg-warning text-dark",
    info: "bg-info text-white",
  };

  const typeIcons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  };

  return (
    <div
      className={`toast show ${typeClasses[type] || typeClasses.info}`}
      role="alert"
    >
      <div className="toast-body d-flex align-items-center">
        <i className={`${typeIcons[type] || typeIcons.info} me-2`}></i>
        <span className="flex-grow-1">{message}</span>
        {onClose && (
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        )}
      </div>
    </div>
  );
};

export default {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  NetworkError,
  Toast,
};
