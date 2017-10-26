$(document).ready(initializeApp);

var arrEvent = [];
// var event = {
//     title: ,
//     description: '',
//     subject: '',
//     date: '',
//     time: '',
//     duration: '',
//     location: '(lat and long)',
//     maxPeople: '#',
//     creatorPhone: '(###-###-####)',
//     creatorEmail: '...@gmail.com'
// }

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
    $('.submitForm').click(submitData);
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

function submitData() {
    var event = {};
    event.title = $('.title').val();
    event.description = $('.description').val();
    event.subject = $('.subjects').val();
    event.date = $('.dateEvent').val();
    event.time = $('.time').val();
    event.duration = $('.duration').val();
    event.location = $('.location').val();
    event.groupSize = $('.size').val();
    event.creatorPhone = $('.phone').val();
    event.creatorEmail = $('.email').val();
    console.log(event);

    arrEvent.push(event);
    console.log(arrEvent);

    clearForm();
}

function clearForm() {
    $('.title').val('');
    $('.description').val('');
    $('.subjects').val('');
    $('.dateEvent').val('');
    $('.time').val('');
    $('.duration').val('');
    $('.location').val('');
    $('.size').val('');
    $('.phone').val('');
    $('.email').val('');
}