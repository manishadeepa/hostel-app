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
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  console.log("Client IP:", clientIP);

  const isCollegeWifi =
    clientIP.startsWith("192.168.") ||
    clientIP.startsWith("10.") ||
    clientIP.startsWith("172.");

  if (!isCollegeWifi) {
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


