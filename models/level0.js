import mongoose from 'mongoose';

const level0Schema = mongoose.Schema(
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
        level0Points: {
            type: Number,
            default: 0
        },

        // members: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Users",
        //     },
        // ],
    },
    { collection: "Level0" }
);

export const Level0 = mongoose.models.Level0 || mongoose.model("Level0", level0Schema);
