import mongoose from 'mongoose';

const level2testSchema = mongoose.Schema(
    {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teamModel",
        },
        teamName: {
            type: String,
        },
        pageNo: {
            type: Number,
            default: -1
        },
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        },
        Level2points:{
            type:Number,
            default:0
        }

        // members: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Users",
        //     },
        // ],
    },
    { collection: "Level2test" }
);

export const Level2test = mongoose.models.Level2test || mongoose.model("Level2test", level2testSchema);
