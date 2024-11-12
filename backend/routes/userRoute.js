const express = require("express");
const {
	signUp,
	login,
	setProfileViewed,
	getUsersByQualification,
	getUsersByLocation,
	getUsers,
	getUsersByInterests,
	user,
	logout,

} = require("../controllers/userController");
const { body } = require("express-validator");
const protect = require("../middleware/protectRoute");

const router = express.Router();

// validate email, phone number and password fields
const validtaions = [
	body("email", "invalid email address").isEmail(),
	body("mobile", "invalid mobile number")
		.isMobilePhone()
		.isLength({ min: 10, max: 10 })
		.isNumeric(),
	body("password", "password must be at least 6 characters").isLength({
		min: 6,
	}),
];

// user routes
router.post("/signup", validtaions, signUp);
router.post("/login", login);
router.get("/users", protect, getUsers);
router.get("/", protect, user);
router.post("/set-profile-viewed/:id", protect, setProfileViewed);
router.get("/getUsersByQualification", protect, getUsersByQualification);
router.get("/getUsersByLocation", protect, getUsersByLocation);
router.get("/getUsersByInterest", protect, getUsersByInterests);
router.post('/logout', logout)

module.exports = router;
