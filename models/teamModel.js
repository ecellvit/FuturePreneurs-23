import mongoose from 'mongoose';

const teamSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      unique: true,
    },
    teamLeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    teamNumber: {
      type: Number,
    },
    leaderName: {
      type: String,
    },
    leaderEmail: {
      type: String,
    },
    isQualified: {
      type: Boolean,
    },
    currentRound: {
      type: Number,
    },
    sector:{
      type: String,
    },
    newspaperLink: {
      type: String,
    },
    newspaperExists: {
      type: Boolean,
      default: false,
    },
    newspaperset: {
      type: Number,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    teamCode: {
      type: String,
    },
    level: {
      type: Number,
      default: -1,
    },
    points:{
      type:Number,
      default:0,
    }
  },
  { collection: 'TeamModel' }
);

export const TeamModel =
  mongoose.models.TeamModel ||
  mongoose.model('TeamModel', teamSchema);
