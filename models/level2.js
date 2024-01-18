import mongoose from 'mongoose';

const level2Schema = mongoose.Schema(
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
    Level2points: {
      type: Number,
      default: 0,
    },
    answers:{
      type: Array,
    }
  },
  { collection: 'Level2' }
);

export const Level2 =
  mongoose.models.Level2 ||
  mongoose.model('Level2', level2Schema);
