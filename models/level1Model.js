const mongoose = require('mongoose');

const level1schema = mongoose.Schema({
    teamLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    teamID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamModel"
    },
    level1points: {
        type: Number
    },
    
}, { collection: "Level1Model" });

module.exports = mongoose.model("Level1Model", level1schema);
