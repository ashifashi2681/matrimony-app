const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		age: {
			type: Number,
			// required: true,
		},
		dob: {
			type: String,
			// required: true,
		},
		location: {
			type: String,
		},
		hobbies: [
			{
				type: String,
				// required: true,
			},
		],
		interests: [
			{
				type: String,
				// required: true,
			},
		],
		smoking: {
			type: String,
			// required: true,
		},
		drinking: {
			type: String,
			// required: true,
		},
		qualification: {
			type: String,
			// required: true,
		},
		profilePic: String,

		morePics: [
			String
		],
	},
	{ timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
