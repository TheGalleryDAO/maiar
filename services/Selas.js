import connectMongo from '../utils/connectMongoose';
import axios from 'axios'
import SelasImageModel  from '../models/selasImage.model'
const selasAPI = process.env.SELAS_API

function generateImage(prompt){
    return new Promise(async (resolve, reject) => {
        await connectMongo().catch((err) => {
            console.trace(err)
            reject(err)
        });
        const config = {
            params:{
                prompt:prompt
            }
        }
        const response = await axios.get(selasAPI, config).catch((err) => {
            console.trace(err);
            console.log("The connection with the SELAS API has failed")
            reject("The connection with the SELAS API has failed")
        });
        if(response && response.data){
            resolve(response.data)
        }else{
            reject("The connection with the SELAS API has failed")

        }

    })
}
function saveNewImage(creator_address, prompt, job_id){
    return new Promise(async (resolve, reject) => {
        try{
            await connectMongo();
            const data = {
                creator_address:creator_address,
                prompt:prompt,
                job_id:job_id
            }
            const image = new SelasImageModel(data)
            await image.save()
            resolve(image)
        }catch(err){
            console.trace(err)
            reject(err)
        }
    })
}

function createNewImage(data){
    return new Promise(async (resolve, reject) => {
        const newImage = new SelasImageModel(data)
        await newImage.save().catch((err) => {
            console.trace(err);
            reject("Error saving the image")
        })
        resolve(newImage)
    })
}

function updateImageById(id, data){
    return new Promise(async (resolve, reject) => {
        await connectMongo()
        try{
            const image = await SelasImageModel.findByIdAndUpdate(id, {$set:{...data}}, {new:true});
            resolve(image)
        }catch(err){
            console.trace(err);
            reject("Image update failed")
        }
    
    })
}

function verifyImageOwnership(imageId, address){
    return new Promise(async (resolve, reject) => {
        await connectMongo().catch((err) => {
            console.trace(err)
            reject(err)
        });
        const image = await SelasImageModel.findById(imageId).catch((err) => {
            console.trace(err);
            reject("Internal server error.")
        })
        if(image){
            console.log(address, image.creator_address)
            resolve(image.creator_address === address);
        }else{
            resolve(false)
        }
    })
}
function getImageById(imageId){
    return new Promise(async (resolve, reject) => {
        await connectMongo().catch((err) => {
            console.trace(err)
            reject(err)
        });
        const image = await SelasImageModel.findById(imageId).catch((err) => {
            console.trace(err);
            reject("Internal server error.")
        })
        if(image){
            resolve(image);
        }else{
            resolve(null)
        }
    })
}

function setNftgenerated(imageId, postId, txHash){
    return new Promise(async (resolve, reject) => {
        await connectMongo().catch((err) => {
            console.trace(err)
            reject(err)
        });
        const lenster_post_link = "https://lenster.xyz/posts/" + postId
        const image = await SelasImageModel.findByIdAndUpdate(imageId, {$set:{nft_generated:true, txId:txHash, postId:postId, lenster_post_link:lenster_post_link}}, {new: true}).catch((err) => {
            console.trace(err);
            reject("Internal server error.")
        });
        if(image){
            resolve(image);
        }

    })
}
function likeImage(imageId, liked){
    return new Promise(async (resolve, reject) => {
        await connectMongo().catch((err) => {
            console.trace(err)
            reject(err)
        });
        const image = await SelasImageModel.findByIdAndUpdate(imageId, {$set:{liked:liked}}, {new: true}).catch((err) => {
            console.trace(err);
            reject("Internal server error.")
        });
        if(image){
            resolve(image);
        }

    })
}

function removeImageByJobId(creator_address, job_id){
    return new Promise(async (resolve, reject) => {
        await connectMongo()
        try{
            const deletedImage = await SelasImageModel.findOneAndDelete({creator_address, job_id})
            resolve(deletedImage)
        }catch(err){
            console.trace(err);
            reject("Internal server error.")
        }
    })
}
export {
    generateImage,
    createNewImage,
    verifyImageOwnership,
    setNftgenerated,
    likeImage,
    getImageById,
    saveNewImage,
    updateImageById,
    removeImageByJobId
}

