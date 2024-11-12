const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		employer: {
			type: Boolean,
			default: false,
		},
		employee: {
			type: Boolean,
			default: false,
		},
		jobSeeker: {
			type: Boolean,
			default: false,
		},
		companyName: {
			type: String,
			trim: true,
		},
		designation: {
			type: String,
			trim: true,
		},
		location: {
			type: String,
		},
		jobTitle: {
			type: String,
		},
		expertiseLevel: {
			type: String,
			enum: ["Beginner", "Intermediate", "Expert"],
		},
	},
	{ timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
