import types from './types';
import axios from 'axios';

export function createEvent(form) {
    const request = axios.post("http://dev.michaelahn.solutions/add_events", { //change to "/add_events" when pushing
        title: form.title,
        description: form.description,
        subject: form.subject,
        date: form.date,
        time: form.time,
        duration: form.duration,
        location: form.location,
        max: form.max,
        phone: form.phone,
        email:form.email
    });

    return {
        type: types.CREATE_EVENT,
        payload: request
    }
}

export function getAll() {
    const request = axios.get("http://dev.michaelahn.solutions/events"); //change to "/events" when pushing

    return {
        type: types.GET_ALL,
        payload: request
    }
}
