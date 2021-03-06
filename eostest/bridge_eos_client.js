const Eos = require('eosjs');
const dotenv = require('dotenv');
//const axios = require('axios');
const request = require('request');
let sleep = require('sleep');
// var request = require('request'); // https://www.npmjs.com/package/request
let async = require('async'); // https://www.npmjs.com/package/async

dotenv.load();

const ecc = require('eosjs-ecc')



const interval = process.env.FREQ;
const owner = process.env.ORACLE;
const oracleContract = process.env.CONTRACT;

const oraclize = "oraclebosbos";
const consumer = "consumer1111";
const provider = "provider1111";
const provider5 = "provider5555";
const oracle = "oracleoracle";
const txhashtest = "012";

const eos = Eos({
	httpEndpoint: process.env.EOS_PROTOCOL + "://" + process.env.EOS_HOST + ":" + process.env.EOS_PORT,
	keyProvider: [process.env.EOS_KEY, '5J1G4dhajiWDQduM3WSJ26vuoaMHi1AoqFLgVpazHL2aHsMkSb1', '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3', '5JhNVeWb8DnMwczC54PSeGBYeQgjvW4SJhVWXMXW7o4f3xh7sYk', '5JBqSZmzhvf3wopwyAwXH5g2DuNw9xdwgnTtuWLpkWP7YLtDdhp', '5JCtWxuqPzcPUfFukj58q8TqyRJ7asGnhSYvvxi16yq3c5p6JRG', '5K79wAY8rgPwWQSRmyQa2BR8vPicieJdLCXL3cM5Db77QnsJess', "5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m", "5JN8chYis1d8EYsCdDEKXyjLT3QmpW7HYoVB13dFKenK2uwyR65", "5Kju7hDTh3uCZqpzb5VWAdCp7cA1fAiEd94zdNhU59WNaQMQQmE", "5K6ZCUpk2jn1munFdiADgKgfAqcpGMHKCoJUue65p99xKX9WWCW", "5KAyefwicvJyxDaQ1riCztiSgVKiH37VV9JdSRcrqi88qQkV2gJ"],
	chainId: process.env.EOS_CHAIN,
	verbose: false,
	logger: {
		log: null,
		error: null
	}
});




const require_permissions = ({ account, key, actor, parent }) => {
	return {
		account: `${account}`,
		permission: "active",
		parent: `${parent}`,
		auth: {
			threshold: 1,
			keys: [
				{
					key: `${key}`,
					weight: 1
				}
			],
			accounts: [
				{
					permission: {
						actor: `${actor}`,
						permission: "eosio.code"
					},
					weight: 1
				}
			],
			waits: []
		}
	};
};

const allowContract = (auth, key, contract, parent) => {
	let [account, permission] = auth.split("@");
	permission = permission || "active";
	parent = parent || "owner";

	const tx_data = {
		actions: [
			{
				account: "eosio",
				name: "updateauth",
				authorization: [
					{
						actor: account,
						permission: permission
					}
				],
				data: require_permissions({
					account: account,
					key: key,
					actor: contract,
					parent: parent
				})
			}
		]
	};

	return tx_data;
};

// const pub = "EOS89PeKPVQG3f48KCX2NEg6HDW7YcoSracQMRpy46da74yi3fTLP";
// eos.transaction(allowContract(consumer, pub, consumer));
//   await oraclizeContract.setup(oraclizeAccount, oracle, masterAccount, {
// 	authorization: [oraclizeAccount]
//   });



function find_from_array(arr) {
	let newArr = arr.filter(function (p) {
		return p.name === "United States";
	});

	return newArr;
}

function repeat(str, n) {
	return new Array(n + 1).join(str);
}

function current_time() {
	return Date.parse(new Date()) / 1000;
}

function to_timestamp(time) {
	return Date.parse(new Date(time)) / 1000;
}

const request_id = 0;



