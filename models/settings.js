import mongoose, { Schema } from 'mongoose';

const settingsSchema = mongoose.Schema(
  {
    "Qualifiers":{
        type:Number
    },
    "level0":{
        type:Number
    },
    "level1":{
        type:Number
    },
    "level2":{
        type:Number
    },
    "level3":{
        type:Number
    },
    "level4":{
        type:Number
    },
    "quizStartTime":{
        type:Array
    }
    


    
  },
  { collection: 'Setting' }
);

export const Settings =
  mongoose.models.Setting || mongoose.model('Setting', settingsSchema);
