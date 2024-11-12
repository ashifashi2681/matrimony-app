const { default: mongoose } = require("mongoose");
const Request = require("../models/request");

// send request to another user
const sendRequest = async (req, res) => {
	try {
		// get senderId from logged user from req.user
		const senderId = req.user._id;

		// get receiverId from req.body
		const { receiverId } = req.body;

		// check the already sent request has been sent and the status is pending or accepted
		const request = await Request.findOne({
			sender: { $in: [senderId, receiverId] },
			receiver: { $in: [senderId, receiverId] },
			status: { $in: ["pending", "accepted"] },
		});

		if (request) {
			return res.status(400).json({
				success: false,
				message: "Already sent request",
			});
		}

		// else create a new request
		const newRequest = new Request({
			sender: senderId,
			receiver: receiverId,
		});

		await newRequest.save();
		if (!newRequest) {
			return res.status(400).json({
				success: false,
				message: "Request not sent",
			});
		}

		res.status(200).json({
			success: true,
			message: "Request send",
		});
	} catch (error) {
		console.log(error.message);
	}
};

// delete send request
const deleteRequest = async (req, res) => {
	try {
		// get requestId from req.body
		const requestId = req.params.id;

		if (!requestId) {
			return res.status(400).json({
				success: false,
				message: "Request could not found",
			});
		}

		if (!mongoose.Types.ObjectId.isValid(requestId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid request ID",
			});
		}

		// get request from db and update status
		const request = await Request.findByIdAndDelete(requestId);
		if (!request) {
			return res.status(400).json({
				success: false,
				message: "Request not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Request deleted",
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all send requests made by user
const getSendRequest = async (req, res) => {
	try {
		// get logged user id from req.user
		const requests = await Request.find({
			sender: req.user._id,
		})
			.select("_id receiver status")
			.populate({
				path: "receiver",
				select: "name email bio profile",
				populate: { path: "profile", select: "profilePic" },
			});

		if (!requests) {
			return res.status(400).json({
				success: false,
				message: "No send requests found",
			});
		}

		res.status(200).json({
			success: true,
			message: "all send requests",
			requests,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// accept request
const acceptRequest = async (req, res) => {
	try {
		// get requestId from req.body
		const requestId = req.params.id;

		if (!requestId) {
			return res.status(400).json({
				success: false,
				message: "Request not found",
			});
		}

		if (!mongoose.Types.ObjectId.isValid(requestId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid request ID",
			});
		}

		// get request from db and update status
		const request = await Request.findById(requestId);

		if (!request) {
			return res.status(400).json({
				success: false,
				message: "Request not found",
			});
		}

		if (request.status === "rejected") {
			return res.status(400).json({
				success: false,
				message: "Request already rejected",
			});
		}
		if (request.status === "accepted") {
			return res.status(400).json({
				success: false,
				message: "Request already accepted",
			});
		}

		const updatedRequest = await Request.findByIdAndUpdate(
			requestId,
			{
				status: "accepted",
			},
			{ new: true }
		);

		if (!updatedRequest) {
			return res.status(400).json({
				success: false,
				message: "Request not accepted",
			});
		}

		res.status(200).json({
			success: true,
			message: "Request accepted",
			updatedRequest,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all accept requests made by user
const getAcceptRequest = async (req, res) => {
	try {
		// get logged user id from req.user
		const requests = await Request.find({
			receiver: req.user._id,
			status: "accepted",
		})
			.select("_id sender status")
			.populate({
				path: "sender",
				select: "name email bio profile",
				populate: { path: "profile", select: "profilePic" },
			});

		if (!requests) {
			return res.status(400).json({
				success: false,
				message: "No accept requests found",
			});
		}

		res.status(200).json({
			success: true,
			message: "all accept requests",
			requests,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// reject request
const rejectRequest = async (req, res) => {
	try {
		// get requestId from req.body
		const requestId = req.params.id;

		if (!requestId) {
			return res.status(400).json({
				success: false,
				message: "Request not found",
			});
		}

		if (!mongoose.Types.ObjectId.isValid(requestId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid request ID",
			});
		}

		// get request from db and update status

		const request = await Request.findById(requestId);

		if (!request) {
			return res.status(400).json({
				success: false,
				message: "Request not found",
			});
		}

		if (request.status === "rejected") {
			return res.status(400).json({
				success: false,
				message: "Request already rejected",
			});
		}
		if (request.status === "accepted") {
			return res.status(400).json({
				success: false,
				message: "Request already accepted",
			});
		}

		const updatedRequest = await Request.findByIdAndUpdate(
			requestId,
			{
				status: "rejected",
			},
			{ new: true }
		);

		if (!updatedRequest) {
			return res.status(400).json({
				success: false,
				message: "Request not rejected",
			});
		}

		res.status(200).json({
			success: true,
			message: "Request rejected",
			updatedRequest,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all reject requests made by user
const getRejectRequest = async (req, res) => {
	try {
		// get logged user id from req.user
		const requests = await Request.find({
			receiver: req.user._id,
			status: "rejected",
		})
			.select("_id sender status")
			.populate({
				path: "sender",
				select: "name email bio profile",
				populate: { path: "profile", select: "profilePic" },
			});

		if (!requests) {
			return res.status(400).json({
				success: false,
				message: "No reject requests found",
			});
		}

		res.status(200).json({
			success: true,
			message: "all rejected requests",
			requests,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all received requests made by user
const getReceivedRequest = async (req, res) => {
	try {
		// get logged user id from req.user
		const requests = await Request.find({
			receiver: req.user._id,
		})
			.select("_id sender status")
			.populate({
				path: "sender",
				select: "name email bio profile",
				populate: {
					path: "profile",
					select: "profilePic",
				},
			});

		if (!requests) {
			return res.status(400).json({
				success: false,
				message: "No received requests found",
			});
		}

		res.status(200).json({
			success: true,
			message: "all received requests",
			requests,
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	sendRequest,
	deleteRequest,
	acceptRequest,
	rejectRequest,
	getSendRequest,
	getAcceptRequest,
	getRejectRequest,
	getReceivedRequest,
};
