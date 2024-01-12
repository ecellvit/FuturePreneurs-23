
const mongoose = require('mongoose');
const teamSchema = mongoose.Schema(
    {
        teamName: {
            type: String,
            unique: true
        },
        teamLeaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        teamNumber: {
            type: Number
        },
        leaderName: {
            type: String
        },
        leaderEmail: {
            type: String
        },
        isQualified: {
            type: Boolean
        },
        currentRound: {
            type: String
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        teamCode: {
            type: String
        }
    },
    { collection: "TeamModel" }
);

module.exports = mongoose.model("TeamModel", teamSchema) || mongoose.model("TeamModel", teamSchema);;

