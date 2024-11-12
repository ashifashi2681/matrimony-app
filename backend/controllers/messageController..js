const Conversation = require("../models/conversation");
const Message = require("../models/message");
const Request = require("../models/request");
const User = require("../models/user");
const { getReceiverSocketId, io } = require("../sockets/socket");

const sendMessage = async (req, res) => {
	try {
		const { id: receiverId } = req.params;
		const senderId = req.user._id;
		const { message } = req.body;

		let conversation = await Conversation.findOne({
			participants: {
				$all: [receiverId, senderId],
			},
		});
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// console.log(newMessage)
		await Promise.all([conversation.save(), newMessage.save()]);
		// console.log(newMessage.receiverId);

		const receiverSocketId = getReceiverSocketId(newMessage.receiverId);
		// console.log(receiverSocketId);

		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(200).json({
			success: true,
			message: "Message sent successfully",
			newMessage,
		});
	} catch (error) {
		console.log(error.message);
	}
};

const getMessage = async (req, res) => {
	try {
		const { id: userToChat } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: {
				$all: [userToChat, senderId],
			},
		}).populate("messages");

		const receiverName = await User.findById(userToChat).select(
			"name -_id"
		);

		if (!conversation) {
			return res.status(400).json({
				success: false,
				message: "No conversation found",
				receiverName,
			});
		}
		const messages = conversation.messages;

		res.status(200).json({
			success: true,
			messages,
			receiverName,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all conversation of user
const getConversations = async (req, res) => {
	try {
		const senderId = req.user._id;
		console.log(senderId, "senderid");

		const conversations = await Conversation.find({
			participants: {
				$in: [senderId],
			},
		})
			.select("participants messages updatedAt")
			.sort({ updatedAt: -1 })
			.populate({
				path: "participants",
				select: "name profile",
				populate: {
					path: "profile",
					select: "profilePic -_id",
				},
				match: { _id: { $ne: senderId } },
			})
			.populate({
				path: "messages",
				select: "message createdAt -_id",
				options: {
					sort: { createdAt: -1 },
					limit: 1,
				},
			});

		// console.log(conversations)

		res.status(200).json({
			success: true,
			conversations,
		});
	} catch (error) {
		console.log(error.message);
	}
};

// get all conversation of user and request accepted users
const getConversationsContact = async (req, res) => {
	try {
		const requestAccepted = await Request.find({
			$and: [
				{ $or: [{ sender: req.user._id }, { receiver: req.user._id }] },
				{ status: "accepted" },
			],
		}).select("sender receiver -_id");

		const requestAcceptedConversations = await Conversation.find({
			$or: requestAccepted.map((request) => ({
				participants: { $all: [request.sender, request.receiver] },
			})),
		})
			.select("participants messages updatedAt")
			.sort({ updatedAt: -1 })
			.populate({
				path: "participants",
				select: "name bio profile",
				populate: {
					path: "profile",
					select: "profilePic -_id",
				},
				match: { _id: { $ne: req.user._id } },
			})
			.populate({
				path: "messages",
				select: "message createdAt -_id",
				options: {
					sort: { createdAt: -1 },
					limit: 1,
				},
			});

		res.status(200).json({
			success: true,
			requestAcceptedConversations,
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	sendMessage,
	getMessage,
	getConversations,
	getConversationsContact,
};
