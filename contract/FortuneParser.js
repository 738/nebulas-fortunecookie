var fs = require('fs');

function parseString(S) {
    let result = '';
    let rawData = JSON.parse(S);

    let fortuneArray = [];
    rawData.slice(0, 1000).forEach(value => {
        fortuneArray.push(value.message.replace(':\\', ''));
    });
    shuffle(fortuneArray);
    result += '[\"[\\\"';
    result += fortuneArray.join('\\\",\\\"');
    result += '\\\"]\"]\n\n';
    return result;
}

function createText() {
    fs.readFile('input.txt', 'utf8', function (error, data) {
        if (error) { throw error };
        console.log(parseString(data));
        fs.writeFile('output.txt', parseString(data), 'utf8', function (error, data) {
            if (error) { throw error };
            console.log("ASync Write Complete");
        });
    });
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

createText();