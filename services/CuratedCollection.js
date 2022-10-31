import CuratedCollectionModel from '../models/curatedCollection.model'


import connectMongo from '../utils/connectMongoose';



function createCollection(address, name){
    return new Promise(async (resolve, reject) => {
        try {
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            const collection = new CuratedCollectionModel({
                name:name, 
                creator:address
            })
            await collection.save()
            resolve(collection)
          } catch (e) {
            console.trace(e)
            reject(e)
          }
    })
}

function updateCollection(id, address, data){
    return new Promise(async (resolve, reject) => {
        try {
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            let collection = await CuratedCollectionModel.findById(id)
            if(collection?.creator === address){
                const updatedCollection = await CuratedCollectionModel.findByIdAndUpdate(id,{...data}, {new:true})
                resolve(updatedCollection)
            }else{
                console.trace("User is not creator. Creator: " + collection?.creator + " User: " + address)
                reject("User not allowed.")
            }
          } catch (e) {
            console.trace(e)
            reject(e)
          }
    })
}
function addPostToCollection(id, address, data){
    return new Promise(async (resolve, reject) => {
        try {
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            let collection = await CuratedCollectionModel.findById(id)
            if(collection?.creator === address){
                collection.postIds.push(data)                
                await collection.save()
                resolve(collection)
            }else{
                console.trace("User is not creator. Creator: " + collection?.creator + " User: " + address)
                reject("User not allowed.")
            }
          } catch (e) {
            console.trace(e)
            reject(e)
          }
    })
}


function getCuratedCollection(id, address){
    return new Promise(async (resolve, reject) => {
        try {
            await connectMongo().catch((err) => {
                console.trace(err)
                reject(err)
            });
            let collection = await CuratedCollectionModel.findById(id)
            if(collection?.public !== true && collection?.creator !== address){
                reject("User not allowed.")
            }else{
                resolve(collection)
            }
          } catch (e) {
            console.trace(e)
            reject(e)
          }
    })}

    function getUserCollections(address){
        return new Promise(async (resolve, reject) => {
            try {
                await connectMongo().catch((err) => {
                    console.trace(err)
                    reject(err)
                });
                let collections = await CuratedCollectionModel.findBy({creator:address}).select({name:true, id:true,cover:true,likes:true, views:true})
                resolve(collections)
              } catch (e) {
                console.trace(e)
                reject(e)
              }
        })
    }

    function getUserPublicCollections(address){
        return new Promise(async (resolve, reject) => {
            try {
                await connectMongo().catch((err) => {
                    console.trace(err)
                    reject(err)
                });
                let collections = await CuratedCollectionModel.findBy({creator:address, public:true}).select({name:true, id:true,cover:true,likes:true, views:true})
                resolve(collections)
              } catch (e) {
                console.trace(e)
                reject(e)
              }
        })
    }
    function addLikeToCollection(id){
        return new Promise(async (resolve, reject) => {
            try {
                await connectMongo().catch((err) => {
                    console.trace(err)
                    reject(err)
                });
                let collection = await CuratedCollectionModel.findById(id)
                collection.likes += 1
                await collection.save()
                resolve(collection)
              } catch (e) {
                console.trace(e)
                reject(e)
              }
        })
    }    function addViewToCollection(id){
        return new Promise(async (resolve, reject) => {
            try {
                await connectMongo().catch((err) => {
                    console.trace(err)
                    reject(err)
                });
                let collection = await CuratedCollectionModel.findById(id)
                collection.views += 1
                await collection.save()
                resolve(collection)
              } catch (e) {
                console.trace(e)
                reject(e)
              }
        })
    }
export {
createCollection,
updateCollection,
getCuratedCollection,
getUserCollections,
getUserPublicCollections,
addLikeToCollection,
addViewToCollection,
addPostToCollection

}



