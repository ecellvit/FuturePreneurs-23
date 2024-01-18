import mongoose from 'mongoose';

const level1testSchema = mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teamModel',
    },
    teamName: {
      type: String,
    },
    pageNo: {
      type: Number,
      default: -1,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    level1Points: {
      type: Number,
      default: -1,
    },
    sector:{
      type : String ,
    },
    problemOrder :{
      type : Array ,
    }

    // members: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Users",
    //     },
    // ],
  },
  { collection: 'Level1test' }
);

export const Level1test =
  mongoose.models.Level1test ||
  mongoose.model('Level1test', level1testSchema);
