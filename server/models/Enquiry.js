import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    enquiryId: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    course: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
    },
    preferredTiming: {
      type: String,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Done", "Incomplete"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;