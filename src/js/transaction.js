$(function () {
    $("#crack-cookie").click(function () {
        if (typeof (webExtensionWallet) === 'undefined') {
            crackCookie();
        } else {
            var contractDataController = new ContractDataController();
            contractDataController.sendTransaction(0, "crackCookie", "", pendingCallback, successCallback, failCallback);
        }
    });

    $("#lastfortune").click(function () {
        var contractDataController = new ContractDataController();
        if (typeof (webExtensionWallet) === 'undefined') {
            showPopup();
            $('#popup').html("You have to install NasExtWallet and use PC");
        }
        else {
            contractDataController.callSmartContract("getHistory", "", function (tx) {
                var history = JSON.parse(tx.result);
                showPopup();
                // console.log(history);
                if (history.length > 0) {
                    var lastFortune = history[history.length - 1].fortune;
                    $('#popup').html(lastFortune);
                } else {
                    $('#popup').html("There is no Fortune");
                }
            });
        }
    });
});

// function crackCookieCallback(tx) {
//     console.log('AA', tx);
// }

function pendingCallback() {
    $("#loading-wrapper").removeClass("hide");
}

async function successCallback() {
    var contractDataController = new ContractDataController();
    await contractDataController.callSmartContract("getHistory", "", function (tx) {
        var history = JSON.parse(tx.result);
        var lastFortune = history[history.length - 1].fortune;
        // console.log(tx);
        // console.log(history);
        $('#fortune-message-span').html(lastFortune);
    });
    $("#loading-wrapper").addClass("hide");
    showFortune();
}

function failCallback() {
    $("#loading-wrapper").addClass("hide");
    alert('transaction is failed!');
}

async function crackCookie() {
    var contractDataController = new ContractDataController();
    await contractDataController.callSmartContract("crackCookie", "", function (tx) {
        // var history = JSON.parse(tx.result);
        var fortune = tx.result;
        // console.log(tx.result);
        // console.log(history);
        $('#fortune-message-span').html(fortune.replace(/\"/g, ""));
    });
    // $("#loading-wrapper").addClass("hide");
    setTimeout(showFortune, 2000);
}