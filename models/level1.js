import mongoose from 'mongoose';

const level1Schema = mongoose.Schema(
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
  { collection: 'Level1' }
);

export const Level1 =
  mongoose.models.Level1 || mongoose.model('Level1', level1Schema);
