import connectMongo from '../utils/connectMongoose';
import SelasUser from '../models/selasUser.model'
import SelasImage from '../models/selasImage.model'

import {generateImage, createNewImage} from './Selas.js'

import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"
import {isNftHolder} from '../utils/ether'
import getDefaultProfile from '../utils/lens/getDefaultProfile';

function requestNewImageForUser(address, prompt, jobId) {
    return new Promise(async (resolve, reject) => {
        try{
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
    
            if (prompt && address) {
                const availableGenerations = await remainingGenerations(address);
                if(availableGenerations > 0){
                        const data = {
                            creator_address:address,
                            prompt:prompt,
                            job_id:jobId
                        }
                        const newImage = await createNewImage(data).catch((err) => reject(err))
                        const newUser = await SelasUser.findOneAndUpdate({address}, {$set:{avaibleGenerations:availableGenerations - 1}}, {new:true}).catch((err) => {
                            console.trace(err);
                            reject("Error updating the user")
                        })                
                        resolve(newImage)
                }else{
                    reject("The User is not allowed to generate Images")
                }
            }else{
                reject("Prompt and address are required")
            }
        }catch(err){
            console.trace(err)
            reject("Internal server error.")
        }
    })
}

function remainingGenerations(address) {
    return new Promise(async (resolve, reject) => {
        const user = await SelasUser.findOne({address}).catch((err) => {
            console.trace(err)
            reject("Internal server error.");
        });
        if(user){
            const avaibleGenerations = user.avaibleGenerations;
            resolve(avaibleGenerations);
        }else{
            reject("Unathorized user!")
        }

    });
}


function verifyOrCreateUser(address){
    return new Promise(async (resolve, reject) => {
        try{
            const user = await verifyUser(address).catch((err) => reject(err))
            if(user){
                resolve(user)
            }else{
                const newUser = new SelasUser({address:address, avaibleGenerations:20})
                await newUser.save().catch((err) => {
                    console.trace(err)
                    reject(err)
                })
                resolve(newUser)
            }
        }catch(err){
            console.trace(err)
        }
    })
}
function createUser(address){
    return new Promise(async (resolve, reject) => {
        try{
            const user = await verifyUser(address).catch((err) => reject(err))
            if(user){
                resolve(user)
            }else{
                const newUser = new SelasUser({address:address, avaibleGenerations:5})
                await newUser.save().catch((err) => {
                    console.trace(err)
                    reject(err)
                })
                resolve(newUser)
            }
        }catch(err){
            console.trace(err)
        }
    })
}
function verifyUser(address){
    return new Promise(async (resolve, reject) => {
        try{
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            const user = await SelasUser.findOne({address});
            if(user){
                resolve(user)
            }else{
                resolve(null)
            }
        }catch(err){
            console.trace(err)
            reject("User verification has failed")
        }
    })
}

function siweUserAuthentication(req, credentials){
    return new Promise(async (resolve, reject) => {
        try {
            const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
    
            const nextAuthUrl = process.env.NEXTAUTH_URL 
            if (!nextAuthUrl) {
              reject(null)
            }
    
            const nextAuthHost = new URL(nextAuthUrl).host
            if (siwe.domain !== nextAuthHost) {
              reject(null)
            }
            const csrfToken = await getCsrfToken({req})
    
            if (siwe.nonce !== csrfToken) {
              reject(null)
            }
    
            await siwe.validate(credentials?.signature || "")
            const verified  = await verifyUser(siwe.address)
            if(!verified){
                const lensProfile = await getDefaultProfile("" + siwe.address)
                if(lensProfile?.id){
                    await verifyOrCreateUser(siwe.address)
                }else{
                    await createUser(siwe.address)
                }
            }
            resolve({
            id: siwe.address,
            })
    
          } catch (e) {
            console.trace(e)
            reject(e)
          }
    })

}




