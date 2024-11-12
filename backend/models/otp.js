const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
	{
		otp: {
			type: Number,
			required: true,
		},
		phoneNumber: {
			type: Number,
			required: true,
			// minlength: 10
		},
	},
	{ timestamps: true }
);

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
