import AdminModel from '../models/admin.model'
import {verifyOrCreateUser} from './User'
import {sleep} from '../utils/general'
import {follow} from '../utils/lens/follow'
import {getFollowModules} from '../utils/lens/getFollowModules'

import connectMongo from '../utils/connectMongoose';

function isAdminVerification(address){
    return new Promise(async (resolve, reject) => {
        try {
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            const admin = await AdminModel.findOne({address})
            if(admin){
                resolve(true)
            }else{
                reject("User not admin")
            }
          } catch (e) {
            console.trace(e)
            reject(e)
          }
    })

}

async function whitelistUsers(addresses){
    await connectMongo().catch((err) => {
        console.trace(err)
        reject(err)
    });
    let errors = []
    await addresses.forEach(async (address) => {
        const newUser = await verifyOrCreateUser(address).catch((err) => {
            errors.push(address)
            console.trace(err)
        })
        await sleep(100)
    })
    return errors
}

function followUsers(data){
    return new Promise(async(resolve, reject) => {
        try{
            const rawProfileIds = await getFollowModules(data)
            let result = []
            const profileIds = rawProfileIds?.data?.profiles?.items
            console.log(profileIds)
            if(profileIds){
                const addresses = profileIds.map((el) => {
                    let data = {profile:el.id}
                    if(el.isFollowedByMe === false && (el.followModule === null || el?.followModule?.type == "ProfileFollowModule")){
                        console.log("HOLA")
                        if(el.followModule){
                            data = {...data,                         
                                followModule: {
                                profileFollowModule: {
                                     profileId: process.env.LENS_USER_ID
                               }  
                            }}
                        }
                        result.push(data)
                    }
                    return el.ownedBy
                })
                const errorWhitelists = await whitelistUsers(addresses).catch((err) => console.log(err))

                if(result.length  > 0){
                    console.log(result)
                    const response = await follow(result)
                }
                resolve({followed:result, whitelistErrors:errorWhitelists})
            }else{
                reject("Falla")
            }

        }catch(err){
            console.trace(err)
            reject(err)
        }
    });
}

export {
    isAdminVerification,
    whitelistUsers,
    followUsers
}



