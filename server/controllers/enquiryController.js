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

    // Send WhatsApp automatically
    const whatsappResult = await sendWhatsappMessage({
      fullName,
      mobile,
      enquiryId,
      course,
    });

    if (whatsappResult) {
      console.log(`✅ WhatsApp sent successfully to ${mobile}`);
    } else {
      console.log(`❌ WhatsApp failed for ${mobile}`);
    }

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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