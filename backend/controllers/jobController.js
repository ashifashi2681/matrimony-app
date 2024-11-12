const Job = require("../models/job");
const User = require("../models/user");

// job status create
const jobStatus = async (req, res) => {
	try {
		const { userId, employer, employee, jobSeeker } = req.body;

		// validate form fields
		if (!(employer || employee || jobSeeker)) {
			return res.status(403).json({
				success: false,
				message: "fields must be provided",
			});
		}

		// check the user exist
		const user = await User.findOne({ _id: req.user._id }).select(
			"-password -confirmPassword"
		);
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "user not found" });
		}

		// check the user has already saved the job status
		const job = await Job.findOne({ userId: user._id });

		if (job) {
			return res.status(400).json({
				success: false,
				message: "user already has a job status",
			});
		}

		// save the job status details
		const newJob = new Job({
			userId: user._id,
			employer,
			employee,
			jobSeeker,
		});
		await newJob.save();
		await user.updateOne({ job: newJob._id });
		const updatedUser = await User.findOne({ _id: req.user._id }).select(
			"-password -confirmPassword"
		);
		return res.status(200).json({
			success: true,
			message: "Job Status created",
			user: updatedUser,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// job details create
const jobDetails = async (req, res) => {
	try {
		const { companyName, designation, location } = req.body;

		// validate form fields
		if (!companyName || !designation || !location) {
			return res.status(403).json({
				success: false,
				message: "fields must be provided",
			});
		}

		// find the job document and update by id
		const job = await Job.findByIdAndUpdate(
			req.user.job,
			{
				companyName,
				designation,
				location,
			},
			{
				new: true,
			}
		);

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "No job found",
			});
		}

		// get updated user document
		const updatedUser = await User.findOne({ _id: req.user._id }).select(
			"-password -confirmPassword"
		);
		return res.status(200).json({
			success: true,
			message: "Job details updated",
			user: updatedUser,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// job role create
const jobRole = async (req, res) => {
	try {
		const { jobTitle, expertiseLevel } = req.body;

		// validate form fields
		if (!jobTitle || !expertiseLevel) {
			return res.status(403).json({
				success: false,
				message: "fields must be provided",
			});
		}

		// find the job document and update by id
		const job = await Job.findByIdAndUpdate(
			req.user.job,
			{
				jobTitle,
				expertiseLevel,
			},
			{ new: true }
		);
		if (!job) {
			return res.status(404).json({
				success: false,
				message: "No job found",
			});
		}
		// get updated user document
		const updatedUser = await User.findOne({ _id: req.user._id })
			.select("-password -confirmPassword")
			.populate("job")
			.populate("profile");
		return res.status(200).json({
			success: true,
			message: "Job details updated",
			user: updatedUser,
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { jobStatus, jobDetails, jobRole };
