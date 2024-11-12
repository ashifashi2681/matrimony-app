const express = require("express");
const protect = require("../middleware/protectRoute");
const {
	sendRequest,
	acceptRequest,
	rejectRequest,
	getSendRequest,
	getAcceptRequest,
	getRejectRequest,
    getReceivedRequest,
	deleteRequest,
} = require("../controllers/requestController");

const router = express.Router();

router.post("/send", protect, sendRequest);
router.get("/send", protect, getSendRequest);
router.delete("/send/:id", protect, deleteRequest);

router.post("/accept/:id", protect, acceptRequest);
router.get("/accept", protect, getAcceptRequest);

router.post("/reject/:id", protect, rejectRequest);
router.get("/reject", protect, getRejectRequest);

router.get("/received", protect, getReceivedRequest);

module.exports = router;
