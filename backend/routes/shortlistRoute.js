const express = require("express");
const protect = require("../middleware/protectRoute");
const {
	shortlist,
	shortlistedUsers,
	shortlistedByUser,
} = require("../controllers/shortlistController");
const router = express.Router();

router.post("/:id", protect, shortlist);
router.get("/shortlisted", protect, shortlistedUsers);
router.get("/shortlisted-by", protect, shortlistedByUser);

module.exports = router;
