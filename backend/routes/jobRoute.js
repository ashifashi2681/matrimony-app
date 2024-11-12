const express = require("express");
const { jobStatus, jobRole, jobDetails } = require("../controllers/jobController");
const protect = require("../middleware/protectRoute");

const router = express.Router();

router.post("/", protect, jobStatus);
router.put("/job-details", protect, jobDetails)
router.put("/job-role", protect, jobRole)

module.exports = router;
