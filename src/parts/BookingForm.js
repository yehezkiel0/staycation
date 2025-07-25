/* eslint-disable no-undef */
import React, { Component } from "react";

import propTypes from "prop-types";
import { Fade } from "react-awesome-reveal";
import Button from "elements/Button";
import { InputNumber, InputDate } from "elements/Form";
import {
  formatPrice,
  convertUSDToIDR,
  formatIDRCurrency,
} from "utils/currency";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        duration: 1,
        date: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      },
    };
  }

  updateData = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;

    if (prevState.data.date !== data.date) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(data.date.endDate);
      const countDuration = new Date(endDate - startDate).getDate();
      this.setState({
        data: {
          ...this.state.data,
          duration: countDuration,
        },
      });
    }

    if (prevState.data.duration !== data.duration) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(
        startDate.setDate(startDate.getDate() + +data.duration - 1)
      );
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          date: {
            ...this.state.data.date,
            endDate: endDate,
          },
        },
      });
    }
  }

  startBooking = () => {
    const { data } = this.state;
    this.props.startBooking({
      _id: this.props.itemDetails._id,
      duration: data.duration,
      date: {
        startDate: data.date.startDate,
        endDate: data.date.endDate,
      },
    });
    this.props.history.push("/checkout");
  };

  render() {
    const { data } = this.state;
    const { itemDetails } = this.props;

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
            onChange={this.updateData}
            name="duration"
            value={data.duration}
          />

          <label htmlFor="date">Pick a date</label>
          <InputDate
            id="date"
            onChange={this.updateData}
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
            onClick={this.startBooking}
            type="link"
          >
            Continue to Book
          </Button>
        </div>
      </Fade>
    );
  }
}

BookingForm.propTypes = {
  itemDetails: propTypes.object,
  startBooking: propTypes.func,
};
