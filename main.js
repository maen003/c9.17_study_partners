$(document).ready(initializeApp);
/***************************************************************************************************
* initializeApp
* @params: {undefined}
* @returns: {undefined}
* initializes the application and loads click handlers
*/
function initializeApp() {
    clickHandler();
}

function clickHandler() {
    $('.join > h1').click(joinEvent);
    $('.create > h1').click(createEvent);
}

function joinEvent() {
    var header = $('.joinHeader');
    var findEvent = $('.findEvent');
    if (!header.hasClass('moveHeaderUp') || header.hasClass('moveHeaderDown')) {
        header.removeClass('moveHeaderDown');
        header.addClass('moveHeaderUp');

        findEvent.addClass('animateExpandFind');
        findEvent.removeClass('animateCloseFind');
    } else {
        header.removeClass('moveHeaderUp');
        header.addClass('moveHeaderDown')

        findEvent.removeClass('animateExpandFind');
        findEvent.addClass('animateCloseFind');
    }
}

function createEvent() {
    var header = $('.createHeader');
    var createEvent = $('.createEvent');
    if (!header.hasClass('moveHeaderUp') || header.hasClass('moveHeaderDown')) {
        header.removeClass('moveHeaderDown');
        header.addClass('moveHeaderUp');

        createEvent.addClass('animateExpandCreate');
        createEvent.removeClass('animateCloseCreate');
    } else {
        header.removeClass('moveHeaderUp');
        header.addClass('moveHeaderDown')

        createEvent.removeClass('animateExpandCreate');
        createEvent.addClass('animateCloseCreate');
    }
}