const express = require("express");
const {	profile,relationshipGoal, profileEdit,} = require("../controllers/profileController");
const protect = require("../middleware/protectRoute");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
	"/",
	protect,
	upload.fields([{ name: "profilePic", maxCount: 1 }, { name: "morePics" }]),
	profile
);

//=============================

router.post(
	"/edit",
	protect,
	upload.fields([{ name: "profilePic", maxCount: 1 }, { name: "morePics",maxCount:10 }]),
	profileEdit
);

//====================================

router.post("/relationship", protect, relationshipGoal);

module.exports = router;
