import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db.js"; // PostgreSQL Pool instance
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Make sure uploads folder exists
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Save file with original name and extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save with original file name and extension
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static("uploads")); // Serve files publicly

// ✅ Admin login route
app.post("/api/adminlogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM admins WHERE name = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ status: "true" });
    } else {
      res.json({ status: "false" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ status: "false", error: "Internal server error" });
  }
});

// ✅ NGO registration with file upload
app.post("/api/ngo-register", upload.single("file"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      country,
      state,
      city,
      address,
      type,
      year,
      regNumber,
      website,
      description,
    } = req.body;

    const file = req.file;
    const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${file.filename}`;

    console.log("Received NGO Registration Data:", {
      name,
      email,
      password,
      phone,
      country,
      state,
      city,
      address,
      type,
      year,
      regNumber,
      website,
      description,
      file,
    });

    res.json({
      status: "true",
      message: "Data received successfully",
      fileUrl,
    });
  } catch (error) {
    console.error("Error handling NGO registration:", error);
    res.status(500).json({ status: "false", error: "Internal server error" });
  }
});

// ✅ Refugees data endpoint
app.get("/refugees", (req, res) => {
  const refugees = [
    {
      name: "Amina Yusuf",
      nationality: "Somalia",
      dob: "1990-03-15",
      biometricSignature: "9a2b7fcd3e4e6a89d6a2baf4c4d57c22",
      suspectStatus: "No",
    },
    {
      name: "Mohammed Al-Fulan",
      nationality: "Syria",
      dob: "1985-09-28",
      biometricSignature: "c1d5e8f98bbfa12a9476fd2345dcfe11",
      suspectStatus: "Yes",
    },
    {
      name: "Grace Nwosu",
      nationality: "Nigeria",
      dob: "1998-06-21",
      biometricSignature: "f9bcd23b33aabbdd5598d9ce7e33a1a1",
      suspectStatus: "No",
    },
    {
      name: "Tariq Zaman",
      nationality: "Afghanistan",
      dob: "1992-12-05",
      biometricSignature: "a7c9d41f2b8e4f6e2a9c3d1e9f9a6f1f",
      suspectStatus: "Yes",
    },
  ];

  res.json(refugees);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
