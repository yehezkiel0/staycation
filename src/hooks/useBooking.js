import { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";

export const useBooking = (property) => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([null, null]);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (property && startDate && endDate) {
      const pricePerNight = property.price.amount;
      const duration = differenceInDays(endDate, startDate);
      // Calculate based on Guests * Price * Duration (if > 0, else 1 night minimum for display)
      const nights = duration > 0 ? duration : 1;
      setTotalPrice(guests * pricePerNight * nights);
    } else if (property) {
      setTotalPrice(property.price.amount);
    }
  }, [guests, dateRange, property, startDate, endDate]);

  const startBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const nights = differenceInDays(endDate, startDate);

    if (nights <= 0) {
      alert("Please select a valid date range (minimum 1 night)");
      return;
    }

    localStorage.setItem(
      "checkout",
      JSON.stringify({
        ...property,
        checkInDate: startDate,
        checkOutDate: endDate,
        guests: parseInt(guests),
        duration: nights,
        price: totalPrice,
      }),
    );
    navigate("/checkout");
  };

  return {
    dateRange,
    setDateRange,
    startDate,
    endDate,
    guests,
    setGuests,
    totalPrice,
    startBooking,
  };
};
