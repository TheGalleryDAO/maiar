import { ethers, utils } from 'ethers';
import {rpcAddress} from '../lensSmartContractInfo'
import omitDeep from 'omit-deep';
// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together
const infuraApiKey = process.env.INFURA_API_KEY
const ethersProvider = new ethers.providers.InfuraProvider( "matic" , infuraApiKey )


function parse(data) {
  return ethers.utils.parseUnits(Math.ceil(data) + '', 'gwei');
}

export const getSigner = () => {
  const privKey = process.env.NODE_ENV === "development" ? process.env.TESTNET_WALLET_PRIVATE_KEY:process.env.WALLET_PRIVATE_KEY
  return new ethers.Wallet(privKey, ethersProvider);
};

export const getAddressFromSigner = () => {
  return getSigner().address;
};

export const signedTypeData = (
  domain,
  types,
  value
) => {
  const signer = getSigner();
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(value, '__typename')
  );
};

export const splitSignature = (signature) => {
  return utils.splitSignature(signature);
};

export const sendTx = (transaction) => {
  const signer = getSigner();
  return signer.sendTransaction(transaction);
};

export const signText = (text) => {
  return getSigner().signMessage(text);
};

export async function calcGas(gasEstimated) {
  let gas = {
      gasLimit: gasEstimated, //.mul(110).div(100)
      maxFeePerGas: ethers.BigNumber.from(50000000000),
      maxPriorityFeePerGas: ethers.BigNumber.from(50000000000)
  };

  try {
      const {data} = await axios({
          method: 'get',
          url: 'https://gasstation-mainnet.matic.network/v2'//"https://gasstation-mumbai.matic.today/v2"//
      });
      gas.maxFeePerGas = parse(data.fast.maxFee * 4);
      gas.maxPriorityFeePerGas = parse(data.fast.maxPriorityFee * 4);
  } catch (error) {

  }
  return gas;
};
