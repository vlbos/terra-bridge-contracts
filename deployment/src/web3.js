require('dotenv').config({
  path: __dirname + '/../.env'
});
const Web3Utils = require('web3-utils');

const HOME_RPC_URL = process.env.HOME_RPC_URL;
const FOREIGN_RPC_URL = process.env.FOREIGN_RPC_URL;
const Web3 = require('web3');
const homeProvider = new Web3.providers.HttpProvider(HOME_RPC_URL);
const web3Home = new Web3(homeProvider);

const foreignProvider = new Web3.providers.HttpProvider(FOREIGN_RPC_URL);
const web3Foreign = new Web3(foreignProvider);

const GAS_PRICE = Web3Utils.toWei(String(process.env.DEPLOYMENT_GAS_PRICE), 'gwei');
const GAS_LIMIT = process.env.DEPLOYMENT_GAS_LIMIT;
const GET_RECEIPT_INTERVAL_IN_MILLISECONDS = process.env.GET_RECEIPT_INTERVAL_IN_MILLISECONDS;

const DEPLOYMENT_ACCOUNT_ADDRESS = process.env.DEPLOYMENT_ACCOUNT_ADDRESS;
const DEPLOYMENT_ACCOUNT_PRIVATE_KEY= process.env.DEPLOYMENT_ACCOUNT_PRIVATE_KEY;
const deploymentPrivateKey = Buffer.from(DEPLOYMENT_ACCOUNT_PRIVATE_KEY, 'hex')

const PROXY_ADMIN_ADDRESS_SLOT = '0x10d6a54a4754c8869d6886b5f5d7fbfa5b4522237ea5c60d11bc4e7a1ff9390b'


module.exports = {
  web3Home,
  web3Foreign,
  deploymentPrivateKey,
  HOME_RPC_URL,
  FOREIGN_RPC_URL,
  GAS_LIMIT,
  GAS_PRICE,
  GET_RECEIPT_INTERVAL_IN_MILLISECONDS,
  PROXY_ADMIN_ADDRESS_SLOT,
}
