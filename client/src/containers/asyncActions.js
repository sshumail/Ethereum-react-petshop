import Web3 from 'web3';
import NftErc721 from '../contracts/NFTERC721.json';
import { setupWeb3, setupContract, setupEthereumAccounts } from './actions'
export const LoadBlockchain = async (dispatch) => {
    try {
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3))
            let contractABI = NftErc721.abi;
            let contractAddress = NftErc721.networks["4"].address
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            dispatch(setupContract(contract))
            console.log("contract", contract)
            console.log("contract", contract.methods)

            const accounts = await web3.eth.getAccounts();
            dispatch(setupEthereumAccounts(accounts))

        }
    }
    catch (error) {
        console.log("error", error)
    }
}

export const mintNftAsync = async (contract, accounts) => {
    try {
        let receipt = await contract.methods.mintNFT().send({ from: accounts[0] });
        return receipt;
    }
    catch (error) {
        console.log("error", error)
    }
}