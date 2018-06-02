var Stubs = require("./contractStubs");
let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;
let TestMap = Stubs.TestMap;

class User {
    constructor(str) {
        let obj = str ? JSON.parse(str) : {};
        this.address = obj.address || '';
        this.history = obj.history || [];
    }

    toString() {
        return JSON.stringify(this);
    }
}
// testnet
var ownerAddress = "n1VWG9TEQwMzfDtb9eFULDk9XwSZuzTfVST";
class CookieManager {
    constructor() {
        LocalContractStorage.defineProperty(this, "fortuneCount");
        LocalContractStorage.defineMapProperty(this, "fortunes");
        LocalContractStorage.defineMapProperty(this, "users", {
            parse: function (str) {
                return new User(str);
            },
            stringify: function (obj) {
                return obj.toString();
            }
        });
    }

    init() {
        this.fortuneCount = 0;
    }

    save(fortunes) {
        if (Blockchain.transaction.from !== ownerAddress) throw new Error('You are not owner');
        var fortunesParsed = JSON.parse(fortunes);
        for (var i = 0; i < fortunesParsed.length; i++) {
            this.fortunes.set(this.fortuneCount, fortunesParsed[i]);
            this.fortuneCount++;
        }
        return `${fortunesParsed.length}개가 추가되었습니다.`;
    }

    crackCookie() {
        var userAddress = Blockchain.transaction.from;
        var fortune = this.fortunes.get(this._hash(userAddress));
        var timestamp = new Date();
        var user = this.users.get(userAddress) || new User();
        user.history.push({
            fortune,
            timestamp
        });
        this.users.set(userAddress, user);
        return fortune;
    }

    getHistory(address) {
        if (address === undefined) address = Blockchain.transaction.from;
        var user = this.users.get(address);
        return user.history;
    }

    _hash(address) {
        if (this.fortuneCount === 0) throw new Error('fortuneCount = 0');
        var num = address[2].charCodeAt() + address[4].charCodeAt() + address[6].charCodeAt() + address[8].charCodeAt() + address[10].charCodeAt();
        return (num + Blockchain.block.height) % (this.fortuneCount);
    }
}

module.exports = CookieManager;
