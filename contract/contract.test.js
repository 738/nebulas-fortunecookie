var Stubs = require('./contractStubs');
var CookieManager = require('./contract');

let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;

Blockchain.changeTransactionAfterGet = false;

let contract = new CookieManager();
contract.init();

console.log(contract.save("[\"a\", \"b\", \"c\", \"d\", \"e\"]"));
console.log(contract.crackCookie());
console.log(contract.crackCookie());
console.log(contract.crackCookie());
console.log(contract.getHistory('n1VWG9TEQwMzfDtb9eFULDk9XwSZuzTfVST'));