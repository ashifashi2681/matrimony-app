const express = require("express");
const authRoute = require("./authRout");
const userRoute = require("./userRoute");
const profileRoute = require("./profileRoute");
const otpRoute = require("./otpRoute");
const jobRoute = require("./jobRoute");
const requestRoute = require("./requestRoute");
const shortlistRoute = require("./shortlistRoute");
const messageRoute = require("./messageRoute");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/profile", profileRoute);
router.use("/otp", otpRoute);
router.use("/job", jobRoute);
router.use("/request", requestRoute);
router.use("/shortlist", shortlistRoute);
router.use("/message", messageRoute);

module.exports = router;
