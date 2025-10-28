// backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ===== Fix for __dirname in ES Modules =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/registrationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===== User Schema & Model =====
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    dob: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    qualification: { type: String },
    file: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ===== Multer Config =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ===== JWT Secret =====
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// ===== Helper: Token Verification Middleware =====
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// ===== Routes =====

// 🧩 REGISTER
app.post("/register", upload.single("file"), async (req, res) => {
  try {
    const { name, phone, dob, email, password, qualification } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Name, Email, and Password are required." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "User already exists with this email." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      dob,
      email,
      password: hashedPassword,
      qualification,
      file,
    });

    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully!" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔑 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and Password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials." });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "✅ Login successful!",
      token,
      user: { name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 👤 Protected Profile Route
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found." });

    res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Profile Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
