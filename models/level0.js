/*import mongoose from 'mongoose';

const level0Schema = mongoose.Schema(
    {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teamModel",
        },
        teamName: {
            type: String,
        },
        pageNo: {
            type: Number,
            default: -1
        },
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        },
        level0Points: {
            type: Number,
            default: 0
        },

        // members: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Users",
        //     },
        // ],
    },
    { collection: "Level0" }
);

export const Level0 = mongoose.models.Level0 || mongoose.model("Level0", level0Schema);
*/
import mongoose from 'mongoose';

const level0Schema = mongoose.Schema(
  {
    teamName: {
      type: String,
      unique: true,
    },
    /*
        teamLeaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        */
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teamModel',
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

    level: {
      type: Number,
      default: -1,
    },
    pageNo: {
      type: Number,
      default: -1,
    },

    level0Points: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'Level0' }
);

export const Level0 =
  mongoose.models.Level0 || mongoose.model('Level0', level0Schema);
