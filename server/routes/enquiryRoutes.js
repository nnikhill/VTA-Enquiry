import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", createEnquiry);
router.get("/", getAllEnquiries);
router.put("/:id/status", updateEnquiryStatus);

export default router;
