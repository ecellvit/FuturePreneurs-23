import mongoose from 'mongoose';

const qualifierSchema = mongoose.Schema(
    {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teamModel",
        },
        teamName: {
            type: String,
        },
        startTime: {
          type: Date
        },
        endTime: {
          type: Date
        },
        questionPointer: {
            type: Number,
            default: -1
        },
        questionCategory: {
            type: String,
            default: "easy"
        },
        randomOrder: [
          {
            type: Number,
          }
        ],
        userAnswers: [
          {
            type: Schema.Types.Mixed
          },
        ],


        // members: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Users",
        //     },
        // ],
    },
    { collection: "Qualifier" }
);

export const Qualifier = mongoose.models.Qualifier || mongoose.model("Qualifier", qualifierSchema);


// mcq store option No.
// multiple correct store array of correct options. eg. [1,2]
// 10 + 8 + 8 + 4
// easy medium hard caseStudy
// 