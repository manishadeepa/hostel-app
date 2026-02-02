const express = require("express");
const cors = require("cors");

const app = express();
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Attendance API


 app.post("/mark-attendance", (req, res) => {
  const clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  console.log("Client IP:", clientIP);

  // ✅ COLLEGE WI-FI PUBLIC IP
  const COLLEGE_PUBLIC_IP = "111.93.231.194";

  if (clientIP !== COLLEGE_PUBLIC_IP) {
    return res.status(403).json({
      success: false,
      message: "Attendance allowed only on college Wi-Fi",
    });
  }

  return res.json({
    success: true,
    message: "Attendance marked successfully",
  });
});



 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


