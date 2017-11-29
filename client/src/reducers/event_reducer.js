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
            return {
                all: action.payload.data
            };
        case types.USER_JOIN:
            console.log(action.payload);
        default:
            return state;
    }
}
