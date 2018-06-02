var Stubs = require("./contractStubs");
let LocalContractStorage = Stubs.LocalContractStorage;
let Blockchain = Stubs.Blockchain;
let TestMap = Stubs.TestMap;

class Fortune {
    constructor(str) {
        let obj = str ? JSON.parse(str) : {};
        this.id = obj.id || 0;
        this.korean = obj.korean || '';
        this.chinese = obj.chinese || '';
        this.english = obj.english || '';
    }

    toString() {
        return JSON.stringify(this);
    }
}

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

class CookieManager {
    constructor() {
        LocalContractStorage.defineProperty(this, "fortuneCount");
        LocalContractStorage.defineMapProperty(this, "fortunes", {
            parse: function (str) {
                return new Fortune(str);
            },
            stringify: function (obj) {
                return obj.toString();
            }
        });
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
        this.FortuneCount = 0;
    }

    save(fortunes) {

    }

    crackFortuneCookie(language) {
        if (language !== 'ko' && language !== 'zh' && language !== 'en') throw new Error('not supported language');
        var userAddress = Blockchain.transaction.from;
        var fortune = this.fortunes.get(Math.floor(Math.random() * this.FortuneCount));
        var timestamp = new Date();
        var user = this.users.get(userAddress);
        user.history.push({
            fortune,
            timestamp
        });
        this.users.set(userAddress, user);
        return this.fortunes.get(Math.floor(Math.random() * this.FortuneCount));
    }

    getHistory(address) {
        if (address === undefined) address = Blockchain.transaction.from;
        var user = this.users.get(address);
        return user.history;
    }
}

module.exports = CookieManager;
