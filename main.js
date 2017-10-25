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
    if (!header.hasClass('moveHeaderUp') || header.hasClass('.moveHeaderDown')) {
        header.removeClass('.moveHeaderDown');
        header.addClass('moveHeaderUp');
    } else {
        header.removeClass('moveHeaderUp');
        header.addClass('moveHeaderDown')
    }
}