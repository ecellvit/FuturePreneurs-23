const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamTokenSchema = new Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teams',
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: 'TeamToken' }
);

export const TeamToken =
  mongoose.model.TeamToken ||
  mongoose.model('TeamToken', teamTokenSchema);