function getAllUsers(){
    return new Promise(async (resolve, reject) => {
        try{
            const users = await SelasUser.find({})
            resolve(users)
        }catch(err){
            console.trace(err)
            reject("Internal server error")
        }
    })
}
function getUserImages(address){
    return new Promise(async (resolve, reject) => {
        try{
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            const images = await SelasImage.find({creator_address:address}).catch((err) => {
                console.trace(err);
                reject("Internal server error.")
            });
            resolve(images)            
        }catch(err){
            console.trace(err);
            reject("Internal server error.")

        }
    })
}
function getUserMintedImages(address){
    return new Promise(async (resolve, reject) => {
        try{
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            const images = await SelasImage.find({creator_address:address, nft_generated:true}).catch((err) => {
                console.trace(err);
                reject("Internal server error.")
            });
            resolve(images)            
        }catch(err){
            console.trace(err);
            reject("Internal server error.")

        }
    })
}
function updateUserImages(address, image){
    return new Promise(async (resolve, reject) => {
        try{
            await connectMongo()
            await SelasUser.findOneAndUpdate({"address":address, "favouriteImages._id":image._id}, {$set:{
                "favouriteImages.$.nft_generated":true, 
                "favouriteImages.$.txId":image.txId, 
                "favouriteImages.$.lenster_post_link":image.lenster_post_link,
                "favouriteImages.$.postId":image.postId
            }}, {new:true});
            const newUser = await SelasUser.findOneAndUpdate({"address":address, "generatedImages._id":image._id}, {$set:{
                "generatedImages.$.nft_generated":true,
                "generatedImages.$.txId":image.txId, 
                "generatedImages.$.lenster_post_link":image.lenster_post_link,
                "generatedImages.$.postId":image.postId
            }}, {new:true});
            if(newUser.mintedImages){
                newUser.mintedImages.pull({_id:image._id});
            }else{
                newUser.mintedImages = [];
            }
            newUser.mintedImages.push(image)
            await newUser.save()
            resolve(newUser)
        }catch(err){
            console.trace(err);
            reject("Internal server error.")
        }
         
    })
}

function getUserFavouriteImages(address){
    return new Promise(async (resolve, reject) => {
        try{
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            const images = await SelasImage.find({creator_address:address, liked:true}).catch((err) => {
                console.trace(err);
                reject("Internal server error.")
            });
            resolve(images)            
        }catch(err){
            console.trace(err);
            reject("Internal server error.")

        }
    })
}
function updateUserFavouriteImages(address, image){
    return new Promise(async (resolve, reject) => {
        try{
            let newUser = await SelasUser.findOneAndUpdate({"address":address, "generatedImages._id":image._id}, {$set:{"generatedImages.$.liked":image.liked}}, {new:true});
            await SelasUser.findOneAndUpdate({"address":address, "mintedImages._id":image._id}, {$set:{"mintedImages.$.liked":image.liked}}, {new:true});            
            if(image.liked){
                newUser.favouriteImages.pull({_id:image._id});
                newUser.favouriteImages.push(image)
                await newUser.save()
            }else{
                newUser.favouriteImages.pull({_id:image._id});
                await newUser.save()
            }
            resolve(newUser)
        }catch(err){
            console.trace(err);
            reject("Internal server error.")
        }
         
    })}    

function addImage(image){
    return new Promise(async (resolve, reject) => {
        await connectMongo()
        try {
            const newUser = await SelasUser.findOne({address:image.creator_address})
            newUser.generatedImages.push(image)
            await newUser.save()
            resolve(newUser)
        }catch(err){
            console.trace(err)
            reject("Internal server error.")
        }
    });
}

export {
    requestNewImageForUser,
    siweUserAuthentication,
    verifyUser,
    verifyOrCreateUser,
    getUserImages,
    updateUserImages,
    getUserFavouriteImages,
    updateUserFavouriteImages,
    getUserMintedImages,
    getAllUsers,
    addImage
}