function transferfrom_sig(contract) {

	// std::string token;
	// name recipient;
	// uint64_t amount;
	// checksum256 txHash;

	const message = {
		token: "eosio.token:BOS:4",
		recipient: "consumer2222",
		amount: 10000,
		txhash: ecc.sha256(txhashtest)
	};
	const messageBinary = contract.fc.toBuffer("message_data", message);
	//  let a = ecc.sha256(JSON.stringify("Hello)); 
	//  ecc.sha256(Buffer.from(a, 'hex'))
	let pvts = ["5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m", "5JN8chYis1d8EYsCdDEKXyjLT3QmpW7HYoVB13dFKenK2uwyR65", "5Kju7hDTh3uCZqpzb5VWAdCp7cA1fAiEd94zdNhU59WNaQMQQmE", "5K6ZCUpk2jn1munFdiADgKgfAqcpGMHKCoJUue65p99xKX9WWCW", "5KAyefwicvJyxDaQ1riCztiSgVKiH37VV9JdSRcrqi88qQkV2gJ"];

	const wif = '5J5twkfSgL3SgWNKDsD5bjvevdmbXD5faBGcybJVAmYjCJXvpbJ'
	let sigs = [];
	for (let j = 0; j < 5; j++) {
		sigs.push(ecc.sign(messageBinary, pvts[j]));// String.fromCharCode(str1.charCodeAt()+i)
	}
	let pks = ["EOS6U2CbfrXa9hdKauZJxxbmoXACZ4MmAWHKaQPzCk5UiBmVhZRTJ", "EOS7qsja8UCa1ExokEb5wxCwBmJWi9aW1intH1sihNNHKoAGD6J7X", "EOS7yghCVnJHEu3TEB2nnSv1mgS5Rx8ofDyQK7C4dgbUWZCP1TtD1", "EOS6jmPJZAPAB7hBwYxwfKiwVuqSrkSyRy2E4mjTmQ2CyYas4ESuv", "EOS8hvj4KPjjGvfRfJsGEEbVvCXvAiGQ7GW345MH1r122g8Ap7xw3"];

	return { sigs: sigs, message: messageBinary ,pks:pks};
	// const sig = ecc.sign(message, wif)

	// console.log('Public Key:', ecc.privateToPublic(wif)) // EOS68vRVaNgCvStaUmxQsKoHANU1Uypo4BQLWSNEM8KBiCAWW8deh

	// console.log('Signature:', sig) // SIG_K1_KcB1jGNsjYEE7Gby6X7KZ9z6BFVfHPey6DUayYtDagXsbzr4Tbfpq5TS2JvYzs3oMg9QGAugTyGXoTVe7DujeXpDX5KYfJ
}


function test_sig(contract) {

	// std::string token;
	// name recipient;
	// uint64_t amount;
	// checksum256 txHash;

	const message = {
		token: "eosio.token:BOS:4",
		recipient: "consumer2222",
		amount: 10000,
		txhash: ecc.sha256("11")
	};
	const messageBinary = contract.fc.toBuffer("message_data", message);

	//  let a = ecc.sha256(JSON.stringify("Hello)); 
	//  ecc.sha256(Buffer.from(a, 'hex'))
	let pvts = ["5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m", "5JN8chYis1d8EYsCdDEKXyjLT3QmpW7HYoVB13dFKenK2uwyR65", "5Kju7hDTh3uCZqpzb5VWAdCp7cA1fAiEd94zdNhU59WNaQMQQmE", "5K6ZCUpk2jn1munFdiADgKgfAqcpGMHKCoJUue65p99xKX9WWCW", "5KAyefwicvJyxDaQ1riCztiSgVKiH37VV9JdSRcrqi88qQkV2gJ"];

	const wif = '5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m'
	// let sigs =[];
	// 					for(let j=0;j<5;j++)
	// 					{
	// 						sigs.push(ecc.sign(messageBinary, pvts[j]));// String.fromCharCode(str1.charCodeAt()+i)
	// 					}
	// 					return {sigs:sigs,message:messageBinary};
	const sig = ecc.sign(messageBinary, wif)
	const pk = ecc.privateToPublic(wif);
	// console.log('Public Key:', pk) // EOS68vRVaNgCvStaUmxQsKoHANU1Uypo4BQLWSNEM8KBiCAWW8deh

	// console.log('Signature:', sig) // SIG_K1_KcB1jGNsjYEE7Gby6X7KZ9z6BFVfHPey6DUayYtDagXsbzr4Tbfpq5TS2JvYzs3oMg9QGAugTyGXoTVe7DujeXpDX5KYfJ

	return { pk: pk, sig: sig, message: messageBinary };
}



