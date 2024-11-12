const User = require("../models/user");

// shortlist a user
const shortlist = async (req, res) => {
	try {
		// get logged user id from req.user
		const loggedUser = req.user.id;
		const targetUser = req.params.id;

		// check target user a valid user
		const userExists = await User.findById(targetUser);
		if (!userExists) {
			return res.status(400).json({
				success: false,
				message: "User not found",
			});
		}

		// find and update User model shortlisted and shortlistedBy
		// check if targetUser is already in shortlisted
		const user = await User.findOne({
			_id: loggedUser,
			shortlisted: targetUser,
		});

		if (user) {
			return res.status(400).json({
				success: false,
				message: "User is already shortlisted",
			});
		}

		// add targetUser to shortlisted
		await User.findByIdAndUpdate(loggedUser, {
			$addToSet: { shortlisted: targetUser },
		});

		// add loggedUser to targetuser's shortlistedBy
		await User.findByIdAndUpdate(targetUser, {
			$addToSet: { shortlistedBy: loggedUser },
		});

		res.status(201).json({
			success: true,
			message: "User shortlisted successfully",
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all shortlisted users
const shortlistedUsers = async (req, res) => {
	try {
		// get all shortlisted users
		const shortlistedUsers = await User.findById(req.user.id)
			.select("shortlisted")
			.populate({
				path: "shortlisted",
				select: "name bio profile",
				populate: {
					path: "profile",
					select: "profilePic",
				},
			});

		if (!shortlistedUsers) {
			return res.status(404).json({
				success: false,
				message: "No shortlisted users found",
			});
		}
		res.status(200).json({
			success: true,
			shortlistedUsers,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all shortlisted by user
const shortlistedByUser = async (req, res) => {
	try {
		// get all shortlisted users
		const shortlistedByUsers = await User.findById(req.user.id)
			.select("shortlistedBy")
			.populate({
				path: "shortlistedBy",
				select: "name bio profile",
				populate: {
					path: "profile",
					select: "profilePic",
				},
			});

		if (!shortlistedByUsers) {
			return res.status(404).json({
				success: false,
				message: "No shortlisted by users found",
			});
		}
		res.status(200).json({
			success: true,
			shortlistedByUsers,
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { shortlist, shortlistedUsers, shortlistedByUser };
