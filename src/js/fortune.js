$(function () {
    var tl = new TimelineMax({ yoyo: true, repeat: -1, repeatDelay: 3 });


    tl.set($('.fortune-message'),{opacity:0});
    tl.to($('.fortune'), 0.1, { rotation: -5, delay: 2 });
    tl.to($('.fortune'), 0.1, { rotation: 5 });
    tl.to($('.fortune'), 0.1, { rotation: -5 });
    tl.to($('.fortune'), 0.1, { rotation: 5 });
    tl.to($('.fortune'), 0.1, { rotation: -5 });
    tl.to($('.fortune'), 0.1, { rotation: 0 });
    //tl.addLabel("break", "+=0.3");
    //tl.to($('.fortune-left'), 0.5, { rotation: -45, x: -70, y: 70 }, "break");
    //tl.to($('.fortune-right'), 0.5, { rotation: 45, x: 70, y: 70 }, "break");

    //tl.set($('.fortune-message'),{opacity:1});
    //tl.from($('.fortune-message span'), 1, { x: '110%' }, "break");



});