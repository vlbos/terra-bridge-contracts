const Eos = require('eosjs');
const dotenv = require('dotenv');
//const axios = require('axios');
const request = require('request');
//Helpers
const CoinGecko = require('./lib/CoinGecko');
let sleep = require('sleep');
// var request = require('request'); // https://www.npmjs.com/package/request
let async = require('async'); // https://www.npmjs.com/package/async


dotenv.load();

const interval = process.env.FREQ;
const owner = process.env.ORACLE;
const oracleContract = process.env.CONTRACT;

const oraclize = "oraclebosbos";
const consumer = "consumer1234";
const oracle = "oracleoracle";

const eos = Eos({
	httpEndpoint: process.env.EOS_PROTOCOL + "://" + process.env.EOS_HOST + ":" + process.env.EOS_PORT,
	keyProvider: [process.env.EOS_KEY, '5JhNVeWb8DnMwczC54PSeGBYeQgjvW4SJhVWXMXW7o4f3xh7sYk', '5JBqSZmzhvf3wopwyAwXH5g2DuNw9xdwgnTtuWLpkWP7YLtDdhp', '5JCtWxuqPzcPUfFukj58q8TqyRJ7asGnhSYvvxi16yq3c5p6JRG', '5K79wAY8rgPwWQSRmyQa2BR8vPicieJdLCXL3cM5Db77QnsJess', "5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m", "5JN8chYis1d8EYsCdDEKXyjLT3QmpW7HYoVB13dFKenK2uwyR65", "5Kju7hDTh3uCZqpzb5VWAdCp7cA1fAiEd94zdNhU59WNaQMQQmE", "5K6ZCUpk2jn1munFdiADgKgfAqcpGMHKCoJUue65p99xKX9WWCW", "5KAyefwicvJyxDaQ1riCztiSgVKiH37VV9JdSRcrqi88qQkV2gJ"],
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

// function sleep(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms))
//   }

// function* sleep(ms) {
// 	yield new Promise(function (resolve, reject) {
// 		//console.log(new Date());
// 		setTimeout(resolve, ms);
// 	})
// }


// class Person(name){
// 	this.name=name;
// 	let f=function(){alert('My name is '+this.name)};


// 	 ff(){
// 		 //console.log("ff");
// 	 //console.log(new Date());
// 	 sleep.sleep(1);
// 	 //console.log(new Date());
// 	}
// 	// setTimeout(f,50); //错误

// 	let THIS=this;
// 	setTimeout(function(){ff.apply(THIS)},50); //正确，通用
// 	// setTimeout(function(){ff.call(THIS)},50); //正确，通用
// }
// new Person('Jack');



// function sleep(ms) {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }
function test() {
	// let temple = await sleep(1000);
	// //console.log(new Date());
	// return temple
	//console.log(new Date());
	sleep.sleep(1);
	//console.log(new Date());
}
// test();


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

// const service_id = 1;
// const update_cycle = 120;
// const duration = 30;
// const update_start_time = "2019-09-16 09:09:09";
class BridgeEosClient {
	constructor(timer_type, service_id, update_cycle, duration, update_start_time) {
		this.timer_type = timer_type;
		this.service_id = service_id;
		this.update_cycle = update_cycle;
		this.duration = duration;
		this.update_start_time = update_start_time;
	}

	pushdatax(cycle_number, data, begin, end) {
		let timer_type = this.timer_type;
		let service_id = this.service_id;

		eos.contract(oracleContract)
			.then((contract) => {
				// sleep.sleep(2);
				for (let i = begin; i <= end; i++) {
					let provider = "provider" + repeat(i, 4);
					console.log("$$$$push===",i,"Date.parse(new Date()) =", (new Date()) );
					contract.pushdata({
						service_id: this.service_id,
						provider: provider,
						cycle_number: cycle_number,
						request_id: request_id,
						data: "" + JSON.stringify(data)
					},
						{
							scope: oracleContract,
							authorization: [`${provider}@${process.env.ORACLE_PERMISSION || 'active'}`]
						})
						.then(results => {
							// //console.log("results:", results);
							console.log("$$$$push result===",i,"Date.parse(new Date()) =", (new Date()) );
						})
						.catch(error => {
							console.log("error:", error);
						});
					console.log(new Date(), "provider=", provider, "cycle_number=", cycle_number);
					console.log("timer_type=", timer_type, "service_id=", service_id);
					// sleep.sleep(2);
					// console.log(new Date());
				}

			})
			.catch(error => {
				//console.log("error:", error);
			});
	}
