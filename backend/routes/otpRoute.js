const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router();

router.post("/", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
