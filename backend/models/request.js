const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	status: {
		type: String,
		enum: ["pending", "accepted", "rejected"],
		default: "pending",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
