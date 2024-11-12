const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
	try {
		// get token from req.cookie
		const token = req.cookies.jwt;

		if (!token) {
			return res
				.status(400)
				.json({
					success: false,
					message: "No Token Found. Please Login to Continue",
				});
		}

		// decode token
		const decode = jwt.verify(token, process.env.JWT_SECRET);

		if (!decode) {
			return res
				.status(400)
				.json({ success: false, message: "invalid token" });
		}
		// get user from token
		const user = await User.findById(decode.user_id).select(
			"-password -confirmPassword"
		);
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "user not found" });
		}
		// attach user to req.user
		req.user = user;
		next();
	} catch (error) {
		return res.status(400).json({ success: false, message: error.message });
	}
};

module.exports = protect;
