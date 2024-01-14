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
            type: Number
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        teamCode: {
            type: String
        },
        level:{
            type:Number,
            default:-1
        },
        newspaperLink:{
            type:String
        },
        newspaperExists:{
            type:Boolean,
            default:false
        },
        newspaperset:{
            type:Number
        }

    },
    { collection: "TeamModeltest" }
);

export const TeamModel1 = mongoose.models.TeamModeltest || mongoose.model("TeamModeltest", teamSchema);
