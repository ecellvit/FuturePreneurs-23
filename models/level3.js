import mongoose from 'mongoose';

const level3 = mongoose.Schema(
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
    Level3points: {
      type: Number,
      default: 0,
    },
    answers:{
      type:Array,
    },
    choice:{
      type:Array,
    },
    sector:{
      type:String,
    }

    // members: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Users",
    //     },
    // ],
  },
  { collection: 'Level3' }
);

export const Level3 =
  mongoose.models.Level3 ||
  mongoose.model('Level3', level3);
