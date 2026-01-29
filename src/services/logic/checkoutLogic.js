import { uploadsAPI } from "services/api";

export const loadCheckoutData = () => {
  const data = localStorage.getItem("checkout");
  return data ? JSON.parse(data) : null;
};

export const initializeFormData = (user) => {
  return {
    firstName: user?.firstName || user?.name?.split(" ")[0] || "",
    lastName: user?.lastName || user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phoneNumber || user?.phone || "",
    proofPayment: "",
    bankName: "",
    bankHolder: "",
  };
};

export const uploadProofPayment = async (proofPaymentFile) => {
  if (proofPaymentFile && typeof proofPaymentFile === "object") {
    const uploadResponse = await uploadsAPI.uploadImage(proofPaymentFile);
    return uploadResponse.url;
  }
  return proofPaymentFile; // Assume string if not object
};

export const prepareBookingPayload = (
  itemDetails,
  formData,
  proofPaymentUrl,
) => {
  return {
    property: itemDetails._id,
    checkIn: itemDetails.date?.startDate || itemDetails.checkInDate,
    checkOut: itemDetails.date?.endDate || itemDetails.checkOutDate,
    guests: {
      adults: itemDetails.guests || 1,
      children: 0,
    },
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    proofPayment: proofPaymentUrl,
    bankName: formData.bankName,
    bankHolder: formData.bankHolder,
    specialRequests: formData.specialRequests || "",
  };
};
