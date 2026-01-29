import React from "react";
import formatNumber from "utils/formatNumber";

export default function BookingDetailModal({
  show,
  onClose,
  booking,
  onAction,
}) {
  if (!show || !booking) return null;

  const getStatusBadge = (status) => {
    let color = "secondary";
    switch (status) {
      case "pending":
        color = "warning";
        break;
      case "confirmed":
      case "paid":
        color = "success";
        break;
      case "cancelled":
        color = "danger";
        break;
      case "checked_in":
        color = "info";
        break;
      case "completed":
        color = "primary";
        break;
      default:
        break;
    }
    return <span className={`badge bg-${color} text-uppercase`}>{status}</span>;
  };

  const proofUrl = booking.payment?.transactionId;
  const isProofUrl = proofUrl && proofUrl.startsWith("http");

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold text-gray-800">
              Booking Detail #
              {booking.bookingId || booking._id.substr(-6).toUpperCase()}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="row">
              {/* Left Column: Details */}
              <div className="col-md-7">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted small text-uppercase fw-bold">
                    Current Status
                  </span>
                  {getStatusBadge(booking.status)}
                </div>

                <h6 className="fw-bold mb-3 border-bottom pb-2">
                  Guest Information
                </h6>
                <div className="mb-3">
                  <div className="row mb-2">
                    <div className="col-4 text-muted small">Full Name</div>
                    <div className="col-8 fw-semibold">
                      {booking.guestDetails?.firstName}{" "}
                      {booking.guestDetails?.lastName}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 text-muted small">Email</div>
                    <div className="col-8">
                      {booking.guestDetails?.email ||
                        booking.user?.email ||
                        "-"}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 text-muted small">Phone</div>
                    <div className="col-8">
                      {booking.guestDetails?.phone || "-"}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 text-muted small">Guests</div>
                    <div className="col-8">
                      {booking.guests?.adults || booking.guests || 1} Adults,{" "}
                      {booking.guests?.children || 0} Children
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold mb-3 border-bottom pb-2 mt-4">
                  Property Information
                </h6>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={
                      booking.property?.imageUrls?.[0]?.url
                        ? `${process.env.REACT_APP_API_URL.replace("/api", "")}/${booking.property.imageUrls[0].url}`
                        : "https://placehold.co/60x60"
                    }
                    alt="Property"
                    className="rounded me-3 border"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div className="fw-bold">{booking.property?.title}</div>
                    <div className="small text-muted">
                      {booking.property?.city}, {booking.property?.country}
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold mb-3 border-bottom pb-2 mt-4">
                  Pricing Breakdown
                </h6>
                <div className="row mb-2">
                  <div className="col-6 text-muted">Price per night</div>
                  <div className="col-6 text-end">
                    IDR {formatNumber(booking.pricing?.basePrice || 0)}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-muted">Nights</div>
                  <div className="col-6 text-end">x {booking.nights}</div>
                </div>
                <div className="row border-top pt-2 mt-2">
                  <div className="col-6 fw-bold">Total Price</div>
                  <div className="col-6 text-end fw-bold text-success">
                    IDR{" "}
                    {formatNumber(
                      booking.pricing?.totalPrice || booking.totalPrice || 0,
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Payment Proof */}
              <div className="col-md-5 ps-md-4 border-start">
                <h6 className="fw-bold mb-3">Payment Proof</h6>
                {isProofUrl ? (
                  <div className="text-center bg-light p-2 rounded border">
                    <a
                      href={proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={proofUrl}
                        alt="Payment Proof"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "300px", objectFit: "contain" }}
                      />
                    </a>
                    <div className="mt-2 text-center">
                      <small className="text-muted d-block">
                        Click to view original
                      </small>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5 bg-light rounded border border-dashed text-muted">
                    <i className="fas fa-image fa-3x mb-3 text-gray-300"></i>
                    <div>No Payment Proof Uploaded</div>
                  </div>
                )}

                {booking.payment?.bankName && (
                  <div className="mt-3 small p-2 bg-warning-light rounded border border-warning">
                    <strong>Bank Info:</strong> {booking.payment.bankName} -{" "}
                    {booking.payment.bankHolder}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light border-0">
            {booking.status === "pending" ||
            booking.status === "waiting_payment" ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => onAction("reject", booking._id)}
                >
                  <i className="fas fa-times me-2"></i>Reject
                </button>
                <button
                  type="button"
                  className="btn btn-success text-white"
                  onClick={() => onAction("approve", booking._id)}
                >
                  <i className="fas fa-check me-2"></i>Approve & Confirm
                </button>
              </>
            ) : (
              <div className="text-muted fst-italic me-auto">
                This booking has been processed.
              </div>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
