import mongoose, { Schema } from 'mongoose';

const qualifierSchema = mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teamModel',
    },
    teamName: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    questionPointer: {
      type: Number,
      default: -1,
    },
    questionCategory: {
      type: String,
      default: 'instruction',
    },
    easyOrder: [
      {
        type: Number,
      },
    ],
    mediumOrder: [
      {
        type: Number,
      },
    ],
    hardOrder: [
      {
        type: Number,
      },
    ],
    caseOrder: [
      {
        type: Number,
      },
    ],
    easyAnswers: [
      {
        type: Schema.Types.Mixed,
        default: Array(30).fill(null),
      },
    ],
    mediumAnswers: [
      {
        type: Schema.Types.Mixed,
        default: Array(25).fill(null),
      },
    ],
    hardAnswers: [
      {
        type: Schema.Types.Mixed,
        default: Array(20).fill(null),
      },
    ],
    caseStudyAnswers: [
      {
        type: Schema.Types.Mixed,
        default: Array(4).fill(null),
      },
    ],
    points: {
      type: Number,
      default: 0,
    },

    // members: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Users",
    //     },
    // ],
  },
  { collection: 'QualifierTest' }
);

export const QualifierTest =
  mongoose.models.QualifierTest ||
  mongoose.model('QualifierTest', qualifierSchema);

// mcq store option No.
// multiple correct store array of correct options. eg. [1,2]
// 10 + 8 + 8 + 4
// easy medium hard caseStudy
//
