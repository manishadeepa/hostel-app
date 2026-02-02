const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Attendance API
app.post("/mark-attendance", (req, res) => {
  let ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  // Handle IPv6-mapped IPv4 (IMPORTANT)
  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  console.log("Client IP:", ip);

  // ✅ College Wi-Fi range
  const COLLEGE_IP_PREFIX = "192.168.";

  if (!ip.startsWith(COLLEGE_IP_PREFIX)) {
    return res.status(403).json({
      success: false,
      message: "Attendance allowed only on college Wi-Fi",
    });
  }

  // ✅ Attendance allowed
  return res.json({
    success: true,
    message: "Attendance marked successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


