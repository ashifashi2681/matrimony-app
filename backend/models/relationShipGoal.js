const mongoose = require("mongoose");

const relationshipGoalSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		shortTerm: {
			type: Boolean,
			default: false,
		},
		longTerm: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const RelationshipGoal = mongoose.model(
	"RelationshipGoal",
	relationshipGoalSchema
);
module.exports = RelationshipGoal;
