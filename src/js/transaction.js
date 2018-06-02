$(function () {
    $(".pulse").click(function () {
        var contractDataController = new ContractDataController();
        contractDataController.sendTransaction(0, "crackCookie", "", pendingCallback, successCallback, failCallback);
        
    });
});

function crackCookieCallback(tx) {
    console.log('AA', tx);
}

function pendingCallback() {
    $("#loading-wrapper").removeClass("hide");
}

async function successCallback() {
    var contractDataController = new ContractDataController();
    await contractDataController.callSmartContract("getHistory", "[]", function(tx) {
        var history = JSON.parse(tx.result);
        var lastFortune = history[history.length - 1].fortune;
        console.log(history);
        $('#fortune-message-span').html(lastFortune);
    });
    $("#loading-wrapper").addClass("hide");
    showFortune();
}

function failCallback() {
    $("#loading-wrapper").addClass("hide");
    alert('transaction is failed!');
}