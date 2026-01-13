import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Header from "../parts/Header";
import Button from "elements/Button";
import Stepper, {
  Numbering,
  Meta,
  MainContent,
  Controller,
} from "elements/Stepper";

import BookingInformation from "parts/Checkout/BookingInformation";
import Payment from "parts/Checkout/Payment";
import Completed from "parts/Checkout/Completed";
import usePageData from "hooks/usePageData";

const Checkout = () => {
  const { data: ItemDetails, loading } = usePageData("details");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    proofPayment: "",
    bankName: "",
    bankHolder: "",
  });

  const onChange = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Staycation | Checkout";
  }, []);

  if (loading || !ItemDetails) {
    return (
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  const checkout = {
    duration: 3,
  };

  const steps = {
    bookingInformation: {
      title: "Booking Information",
      description: "Please fill up the blank fields below",
      content: (
        <BookingInformation
          data={data}
          checkout={checkout}
          ItemDetails={ItemDetails}
          onChange={onChange}
        />
      ),
    },
    payment: {
      title: "Payment",
      description: "Kindly follow the instructions below",
      content: (
        <Payment
          data={data}
          ItemDetails={ItemDetails}
          checkout={checkout}
          onChange={onChange}
        />
      ),
    },
    completed: {
      title: "Yay! Completed",
      description: null,
      content: <Completed />,
    },
  };

  return (
    <>
      <Header isCentered />
      <Stepper steps={steps} data={ItemDetails}>
        {(prevStep, nextStep, CurrentStep, steps) => (
          <>
            <Numbering
              data={steps}
              current={CurrentStep}
              style={{ marginBottom: 50 }}
            />

            <Meta data={steps} current={CurrentStep} />

            <MainContent data={steps} current={CurrentStep} />

            {CurrentStep === "bookingInformation" && (
              <Controller>
                {data.firstName !== "" &&
                  data.lastName !== "" &&
                  data.email !== "" &&
                  data.phone !== "" && (
                    <Fade>
                      <Button
                        className="btn mb-3"
                        type="button"
                        isBlock
                        isPrimary
                        hasShadow
                        onClick={nextStep}
                      >
                        Continue to Book
                      </Button>
                    </Fade>
                  )}
                <Button
                  className="btn"
                  type="link"
                  isBlock
                  isLight
                  href={`/properties/${ItemDetails._id}`}
                >
                  Cancel
                </Button>
              </Controller>
            )}

            {CurrentStep === "payment" && (
              <Controller>
                {data.proofPayment !== "" &&
                  data.bankName !== "" &&
                  data.bankHolder !== "" && (
                    <Fade>
                      <Button
                        className="btn mb-3"
                        type="button"
                        isBlock
                        isPrimary
                        hasShadow
                        onClick={nextStep}
                      >
                        Continue to Book
                      </Button>
                    </Fade>
                  )}
                <Button
                  className="btn"
                  type="button"
                  isBlock
                  isLight
                  onClick={prevStep}
                >
                  Cancel
                </Button>
              </Controller>
            )}

            {CurrentStep === "completed" && (
              <Controller>
                <Button
                  className="btn"
                  type="link"
                  isBlock
                  isPrimary
                  hasShadow
                  href=""
                >
                  Back to Home
                </Button>
              </Controller>
            )}
          </>
        )}
      </Stepper>
    </>
  );
};

export default Checkout;
