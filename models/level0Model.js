const mongoose = require('mongoose');

const level0schema = mongoose.Schema({
    teamLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    teamID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamModel"
    },
    level0points: {
        type: Number
    },
    Answers: {
        type: Object 
    },
    newspaper:{
        type:[String]
    },
    newspaperExists:{
        type:Boolean,
        default:false
    }
    
}, { collection: "Level0Model" });

module.exports = mongoose.model("Level0Model", level0schema);
