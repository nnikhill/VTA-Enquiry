import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/enquiries", enquiryRoutes);

app.get("/", (req, res) => {
  res.send("VTA Enquiry Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Error:", error.message);
  });