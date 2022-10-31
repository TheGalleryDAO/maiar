import { Schema, model, models } from 'mongoose';
import selasImageSchema from './selasImageSchema'


const selasUserSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  avaibleGenerations:{
      type:Number,
      default:0
  }, 
  generatedImages:{
    type:[selasImageSchema],
    default:[]
  },
  favouriteImages:{
    type:[selasImageSchema],
    default:[],
    required:true
  },
  mintedImages:{
    type:[selasImageSchema],
    default:[],
    required:true
  }
});



const SelasUser = models.SelasUser || model('SelasUser', selasUserSchema);

export default SelasUser;
