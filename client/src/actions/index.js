import types from './types';
import axios from 'axios';

// http://dev.michaelahn.solutions
export function createEvent(form) {

    const request = axios.post("http://dev.michaelahn.solutions/add_events", {
        title: form.values.title,
        description: form.values.description,
        subject: form.values.subject,
        date: form.values.date,
        time: form.values.time,
        duration: form.values.duration,
        location: form.values.location,
        max: form.values.max,
        phone: form.values.phone,
        email: form.values.email,
        coordinates: form.coordinates,
        facebookID: '',
    });

    return {
        type: types.CREATE_EVENT,
        payload: request
    }
}

export function getAll() {

    const request = axios.get("http://dev.michaelahn.solutions/events");

    return {
        type: types.GET_ALL,
        payload: request
    }
}

export function userAuth() {
    const request = axios.get("http://dev.michaelahn.solutions/checkLogin");

    return {
        type: types.USER_AUTH,
        payload: request
    }
}

export function userJoin(eventInfo) {
    const request = axios.post("http://dev.michaelahn.solutions/join_events", eventInfo);

    return {
        type: types.USER_JOIN,
        payload: request
    }
}

export function allCreateEvent() {
    const request = axios.get("http://dev.michaelahn.solutions/user_events");

    return {
        type: types.USER_EVENTS,
        payload: request
    }
}

export function allJoinEvent() {
    const request = axios.get("http://dev.michaelahn.solutions/user_joined_events");

    return {
        type: types.GET_JOIN_PROFILE,
        payload: request
    }
}

export function leaveEvent(eventInfo) {
    const request = axios.post("http://dev.michaelahn.solutions/leave_event", eventInfo);

    return {
        type: types.LEAVE_EVENT,
        payload: request
    }
}

export function deleteEvent(eventInfo) {
    const request = axios.post("http://dev.michaelahn.solutions/delete_events", eventInfo);

    return {
        type: types.DELETE_EVENT,
        payload: request
    }
}
