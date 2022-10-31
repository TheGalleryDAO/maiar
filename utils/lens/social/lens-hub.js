import {ethers} from 'ethers'
import {lensAbiContract, lensSmartContractAddress} from '../../lensSmartContractInfo'
// lens contract info can all be found on the deployed
// contract address on polygon.
// not defining here as it will bloat the code example

export function lensHub (signer){
    return new ethers.Contract(
        lensSmartContractAddress,
        lensAbiContract,
        signer,
        {
            gasPrice: '200000000'
        }
        )
} 
