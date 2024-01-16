import mongoose, { Schema } from 'mongoose';

const level4Schema = mongoose.Schema(
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
    level4Points: {
      type: Number,
      default: 0,
    },

    // members: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Users",
    //     },
    // ],
    answers: {
      problemStatement: {
        type: String,
      },
      projectName: {
        type: String,
      },
      keyFeatures: {
        type: String,
      },
      successCriteria: {
        type: String,
      },
      objective: {
        type: String,
      },
      targetAudience: {
        type: String,
      },
      testingPlan: {
        type: String,
      },
      successMetrics: {
        type: String,
      },
      constraintsGuidelines: {
        type: String,
      },
    },
  },
  { collection: 'Level4' }
);

export const Level4 =
  mongoose.models.Level4 || mongoose.model('Level4', level4Schema);
