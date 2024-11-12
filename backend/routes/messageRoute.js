const express = require("express");
const protect = require("../middleware/protectRoute");
const {
	sendMessage,
	getMessage,
	getConversations,
	getConversationsContact,
} = require("../controllers/messageController.");

const router = express.Router();

router.post("/:id", protect, sendMessage);
router.get("/:id", protect, getMessage);
router.get("/", protect, getConversations);
router.get("/get/contact", protect, getConversationsContact);

module.exports = router;
