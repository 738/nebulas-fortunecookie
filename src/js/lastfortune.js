function showPopup() {
    $('#popup').addClass('popup-show');
    setTimeout(function () {
        $('#popup').removeClass('popup-show');
    }, 3000);
}