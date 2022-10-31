import {ethers} from 'ethers'
import {    lensAbiContract, lensSmartContractAddress, feeCollectModuleAddress} from './lensSmartContractInfo'
const infuraApiKey = process.env.INFURA_API_KEY
const provider = new ethers.providers.InfuraProvider( "matic" , infuraApiKey )

const LensContract = new ethers.Contract(lensSmartContractAddress, lensAbiContract, provider);
function isNftHolder(walletAddress){
    return new Promise(async (resolve, reject) => {
        console.log("Wallet addres: " + walletAddress)
        const balanceOf = await LensContract.balanceOf(walletAddress).catch((err) => {
            console.trace(err);
            reject("Error Verifying the wallet NFTs")
        });
        const isholder = !balanceOf.isZero();
        resolve(isholder)
    })

}

function publishNFT(ipfsUri){
  return new Promise(async (resolve, reject) => {
    const inputStruct = {
      profileId: 1,
      contentURI: ipfsUri,
      collectModule: feeCollectModuleAddress,
      collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
      referenceModule: ZERO_ADDRESS,
      referenceModuleInitData: [],
    };  
  })
}

export {
    isNftHolder, 
    publishNFT
}