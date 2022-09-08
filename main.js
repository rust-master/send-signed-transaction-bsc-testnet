const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common');
const Web3 = require('web3');
// var addresses = require("./addresses.json");

const customChainParams = { name: 'tBNB', chainId: 97, networkId: 97 }
const common = Common.default.forCustomChain('ropsten', customChainParams, 'petersburg');


var abi = [{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    
var contractAddress = "0x3B6FAF1Ed5E777dEFf9500A1e1792d7f295B89Ba";


const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const addressFrom = "0x931f3600a299fd9B24cEfB3BfF79388D19804BeA";
const privateKey = Buffer.from("0d6dcaaef49272a5411896be8ad16c01c35d6f8c18873387b71fbc734759b0ab", 'hex');

let contract = new web3.eth.Contract(abi, contractAddress, {
    from: addressFrom
});

let data = contract.methods.store(200).encodeABI();

// create transaction object

web3.eth.getTransactionCount(addressFrom, (err, txCount) => {

    const txObject = {
        from: addressFrom,
        to: contractAddress,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(10000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: data,
    }

    const tx = new Tx(txObject, { common });
    tx.sign(privateKey);

    const serealizeTransaction = tx.serialize();
    const raw = '0x' + serealizeTransaction.toString('hex');

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("txHash:", txHash);
        }
    });
});