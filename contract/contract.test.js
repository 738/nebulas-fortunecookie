var Stubs = require('./contractStubs');
var CookieManager = require('./contract');

let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;

Blockchain.changeTransactionAfterGet = false;

let contract = new CookieManager();
contract.init();

console.log(contract.save("[\"1\", \"2\", \"3\", \"4\", \"5\"]"));
console.log(contract.crackCookie());
console.log(contract.crackCookie());
console.log(contract.crackCookie());
console.log(contract.crackCookie());
console.log(contract.crackCookie());
console.log(contract.crackCookie());
console.log(contract.getHistory());