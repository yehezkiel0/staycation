import React from "react";
import { Fade } from "react-awesome-reveal";
import { InputText } from "elements/Form";
import { formatIDRCurrency } from "utils/currency";

export default function BookingInformation(props) {
  const { data, ItemDetails, checkout } = props;

  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row">
          {/* Left Column: Contact Details Form */}
          <div
            className="col-12 col-lg-7 py-5 px-4"
            style={{ paddingRight: 50 }}
          >
            <h3 className="mb-4 fw-bold text-dark">Contact Details</h3>

            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="form-label fw-medium text-secondary"
              >
                First Name
              </label>
              <div className="input-group-custom">
                <InputText
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={props.onChange}
                  inputClassName="form-control form-control-lg bg-light border-0 shadow-sm rounded-3 py-3 px-4"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="form-label fw-medium text-secondary"
              >
                Last Name
              </label>
              <div className="input-group-custom">
                <InputText
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={props.onChange}
                  inputClassName="form-control form-control-lg bg-light border-0 shadow-sm rounded-3 py-3 px-4"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="form-label fw-medium text-secondary"
              >
                Email Address
              </label>
              <div className="input-group-custom">
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={props.onChange}
                  inputClassName="form-control form-control-lg bg-light border-0 shadow-sm rounded-3 py-3 px-4"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="form-label fw-medium text-secondary"
              >
                Phone Number
              </label>
              <div className="input-group-custom">
                <InputText
                  id="phone"
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={props.onChange}
                  inputClassName="form-control form-control-lg bg-light border-0 shadow-sm rounded-3 py-3 px-4"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Booking Summary */}
          <div className="col-12 col-lg-5 py-5">
            <div
              className="card shadow-lg rounded-4 p-4 border-0 bg-white h-100"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
            >
              <h4 className="mb-4 fw-bold text-dark">Booking Summary</h4>

              <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-4">
                <img
                  src={
                    ItemDetails.imageUrl ||
                    ItemDetails.images?.[0]?.url ||
                    ItemDetails.imageId?.[0]?.url ||
                    "/images/img-featured-1.jpg"
                  }
                  alt={ItemDetails.name}
                  className="rounded-3 shadow-sm"
                  style={{
                    width: 130,
                    height: 110,
                    objectFit: "cover",
                    marginRight: 15,
                  }}
                />
                <div>
                  <h5 className="mb-1 fw-bold">{ItemDetails.name}</h5>
                  {(ItemDetails.city || ItemDetails.country) && (
                    <span className="text-muted small">
                      <i className="fas fa-map-marker-alt me-1 text-primary"></i>
                      {ItemDetails.city}
                      {ItemDetails.city && ItemDetails.country ? ", " : ""}
                      {ItemDetails.country}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-bottom mb-3"></div>

              <div className="d-flex justify-content-between mb-3 align-items-center">
                <span className="text-secondary fw-medium">Check-in</span>
                <span className="fw-bold text-dark bg-light px-3 py-1 rounded-pill small">
                  {ItemDetails.date?.startDate
                    ? new Date(ItemDetails.date.startDate).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "short", year: "numeric" },
                      )
                    : ItemDetails.checkInDate
                      ? new Date(ItemDetails.checkInDate).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short", year: "numeric" },
                        )
                      : "-"}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-4 align-items-center">
                <span className="text-secondary fw-medium">Check-out</span>
                <span className="fw-bold text-dark bg-light px-3 py-1 rounded-pill small">
                  {ItemDetails.date?.endDate
                    ? new Date(ItemDetails.date.endDate).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "short", year: "numeric" },
                      )
                    : ItemDetails.checkOutDate
                      ? new Date(ItemDetails.checkOutDate).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short", year: "numeric" },
                        )
                      : "-"}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-gray-500">
                  Total Price ({checkout.duration} nights)
                </span>
                <span
                  className="fw-medium text-primary"
                  style={{ fontSize: 18 }}
                >
                  {formatIDRCurrency(
                    (ItemDetails.price?.amount || ItemDetails.price) *
                      checkout.duration,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
