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

// MongoDB Connection Management for Serverless
let mongoConnected = false;

const connectDB = async () => {
  if (mongoConnected || mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not defined");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    mongoConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

// Middleware to connect to DB on first request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("❌ Error in DB connection middleware:", error);
    next();
  }
});

// Routes - both /api/enquiries and /enquiries for compatibility
app.use("/api/enquiries", enquiryRoutes);
app.use("/enquiries", enquiryRoutes);

// Health checks
app.get("/", (req, res) => {
  res.json({ message: "✅ API Running", status: "ok", mongoConnected });
});

app.get("/api", (req, res) => {
  res.json({ message: "✅ VTA Enquiry API Ready", status: "ok", mongoConnected });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler (must be last)
app.use((err, req, res, next) => {
  console.error("❌ Route Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Export handler for Vercel serverless
export default app;
