import { signedTypeData, getAddressFromSigner, splitSignature,calcGas } from './ethers.service';
import { createPostTypedData } from './create-post-typed-data';
import { lensHub } from './lens-hub';
import  {login} from './login'
import { pollUntilIndexed } from './hasTransactionBeenIndexed';
import {getPublication} from './getPublication'

  function createPost(ipfsHash){ 
     return new Promise(async (resolve, reject) => {
        try{
          const creatorAddress = getAddressFromSigner();
            await login(creatorAddress).catch((err) => {
              console.trace(err)
              reject("Lens API Login failed")
            });



            


            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
            const { v, r, s } = splitSignature(signature);
            const txData = {
              profileId: typedData.value.profileId,
              contentURI:typedData.value.contentURI,
              collectModule: typedData.value.collectModule,
              collectModuleInitData: typedData.value.collectModuleInitData,
              referenceModule: typedData.value.referenceModule,
              referenceModuleInitData: typedData.value.referenceModuleInitData,
              sig: {
                v,
                r,
                s,
                deadline: typedData.value.deadline,
              },
            }
            const estimatedGasfee = await lensHub.estimateGas.postWithSig(txData).catch((err) => {
              console.trace(err);
              reject("EROR")
            })

            const gasFee = await calcGas(estimatedGasfee)            
            const tx = await lensHub.postWithSig(txData, gasFee).catch((err) => {
              console.trace(err)
              reject("Post failed")
            });
            console.log("TX HASH: " + tx.hash);
          
            resolve(tx);
              }catch(err){
                  console.trace(err)
                  reject("Post Fail")
              }
     })

}

function indexPost(tx){
  const indexedResult = await pollUntilIndexed(tx.hash);
  let result = {
    txHash:tx.hash,
    postId:null
  }
  if(indexedResult.indexed){
    const postId = await getPublication(tx.hash);
    if(postId){
      result.postId = postId
    }
  }
}


export {
  indexPost,
  createPost
} 

