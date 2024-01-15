const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
        },
        hasFilledDetails: {
            type: Boolean,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        regNo: {
            type: String,
        },
        mobno: {
            type: String,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teams",
        },
        isQualified: {
            type: Boolean,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        teamRole:{
            type:String,
            default: null
        },
        consent:{
            type:Boolean,
            default: false
        }
        
    },
    { collection: "Users" }
);

export const Users = mongoose.model.User || mongoose.model("User", userSchema);
