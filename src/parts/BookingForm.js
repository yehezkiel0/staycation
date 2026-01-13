/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import { InputNumber, InputDate } from "elements/Form";
import {
  formatPrice,
  convertUSDToIDR,
  formatIDRCurrency,
} from "utils/currency";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ itemDetails, startBooking }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    duration: 1,
    date: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });

  const updateData = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const startDate = new Date(data.date.startDate);
    const endDate = new Date(data.date.endDate);
    const countDuration = new Date(endDate - startDate).getDate();

    if (countDuration !== data.duration) {
      setData((prev) => ({
        ...prev,
        duration: countDuration,
      }));
    }
  }, [data.date]); // dependency on date

  useEffect(() => {
    const startDate = new Date(data.date.startDate);
    const endDate = new Date(
      startDate.setDate(startDate.getDate() + +data.duration - 1)
    );

    if (endDate.getTime() !== data.date.endDate.getTime()) {
      setData((prev) => ({
        ...prev,
        date: {
          ...prev.date,
          endDate: endDate,
        },
      }));
    }
  }, [data.duration]); // dependency on duration

  const handleStartBooking = () => {
    startBooking({
      _id: itemDetails._id,
      duration: data.duration,
      date: {
        startDate: data.date.startDate,
        endDate: data.date.endDate,
      },
    });
    navigate("/checkout");
  };

  return (
    <Fade direction="up">
      <div className="card bordered" style={{ padding: "60px 80px" }}>
        <h4 className="mb-3">Start Booking</h4>
        <h5 className="h2 mb-4" style={{ color: "#1abc9c" }}>
          {formatPrice(itemDetails.price, itemDetails.unit)}
        </h5>

        <label htmlFor="duration">How long you will stay?</label>
        <InputNumber
          id="duration"
          max={30}
          suffix={" night"}
          isSuffixPlural
          onChange={updateData}
          name="duration"
          value={data.duration}
        />

        <label htmlFor="date">Pick a date</label>
        <InputDate
          id="date"
          onChange={updateData}
          name="date"
          value={data.date}
        />

        <h6
          className="text-gray-500 font-weight-light"
          style={{ marginBottom: 40 }}
        >
          You will pay{" "}
          <span className="text-gray-900">
            {formatIDRCurrency(
              convertUSDToIDR(itemDetails.price * data.duration)
            )}
          </span>{" "}
          per{" "}
          <span className="text-gray-900">
            {data.duration} {itemDetails.unit}
          </span>
        </h6>

        <Button
          className="btn px-5"
          hasShadow
          isPrimary
          isBlock
          onClick={handleStartBooking}
          type="link"
        >
          Continue to Book
        </Button>
      </div>
    </Fade>
  );
};

BookingForm.propTypes = {
  itemDetails: propTypes.object,
  startBooking: propTypes.func,
};

export default BookingForm;
