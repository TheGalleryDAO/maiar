import { signedTypeData, getAddressFromSigner, splitSignature, calcGas} from './ethers.service';
import { createFollowTypedData } from './create-follow-typed-data';
import { lensHub } from './lens-hub';
import  {login} from './login'
import { pollUntilIndexed } from './hasTransactionBeenIndexed';

export function follow(followRequest){
    return new Promise(async (resolve, reject) => {
        try{
            const creatorAddress = getAddressFromSigner();
            await login(creatorAddress).catch((err) => {
              console.trace(err)
              reject("Lens API Login failed")
            });

            const result = await createFollowTypedData(followRequest).catch((err) => {
                console.trace(err);
                reject("EROR")
              });
            const typedData = result.data.createFollowTypedData.typedData;
            
            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value).catch((err) => {
                console.trace(err);
                reject("EROR")
              });
            const { v, r, s } = splitSignature(signature);
            const txData = {
              follower: getAddressFromSigner(),
              profileIds: typedData.value.profileIds,
              datas: typedData.value.datas,
              sig: {
                v,
                r,
                s,
                deadline: typedData.value.deadline,
              },
            }
            const estimatedGasfee = await lensHub.estimateGas.postWithSig(txData).catch((err) => {
                console.trace(err);
              })
    
            const gasFee = await calcGas(estimatedGasfee).catch((err) => {
                console.trace(err);
              }) 
            const tx = await lensHub.followWithSig(txData, gasFee).catch((err) => {
                console.trace(err);
                reject("EROR")
              });
            console.log("TX HASH: " + tx.hash);
            console.log('create post: poll until indexed');
            const indexedResult = await pollUntilIndexed(tx.hash).catch((err) => {
                console.trace(err);
                reject("EROR")
              });
            resolve(tx.hash)
        }catch(err){
            console.trace(err)
            reject(err)
        }
    })
}
