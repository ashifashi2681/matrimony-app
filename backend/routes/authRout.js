const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const generateTokenAndSetCookies = require("../utils/genTokenAndSetCookies");

const router = express.Router();

const client_url = "http://localhost:3000";

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/auth/login/success",
		failureRedirect: "/auth/login/failed",
	})
);

router.get("/login/success", async (req, res) => {
	try {
		// check user exist in db
		const user = await User.findOne({
			email: req.user.emails[0].value,
		}).select("-password -confirmPassword");

		if (user) {
			generateTokenAndSetCookies(user._id, res);
			redirectUrl = `${client_url}/landing?user=${encodeURIComponent(
				JSON.stringify(user)
			)}`;
			// res.redirect(client_url);
		} else {
			// add user to db
			const newUser = new User({
				name: req.user.displayName,
				email: req.user.emails[0].value,
			});
			await newUser.save();
			generateTokenAndSetCookies(newUser._id, res);
			// res.redirect(`${client_url}/landing/personal-details`);
			redirectUrl = `${client_url}/landing/personal-details?user=${encodeURIComponent(
				JSON.stringify(newUser)
			)}`;
		}
		res.redirect(redirectUrl);
	} catch (error) {
		console.log(error.message);
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		success: false,
		message: "failure",
	});
});
module.exports = router;
