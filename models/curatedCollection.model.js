import { Schema, model, models } from 'mongoose';

const curatedCollectionSchema = new Schema({
    name:{
        type:String, 
        required:true
      },
      descrioption:{
        type:String, 
        required:true,
        default:""
      },
      creationDate:{
        type:Date,
        default: Date.now(),
        required:true
      },
      creator:{
        type:String, 
        required:true
      },
      postIds:{
        type:[
          {
            image:{type:String},
            author:{type:String},
            id:{type:String}
          }
        ],
        required:true,
        default:[]
      },
      public:{
        type:Boolean,
        default:false,
        required:true
      },
      cover:{
        type:String,
        default:false,
        required:true
      }, 
      views:{
        type:Number,
        default:0,
        required:true
      },
      likes:{
        type:Number,
        default:0,
        required:true
      }
});



const CuratedCollection = models.CuratedCollection || model('CuratedCollection', curatedCollectionSchema);

export default CuratedCollection;

