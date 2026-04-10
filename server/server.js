import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();

const app = express();

// CORS Configuration - यह सभी origins को allow करेगा development के लिए
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://vta-enquiry.vercel.app"
    ];
    
    // अगर origin allowed है या origin undefined है (same origin requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 3600
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight requests के लिए - यह जरूरी है!
app.use(express.json());

app.use("/api/enquiries", enquiryRoutes);

app.get("/", (req, res) => {
  res.send("VTA Enquiry Backend Running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  });