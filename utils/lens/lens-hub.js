import { getSigner } from './ethers.service';
import {ethers} from 'ethers'
import {lensAbiContract, lensSmartContractAddress} from '../lensSmartContractInfo'
// lens contract info can all be found on the deployed
// contract address on polygon.
// not defining here as it will bloat the code example

export const lensHub = new ethers.Contract(
lensSmartContractAddress,
lensAbiContract,
getSigner(),
{
    gasPrice: '200000000'
}
)
