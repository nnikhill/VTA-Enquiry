import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import enquiryRoutes from "../server/routes/enquiryRoutes.js";

dotenv.config();

const app = express();

// CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,https://vta-enquiry.vercel.app").split(',');

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin.trim())) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Connect to MongoDB only if not already connected
if (mongoose.connection.readyState === 0 && process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  }).then(() => {
    console.log("✅ MongoDB Connected");
  }).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
}

// Routes - both /api/enquiries and /enquiries for compatibility
app.use("/api/enquiries", enquiryRoutes);
app.use("/enquiries", enquiryRoutes);

// Health checks
app.get("/", (req, res) => {
  res.json({ message: "✅ API Running", status: "ok" });
});

app.get("/api", (req, res) => {
  res.json({ message: "✅ VTA Enquiry API Ready", status: "ok" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;
