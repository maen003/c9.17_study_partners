import types from './types';
import axios from 'axios';

// http://dev.michaelahn.solutions
export function createEvent(form) {

    const request = axios.post("http://dev.michaelahn.solutions/add_events", {
        title: form.title,
        description: form.description,
        subject: form.subject,
        date: form.date,
        time: form.time,
        duration: form.duration,
        location: form.location,
        max: form.max,
        phone: form.phone,
        email: form.email,
        coordinates: form.coordinates,
        facebookID: '',
        coordinates: form.coordinates
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

export function userEvents() {
    const request = axios.get("http://dev.michaelahn.solutions/user_events");

    return {
        type: types.USER_EVENTS,
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

export function userJoin() {
    const request = axios.post("http://dev.michaelahn.solution/join_events");

    return {
        type: types.USER_JOIN,
        payload: request
    }
}