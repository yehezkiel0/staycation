import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "elements/Button";
import DateInput from "elements/Form/DateInput";
import { formatIDRCurrency } from "utils/currency";
import { useBooking } from "hooks/useBooking";
import propTypes from "prop-types";

// Note: Re-importing DatePicker under a different name if needed to avoid conflicts or just import default
// The previous file used "DatePicker" as import, using ReactDatePicker to be safe if I used DatePicker elsewhere
// But standard import is `import DatePicker from "react-datepicker";`

const BookingForm = ({ property }) => {
  const {
    setDateRange,
    startDate,
    endDate,
    guests,
    setGuests,
    totalPrice,
    startBooking,
  } = useBooking(property);

  const [isGuestOpen, setIsGuestOpen] = useState(false);

  if (!property) return null;

  return (
    <div className="booking-card sticky-top" style={{ top: "100px" }}>
      <div className="card border-0 shadow-lg">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h4 className="fw-bold text-primary mb-0">
              {formatIDRCurrency(totalPrice || property.price.amount)}
              <small className="text-muted fw-normal">
                {" "}
                for {guests} guest{guests > 1 && "s"}
              </small>
            </h4>
            <small className="text-muted">
              {formatIDRCurrency(property.price.amount)} per person/night
            </small>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small text-muted">
              Dates
            </label>
            <ReactDatePicker
              selected={startDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange={true}
              minDate={new Date()}
              dateFormat="dd MMM yyyy"
              customInput={<DateInput />}
              wrapperClassName="w-100"
              popperPlacement="bottom-end"
              popperModifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    rootBoundary: "viewport",
                    tether: false,
                    altAxis: true,
                  },
                },
              ]}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small text-muted">
              Guests
            </label>
            <div className="position-relative">
              <div
                className="input-group"
                onClick={() => setIsGuestOpen(!isGuestOpen)}
                style={{ cursor: "pointer" }}
              >
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-user-friends text-primary"></i>
                </span>
                <div className="form-control border-start-0 ps-0 bg-white d-flex align-items-center justify-content-between">
                  <span>
                    {guests} Guest{guests > 1 ? "s" : ""}
                  </span>
                  <i className="fas fa-chevron-down text-primary me-1"></i>
                </div>
              </div>

              {isGuestOpen && (
                <div
                  className="position-absolute w-100 bg-white shadow-lg rounded mt-1 overflow-hidden"
                  style={{
                    zIndex: 1000,
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  {[...Array(property.specifications.maxGuests)].map((_, i) => {
                    const guestCount = i + 1;
                    return (
                      <div
                        key={guestCount}
                        className={`p-2 px-3 cursor-pointer ${guests === guestCount ? "bg-primary text-white" : "hover-bg-light"}`}
                        onClick={() => {
                          setGuests(guestCount);
                          setIsGuestOpen(false);
                        }}
                        style={{
                          backgroundColor:
                            guests === guestCount ? "#1ABC9C" : undefined,
                          color: guests === guestCount ? "white" : undefined,
                          transition: "background-color 0.2s",
                        }}
                      >
                        {guestCount} Guest{guestCount > 1 ? "s" : ""}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <Button
            className="btn btn-primary w-100 btn-lg mb-3 shadow-sm"
            type="button"
            onClick={startBooking}
          >
            Book Now
          </Button>

          <div className="text-center">
            <small className="text-muted">
              Free cancellation before 24 hours
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

BookingForm.propTypes = {
  property: propTypes.object,
};

export default BookingForm;
