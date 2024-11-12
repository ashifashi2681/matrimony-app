const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			// required: true,
			trim: true,
		},
		email: {
			type: String,
			// required: true,
			trim: true,
			// unique: true,
		},
		mobile: {
			type: String,
			// required: true,
			// unique: true,
		},
		password: {
			type: String,
			// required: true,
		},
		confirmPassword: {
			type: String,
			// required: true,
		},
		otp: {
			type: String,
		},
		profile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile",
		},
		job: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job",
		},
		relationshipGoal: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "RelationshipGoal",
		},
		viewedProfile: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		shortlisted: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		shortlistedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		bio: {
			type: String,
			default: "Life is short, Live it.😊"
		},
		username: {
			type: String,
			trim:true
		}
	
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
