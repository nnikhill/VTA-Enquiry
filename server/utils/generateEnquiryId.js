import Enquiry from "../models/Enquiry.js";

export const generateEnquiryId = async () => {
  const year = new Date().getFullYear();

  const count = await Enquiry.countDocuments();

  const enquiryId = `VTA-${year}-${String(count + 1).padStart(3, "0")}`;

  return enquiryId;
};