import Enquiry from "../models/Enquiry.js";
import { generateEnquiryId } from "../utils/generateEnquiryId.js";
import { sendWhatsappMessage } from "../utils/sendWhatsappMessage.js";

// CREATE ENQUIRY
export const createEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      course,
      qualification,
      preferredTiming,
      notes,
    } = req.body;

    if (!fullName || !mobile || !course) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Mobile and Course are required",
      });
    }

    const enquiryId = await generateEnquiryId();

    const enquiry = await Enquiry.create({
      enquiryId,
      fullName,
      mobile,
      email,
      course,
      qualification,
      preferredTiming,
      notes,
    });

    // Send WhatsApp message asynchronously (fire and forget)
    sendWhatsappMessage({
      fullName,
      mobile,
      enquiryId,
      course,
    }).then((result) => {
      console.log(`✅ WhatsApp sent successfully to ${mobile}`);
    }).catch((error) => {
      console.error(`❌ WhatsApp failed for ${mobile}:`, error.message);
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.error("❌ Error creating enquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit enquiry",
    });
  }
};

// GET ALL ENQUIRIES
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ENQUIRY STATUS
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};