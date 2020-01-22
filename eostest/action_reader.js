const schedule = require("node-schedule");
var fs = require('fs');
var queuefun = require('queue-fun');  //引入

const EosApi = require('eosjs-api');

eosapi = EosApi({
    httpEndpoint: process.env.EOS_PROTOCOL + "://" + process.env.EOS_HOST + ":" + process.env.EOS_PORT,
    keyProvider: [process.env.EOS_KEY, '5J1G4dhajiWDQduM3WSJ26vuoaMHi1AoqFLgVpazHL2aHsMkSb1', '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3', '5JhNVeWb8DnMwczC54PSeGBYeQgjvW4SJhVWXMXW7o4f3xh7sYk', '5JBqSZmzhvf3wopwyAwXH5g2DuNw9xdwgnTtuWLpkWP7YLtDdhp', '5JCtWxuqPzcPUfFukj58q8TqyRJ7asGnhSYvvxi16yq3c5p6JRG', '5K79wAY8rgPwWQSRmyQa2BR8vPicieJdLCXL3cM5Db77QnsJess', "5K2L2my3qUKqj67KU61cSACoxgREkqGFi5nKaLGjbAbbRBYRq1m", "5JN8chYis1d8EYsCdDEKXyjLT3QmpW7HYoVB13dFKenK2uwyR65", "5Kju7hDTh3uCZqpzb5VWAdCp7cA1fAiEd94zdNhU59WNaQMQQmE", "5K6ZCUpk2jn1munFdiADgKgfAqcpGMHKCoJUue65p99xKX9WWCW", "5KAyefwicvJyxDaQ1riCztiSgVKiH37VV9JdSRcrqi88qQkV2gJ"],
    chainId: process.env.EOS_CHAIN,
    verbose: false,
    logger: {
        log: null,
        error: null
    }
});

class BridgeEosClient {
	constructor() {

    }
    
 read_action(lasttx) {
    // eosapi.getBlock(1, (error, result) => {console.log(error, result)});
    // let ret = eosapi.getInfo((error, result) => { console.log(error, result) });//history_get_actions('burn.bos');
    // console.log(eosapi);
    let ret = eosapi.getActions("burn.bos", (error, result) => { 
        console.log("====", error, result) ;
        console.log("==result==", JSON.stringify(result));
    });

}
}

function testfs()
{

fs.readFile("./data/hello.txt", function (error, data) {
    if (error) {
        console.log('读取文件失败')
    } else {
        console.log(data.toString())
    }
});

fs.writeFile('./data/写入的文件.md', '我是被nodejs写入的文件', function (error) {
    if (error) {
        console.log('写入成功')
    } else {
        console.log('写入成功')
    }
});
}

function testqueue(){

//初始化Promise异步队列类
var Queue = queuefun.Queue();
//实列化最大并发为2的运行队列
var queue1 = new Queue(2, {
    "event_succ": function (data) { console.log('queue-succ:', data) }  //成功
    , "event_err": function (err) { console.log('queue-err:', data) }  //失败
});
var q = queuefun.Q;  //模块中简单实现了Q的基本功能，可以一试，
//定义一个Promise风格的异步方法
function testfun(i) {
    var deferred = q.defer();
    // setTimeout(function () {
    //     if (i && i % 3 == 0) {
    //         deferred.reject(new Error("err " + i))
    //     } else {
            deferred.resolve(i)
    //     }
    // }, (Math.random() * 2000) >> 0)

    return deferred.promise;
}


//向队列添加运行单元
queue1.push(testfun, [1]) //添加运行项
// queue1.go(testfun, [2]) //添加并自动启动队列
// queue1.go(testfun, [3], { Queue_event: 0 }) //添加不会触发队列 回调的运行项.
// queue1.go(testfun, [4]).then(
//     function (data) { console.log('done-succ:', data) },
//     function (err) { console.log('done-err:', err) }
// )

// queue1.go(testfun, [5], {
//     event_succ: function (data) { console.log('conf-succ:', data) },
//     event_err: function (err) { console.log('conf-err:', err) }
// })

}


function reader_timer() {
    const timer_sticker = process.env.TIMER_TICKER || '* * * * * *';

    schedule.scheduleJob(timer_sticker, async () => {
        let provider = new OracleProvider(service_id, update_cycle, duration, update_start_time);
        let start_time = new Date();




    });

}



