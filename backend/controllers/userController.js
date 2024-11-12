const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateTokenAndSetCookies = require("../utils/genTokenAndSetCookies");
const { validationResult } = require("express-validator");
const Profile = require("../models/profile");

// sign up user
const signUp = async (req, res) => {
	const validationResults = validationResult(req);
	try {
		const { name, email, mobile, password, confirmPassword, otp } =
			req.body;

		// validate form data
		if (!name || !email || !mobile || !password || !confirmPassword) {
			return res.status(403).json({
				success: false,
				message: "fields must be provided",
			});
		}

		if (!validationResults.isEmpty()) {
			return res.status(400).json({
				success: false,
				message: validationResults.errors
					.map((err) => err.msg)
					.join(" & "),
			});
		}
		// check user exist
		const user = await User.findOne({ $or: [{ email }, { mobile }] });

		if (user) {
			return res.status(400).json({
				success: false,
				message: "User already exist with this email or phone",
			});
		}
		// check password and confirm password

		if (password !== confirmPassword) {
			return res
				.status(400)
				.json({ success: false, message: "Password not match" });
		}
		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// check otp based on mobile

		// create user
		const newUser = new User({
			name,
			email,
			mobile,
			password: hashedPassword,
			confirmPassword: hashedPassword,
			otp,
		});

		if (newUser) {
			generateTokenAndSetCookies(newUser._id, res);
			// save user
			await newUser.save();
			res.status(200).json({
				success: true,
				message: "User created successfully",
				user: {
					_id: newUser._id,
					name: newUser.name,
					email: newUser.email,
					mobile: newUser.mobile,
					profile: newUser.profile,
					job: newUser.job,
					relationshipGoal: newUser.relationshipGoal,
				},
			});
		} else {
			return res
				.status(400)
				.json({ success: false, message: "User not created" });
		}
	} catch (error) {
		console.log(error.message);
	}
};

// login user
const login = async (req, res) => {
	const validationResults = validationResult(req);
	try {
		const { email, mobile, password } = req.body;
		const chooseMethod = email || mobile;

		// validate form data
		if (!chooseMethod || !password) {
			return res.status(403).json({
				success: false,
				message: "fields must be provided",
			});
		}

		// validate mobile and email
		if (!validationResults.isEmpty()) {
			return res.status(400).json({
				success: false,
				message: validationResults.errors
					.map((err) => err.msg)
					.join(" / "),
			});
		}
		// check user in database based on email or mobile
		const user = await User.findOne({
			$or: [{ email }, { mobile }],
		});

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		// verify password
		const isPasswordMatched = await bcrypt.compare(
			password,
			user?.password || ""
		);

		if (!isPasswordMatched) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid password" });
		}

		// generate token and set cookies
		if (user && isPasswordMatched) {
			generateTokenAndSetCookies(user._id, res);

			// send response
			res.status(200).json({
				success: true,
				message: "User logged in successfully",

				user: {
					_id: user._id,
					name: user.name,
					email: user.email,
					mobile: user.mobile,
					profile: user.profile,
					job: user.job,
					relationshipGoal: user.relationshipGoal,
				},
			});
		} else {
			return res
				.status(400)
				.json({ success: false, message: "Login failed" });
		}
	} catch (error) {
		console.log(error.message);
	}
};

// get logged user
const user = async (req, res) => {
	try {
		// get user id from req.user
		const user = await User.findById(req.user._id)
			.select("-password -confirmPassword")
			.populate("profile job relationshipGoal viewedProfile");
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "user not found" });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log(error.message);
	}
};

// get all users
const getUsers = async (req, res) => {
	try {
		const users = await User.find({ _id: { $ne: req.user._id } })
			.select("-password -confirmPassword")
			.populate("job relationshipGoal viewedProfile profile");

		if (!users) {
			return res
				.status(400)
				.json({ success: false, message: "users not found" });
		}

		return res.status(200).json({ success: true, users });
	} catch (error) {
		console.log(error.message);
	}
};

// set profile viewed
const setProfileViewed = async (req, res) => {
	try {
		//  get current user from req.user
		const user = await User.findById(req.user._id);
		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "user not found" });
		}
		// get viewed user from req.params
		const viewedUser = await User.findById(req.params.id);
		if (!viewedUser) {
			return res
				.status(401)
				.json({ success: false, message: "user not found" });
		}

		viewedUser.viewedProfile.push(req.user._id);
		await viewedUser.save();

		res.status(200).json({
			success: true,
			message: "profile added successfully",
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all viewed profiles

// get all users by  locations
const getUsersByLocation = async (req, res) => {
	try {
		// get logged user location from req.user
		const user = await req.user.populate("profile");
		const location = user.profile.location || "no data";

		// get all users which match the location
		const locationProfiles = await Profile.find({
			location: { $regex: location, $options: "i" },
			userId: { $ne: req.user.id },
		}).populate({ path: "userId", select: "-password -confirmPassword" });

		if (!locationProfiles) {
			return res
				.status(400)
				.json({ success: false, message: "no matched location" });
		}
		res.status(200).json({
			success: true,
			message: "matched location",
			locationProfiles: locationProfiles,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all users by  qualifications
const getUsersByQualification = async (req, res) => {
	try {
		// get logged user qualification from req.user
		const user = await req.user.populate("profile");
		const qualification = user.profile.qualification || "no data";

		// get all users which match the qualification
		// const qualificationProfiles = await Profile.find({
		// 	qualification: { $regex: qualification, $options: "i" },
		// 	userId: { $ne: req.user.id },
		// })
		// 	.select("userId")
		// 	.populate({ path: "userId", select: "-password -confirmPassword" })

		const qualificationProfiles = await Profile.find({
			qualification: { $regex: qualification, $options: "i" },
			userId: { $ne: req.user.id },
		}).populate({ path: "userId", select: "-password -confirmPassword" });

		if (!qualificationProfiles) {
			return res
				.status(400)
				.json({ success: false, message: "no matched qualification" });
		}
		res.status(200).json({
			success: true,
			message: "matched qualification",
			qualificationProfiles: qualificationProfiles,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all users by  interests
const getUsersByInterests = async (req, res) => {
	try {
		// get logged user hobbies from req.user
		const user = await req.user.populate("profile");
		const hobbies = user.profile.hobbies.toString() || "no data";

		// get all users which match the hobbies
		const hobbiesProfiles = await Profile.find({
			hobbies: { $regex: hobbies, $options: "i" },
			userId: { $ne: req.user.id },
		}).populate({ path: "userId", select: "-password -confirmPassword" });

		if (!hobbiesProfiles) {
			return res
				.status(400)
				.json({ success: false, message: "no matched hobbies" });
		}

		res.status(200).json({
			success: true,
			message: "matched hobbies",
			hobbiesProfiles: hobbiesProfiles,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// logout user
const logout = async (req, res) => {
	try {
		res.clearCookie("jwt");
		res.status(200).json({
			success: true,
			message: "user logged out successfully",
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	signUp,
	login,
	setProfileViewed,
	getUsersByQualification,
	getUsersByLocation,
	getUsersByInterests,
	getUsers,
	user,
	logout,
};
