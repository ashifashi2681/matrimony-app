const Otp = require("../models/otp");
const twilio = require("twilio");
const User = require("../models/user");
const generateTokenAndSetCookies = require("../utils/genTokenAndSetCookies");

const client = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

const client_url = process.env.CLIENT_URL;

const sendOtp = async (req, res) => {
	try {
		const { phoneNumber } = req.body;

		// generate otp
		const otp = Math.floor(1000000 * Math.random());

		// send otp
		client.messages
			.create({
				to: `+91${phoneNumber}`,
				from: process.env.TWILIO_PHONE_NUMBER,
				body: `Your OTP is ${otp}`,
			})
			.then(() => {
				res.status(200).json({
					success: true,
					message: "otp sent",
				});
			})
			.catch((error) => {
				console.log(error.message);
			});

		// save to db
		const otpDocument = new Otp({
			phoneNumber,
			otp,
		});
		if (otpDocument) {
			await otpDocument.save();
			res.status(200).json({
				success: true,
				message: "otp send",
			});
		}
	} catch (error) {
		console.log(error.message);
	}
};

// verify otp
const verifyOtp = async (req, res) => {
	try {
		const { phoneNumber, otp } = req.body;
		// check phone number and otp exist in database

		const otpDocument = await Otp.findOne({ phoneNumber, otp });
		if (!otpDocument) {
			return res.status(400).json({
				success: false,
				message: "invalid otp",
			});
		}
		// check the phone number existed in user database
		const user = await User.findOne({ mobile: phoneNumber });

		if (!user) {
			// add to databse
			const newUser = new User({
				mobile: phoneNumber,
			});
			generateTokenAndSetCookies(newUser._id, res);
			await newUser.save();
			res.status(200).json({
				success: true,
				message: "otp verified successfully",
				profile: true,
			});
			// res.redirect(`${client_url}/landing/personal-details`);
		} else {
			res.status(200).json({
				success: true,
				message: "otp verified successfully",
				home: true,
			});
			// res.redirect(client_url);
		}
	} catch (error) {
		console.log(error.message);
	}
};
module.exports = { sendOtp, verifyOtp };