// const service_id = 1;
// const update_cycle = 120;
// const duration = 30;
// const update_start_time = "2019-09-16 09:09:09";
class BridgeEosClient {
	constructor() {

	}

	test() {
		eos.contract(oracleContract)
			.then((contract) => {
				let obj = test_sig(contract);
				console.log(obj);
				console.log(obj.sig);
				console.log({
					sender: consumer,
					sender_key: obj.pk,
					sig: obj.sig,
					message: obj.message
				})
				contract.test({
					sender: consumer,
					sender_key: obj.pk,
					sig: obj.sig,
					message: obj.message
				},
					{
						scope: oracleContract,
						authorization: [`${consumer}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}


	setparameter() {
		console.log("results:", "results");
		eos.contract(oracleContract)
			.then((contract) => {
				contract.setparameter({
					version: 1,
					core_symbol: "BOS",
					precision: 4,
					foreign: { validatorContractAddress: "burn.bos", gasPrice: 100, requiredBlockConfirmations: 1, minPerTx: 1, maxPerTx: 100000, dailyLimit: 1000000 },
					home: { validatorContractAddress: "burn.bos", gasPrice: 100, requiredBlockConfirmations: 1, minPerTx: 1, maxPerTx: 100000, dailyLimit: 1000000 }
				},
					{
						scope: oracleContract,
						authorization: [`${oracleContract}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});


			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	setTokenParameter(tokenpara) {
		console.log("results:", "results");
		eos.contract(oracleContract)
			.then((contract) => {
				contract.settokenpara(tokenpara,
					{
						scope: oracleContract,
						authorization: [`${provider}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});


			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	impvalidator() {
		eos.contract(oracleContract)
			.then((contract) => {
				// sleep.sleep(2);
				// var str1 = 'a';
				// let i = 1;
				let pks = ["EOS6U2CbfrXa9hdKauZJxxbmoXACZ4MmAWHKaQPzCk5UiBmVhZRTJ", "EOS7qsja8UCa1ExokEb5wxCwBmJWi9aW1intH1sihNNHKoAGD6J7X", "EOS7yghCVnJHEu3TEB2nnSv1mgS5Rx8ofDyQK7C4dgbUWZCP1TtD1", "EOS6jmPJZAPAB7hBwYxwfKiwVuqSrkSyRy2E4mjTmQ2CyYas4ESuv", "EOS8hvj4KPjjGvfRfJsGEEbVvCXvAiGQ7GW345MH1r122g8Ap7xw3"];
				let providers = [];
				for (let j = 0; j < pks.length; j++) {
					let n = "provider" + repeat(j + 1, 4);
					let k = pks[j];
					let o = { "first": n, "second": k };
					providers.push(o);// String.fromCharCode(str1.charCodeAt()+i)
				}
				console.log(providers);
				contract.impvalidator({
					requiredSignatures: 5,
					initialValidators: providers,
					owner: "burn.bos"
				},
					{
						scope: oracleContract,
						authorization: [`${oracleContract}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	transferNativeToHome() {

		const pub = "EOS5NkC58kuahypYnbyYXEZvwau1KbD1rmRDJD2R61CzKaznnWH3y";
		eos.transaction(allowContract(consumer, pub, oracleContract));

		eos.contract(oracleContract)
			.then((contract) => {
				contract.transfern2h({
					sender: consumer,
					recipient: "consumer2222",
					value: 10000
				},
					{
						scope: oracleContract,
						authorization: [`${consumer}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	transferTokenToHome() {
		const pub = "EOS5NkC58kuahypYnbyYXEZvwau1KbD1rmRDJD2R61CzKaznnWH3y";
		eos.transaction(allowContract(consumer, pub, oracleContract));
		eos.contract(oracleContract)
			.then((contract) => {
				contract.transfert2h({
					sender: consumer,
					token: "eosio.token:ETHT:4",
					recipient: "consumer2222",
					value: 10000
				},
					{
						scope: oracleContract,
						authorization: [`${consumer}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}


	transferFromHome() {
		eos.contract(oracleContract)
			.then((contract) => {
				let obj = transferfrom_sig(contract);
				contract.transferfrom({
					sender: consumer,
					sig: obj.sigs,
					message: obj.message
				},
					{
						scope: oracleContract,
						authorization: [`${consumer}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}
	////hometoken

	registerToken(actiondata) {
		eos.contract(oracleContract)
			.then((contract) => {
				contract.regtoken(actiondata,
					{
						scope: oracleContract,
						authorization: [`${provider}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	transferNativeToForeign() {
		eos.contract(oracleContract)
			.then((contract) => {
				contract.transfern2f({
					sender: consumer,
					recipient: "consumer2222",
					value: 10000
				},
					{
						scope: oracleContract,
						authorization: [`${consumer}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	transferTokenToForeign() {
		const pub = "EOS5NkC58kuahypYnbyYXEZvwau1KbD1rmRDJD2R61CzKaznnWH3y";
		eos.transaction(allowContract(consumer, pub, oracleContract));
		
		eos.contract(oracleContract)
			.then((contract) => {
				contract.transfert2f({
					sender: consumer,
					token: "eosio.token:ETHT:4",
					recipient: "consumer2222",
					value: 10000
				},
					{
						scope: oracleContract,
						authorization: [`${consumer}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	transferFromForeign() {
		eos.contract(oracleContract)
			.then((contract) => {
				for (let j = 0; j <5; j++) {
					let provider = ("provider" + repeat(j+1, 4));// String.fromCharCode(str1.charCodeAt()+i)
				
				contract.transferfrof({
					sender: provider,
					foreignToken: "BOST",
					recipient: "consumer2222",
					value: 10000,
					transactionHash: ecc.sha256(txhashtest)
				},
					{
						scope: oracleContract,
						authorization: [`${provider}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
					sleep.sleep(1);
				}
			})
			.catch(error => {
				console.log("error:", error);
			});
	}

	submitSignature() {
		eos.contract(oracleContract)
			.then((contract) => {
				for (let j = 0; j <5; j++) {
					let provider = ("provider" + repeat(j+1, 4));// String.fromCharCode(str1.charCodeAt()+i)
				
				let obj = transferfrom_sig(contract);
				contract.submitsig({
					sender: provider,
					sender_key: obj.pks[j],
					sig: obj.sigs[j],
					message: obj.message
				},
					{
						scope: oracleContract,
						authorization: [`${provider}@${process.env.ORACLE_PERMISSION || 'active'}`]
					})
					.then(results => {
						console.log("results:", results);
					})
					.catch(error => {
						console.log("error:", error);
					});
					sleep.sleep(1);
				}
			})
			.catch(error => {
				console.log("error:", error);
			});

		
	}

}


var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);

//////////////////////////
// print process.argv
process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});

switch (arguments[0]) {
	case "p":
			new BridgeEosClient().setparameter();
			break;
	case "tp":
		new BridgeEosClient().setTokenParameter({
			sender: provider,
			ishome:0,
			token: "eosio.token:ETHT:4",
			minPerTx: 1, 
			maxPerTx: 100000, 
			dailyLimit: 1000000 
			});
		new BridgeEosClient().setTokenParameter({
				sender: provider,
				ishome:1,
				token: "eosio.token:ETHT:4",
				minPerTx: 1, 
				maxPerTx: 100000, 
				dailyLimit: 1000000 
				});
		break;
	case "i":
		new BridgeEosClient().impvalidator();
		break;
	case "n":
		new BridgeEosClient().transferNativeToHome();
		break;
	case "h":
		new BridgeEosClient().transferTokenToHome();
		break;
	case "f":
		new BridgeEosClient().transferFromHome();
		break;
	case "r":
		new BridgeEosClient().registerToken({
			sender: provider,
			foreignAddress: "ETH",
			homeAddress: "eosio.token:ETHT:4"
		});
		new BridgeEosClient().registerToken({
			sender: provider,
			foreignAddress: "BOST",
			homeAddress: "eosio.token:BOS:4"
		});
		break;
	case "nf":
		new BridgeEosClient().transferNativeToForeign();
		break;
	case "tf":
		new BridgeEosClient().transferTokenToForeign();
		break;
	case "ff":
		new BridgeEosClient().transferFromForeign();
		break;
	case "s":
		new BridgeEosClient().submitSignature();
		break;
	default:
		new BridgeEosClient().test();
		console.log("test option");
}

