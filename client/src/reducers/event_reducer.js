import types from '../actions/types';

const DEFAULT_STATE = {all: []};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_ALL:
            return {
                all: action.payload.data
            };
        case types.USER_EVENTS:
            return {
                all: action.payload.data
            };
        case types.GET_JOIN_PROFILE:
            console.log('user joined events REDUCER: ', action.payload);
            return {
                all: action.payload.data
            };
        case types.DELETE_EVENT:
            return {
                all: action.payload.data
            };
        case types.USER_JOIN:
            console.log('USER JOINING AN EVENT REDUCER: ', action.payload);
        default:
            return state;
    }
}
