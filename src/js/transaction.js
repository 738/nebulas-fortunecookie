$(function () {
    var isCracked = false;
    $("#crack-cookie").click(function () {
        if (!isCracked) {
            if (typeof (webExtensionWallet) === 'undefined') {
                crackCookie();
            } else {
                var contractDataController = new ContractDataController();
                contractDataController.sendTransaction(0, "crackCookie", "", pendingCallback, successCallback, failCallback);
            }
            isCracked = true;
        }
        // if cookie is cracked, the button helps to share via twitter
        else {
            shareTwitter();
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
    $("#crack-cookie").html(`<i class="fab fa-twitter" style="margin-right: 10px"></i>Tweet This Fortune`);
    $("#crack-cookie").addClass("twitter");
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

function shareTwitter() {
    var content = "Fortune Cookie said to me \"" + $('#fortune-message-span').html() + "\"";
    var link = "https://cookie.nasd.app"
    var hashtag = "fortunecookie,nebulas,dapp"
    var popOption = "width=500, height=250, resizable=no, scrollbars=no, status=no;";
    var wp = window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(content) + "&hashtags=" + encodeURIComponent(hashtag), 'twitter', popOption);
    if (wp) {
        wp.focus();
    }
}