import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
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
import { bookingsAPI } from "services/api";
import { toast } from "react-toastify";
import {
  loadCheckoutData,
  initializeFormData,
  uploadProofPayment,
  prepareBookingPayload,
} from "services/logic/checkoutLogic";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [ItemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const data = loadCheckoutData();
    if (data) {
      setItemDetails(data);
    }
  }, []);

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
    let value = event.target.value;
    // Check if input is a file input and has files
    if (event.target.type === "file" && event.target.files) {
      value = event.target.files[0];
    }

    setData((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        ...initializeFormData(user),
        // Keep existing values if user didn't have them in profile but typed them?
        // Actually initializeFormData extracts from user.
        // User might have typed something before login loaded?
        // The original logic was:
        // firstName: user.firstName || user.name?.split(" ")[0] || prev.firstName,
        // So we should respect that.
        firstName: user.firstName || user.name?.split(" ")[0] || prev.firstName,
        lastName: user.lastName || user.name?.split(" ")[1] || prev.lastName,
        email: user.email || prev.email,
        phone: user.phoneNumber || user.phone || prev.phone,
      }));
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Staycation | Checkout";
  }, []);

  if (!ItemDetails) {
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
    duration: ItemDetails.duration,
  };

  const _SubmitBooking = async (nextStep) => {
    try {
      const proofPaymentUrl = await uploadProofPayment(data.proofPayment);
      const payload = prepareBookingPayload(ItemDetails, data, proofPaymentUrl);

      await bookingsAPI.create(payload);
      toast.success("Booking created successfully!");
      nextStep();
      localStorage.removeItem("checkout");
    } catch (err) {
      const errorMsg = err.message || "Booking failed. Please try again.";
      toast.error(errorMsg);
      console.error("Booking error:", err);
    }
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

  const handleContinueBook = (nextStep) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      nextStep();
    }
  };

  return (
    <>
      <Header isCentered />

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title fw-bold">Login Required</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLoginModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body py-4">
                <p className="mb-0 text-muted">
                  You must be logged in to process this booking. Please login to
                  continue.
                </p>
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <Button
                  className="btn px-4"
                  type="button"
                  isLight
                  onClick={() => setShowLoginModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="btn px-4"
                  type="button"
                  isPrimary
                  hasShadow
                  onClick={() => {
                    navigate("/login", { state: { from: location } });
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          backgroundColor: "#F9FAFB",
          minHeight: "calc(100vh - 80px)",
          paddingBottom: "50px",
        }}
      >
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
                          onClick={() => handleContinueBook(nextStep)}
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
                    style={{
                      color: "#dc3545",
                      backgroundColor: "#fff",
                      border: "1px solid #dc3545",
                    }}
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
                          onClick={() => _SubmitBooking(nextStep)}
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
                    style={{
                      color: "#dc3545",
                      backgroundColor: "#fff",
                      border: "1px solid #dc3545",
                    }}
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
                    href="/"
                  >
                    Back to Home
                  </Button>
                </Controller>
              )}
            </>
          )}
        </Stepper>
      </div>
    </>
  );
};

export default Checkout;
