import { Schema } from 'mongoose';

const selasImageSchema = new Schema({
    img_url:{type:String, default:""},
    prompt:{type:String, required:true},
    created_at:{type:Date, default:Date.now()},
    version:{type:Number, default:0},
    result_rate:{type:Number, default:-1},
    creator_address:{type:String, required:true},
    lenster_post_link:{type:String, default:""},
    nft_metadata:{type:String, default:""},
    job_id:{type:String, default:""},
    nft_generated:{type:Boolean, default:false}, 
    liked:{type:Boolean, default:false},
    txId:{type:String, default:""},
    postId:{type:String, default:"",}


});

export default selasImageSchema