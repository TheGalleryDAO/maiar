import { signedTypeData, getAddressFromSigner, splitSignature,calcGas } from './ethers.service';
import { createPostTypedData } from './create-post-typed-data';
import { lensHub } from './lens-hub';
import  {login} from './login'
import { pollUntilIndexed } from './hasTransactionBeenIndexed';


 export default function createPost(ipfsHash){ 
     return new Promise(async (resolve, reject) => {
        try{
          const creatorAddress = getAddressFromSigner();
            await login(creatorAddress).catch((err) => {
              console.trace(err)
              reject("Lens API Login failed")
            });

            const createPostRequest = {
              profileId: process.env.LENS_USER_ID,
              contentURI: `ipfs://${ipfsHash}`,
              collectModule: {
                feeCollectModule: {
                  followerOnly:false,
                  amount: {
                    currency: "" + process.env.MATIC_ADDRESS,
                    value: '2',
                  },
                  recipient: creatorAddress,
                  referralFee: 10.5,
                },
              },
              referenceModule: {
                  followerOnlyReferenceModule: false
              }
            };
            console.log(createPostRequest.contentURI)
            const result = await createPostTypedData(createPostRequest).catch((err) => {
              console.log("createPostTypedData fails")
              console.trace(err)
              reject(err)
            });
            const typedData = result.data.createPostTypedData.typedData;

            


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
            console.log('create post: poll until indexed');
            const indexedResult = await pollUntilIndexed(tx.hash);
          
            console.log('create post: profile has been indexed', result);
          
            const logs = indexedResult.txReceipt.logs;
          
            console.log('create post: logs', logs);
          
          
            resolve(result.data);
              }catch(err){
                  console.trace(err)
                  reject("Post Fail")
              }
     })

}
