const yargs = require('yargs');
var provider, address;
require('dotenv').config();
//const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
//var privKeyRopsten = "5da28899b6f5621f34ca8ab5b89c7fe23f8ee43c6f761339fafc57d4091b6167"; // private keys
var privKeyRopsten = process.env.privKeyRopsten;
//const provider = new HDWalletProvider(privKeys, "http://localhost:8545");
const PrivateKeyProvider = require("truffle-privatekey-provider");
// Not using remote node until secure way to store seed/private key is established.
//
// if (yargs.argv.network  == 'ropsten' || yargs.argv.network  == 'mainnet') {
//   var providerURL = 'http://localhost:8545';
//   // var providerURL = `https://${yargs.argv.network}.infura.io`
//   var HDWalletProvider = require("truffle-privatekey-provider");
//   // todo: Think about more secure way
//   var mnemonic = yargs.argv.mnemonic;
//   provider = new HDWalletProvider(mnemonic, providerURL, 0);
//   // address = "0x" + provider.wallet.getAddress().toString("hex");
//   // console.log('Provider address', provider.getAddress());
//   console.log('Deploying to ', providerURL);
// }
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 6712388,
      // gasPrice: 2000000000, // 1 gwei
      network_id: "*"
    },
    test: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gasPrice: 0x01
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    },
    rinkeby: {
      host: "localhost",
      network_id: 4,
      port: 8545,
      gasPrice: 50000000000 // 50 gwei,
    },
    ropsten: {
      //provider: () => new HDWalletProvider(privKeyRopsten, "https://ropsten.infura.io/" + process.env.INFURA_API_KEY),
      provider: () => new PrivateKeyProvider(privKeyRopsten, "https://ropsten.infura.io/" + process.env.INFURA_API_KEY),
      network_id: 3,
      gas: 3000000,
      gasPrice: 21,
      // from: "0x435cc9FA2F6F15019c7c5E9680f0aa542be4bC28"
    },
    mainnet: {
      // gas: 5000000,
      host: "localhost",
      gasPrice: 1000000000, // 1 gwei
      port: 8545,
      // provider:provider,
      // from: "0x4b3A4F3F42BA61141A4F7101F77dC141AE15c59A",
      from: "0x4b3a4f3f42ba61141a4f7101f77dc141ae15c59a",
      network_id: 1
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      gasPrice: 1
    }
  }
};


