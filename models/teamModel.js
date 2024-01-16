import mongoose from 'mongoose';

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

export const TeamModel = mongoose.models.TeamModel || mongoose.model("TeamModel", teamSchema);
