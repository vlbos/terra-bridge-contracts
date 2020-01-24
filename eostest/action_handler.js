const ActionReader = require('./action_reader.js');

let actionReader =  ActionReader.BridgeActionReader;
console.log(actionReader);
actionReader.reader_timer();
console.log("finish");