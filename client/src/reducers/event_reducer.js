import types from '../actions/types';

const DEFAULT_STATE = {all: [], userCreatedEvents: [], userJoinedEvents: [], };

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_ALL:
            return {
                ...state,
                all: action.payload.data
            };
        case types.USER_CREATED_EVENTS:
            return {
                ...state, 
                userCreatedEvents: action.payload.data
            };
        case types.USER_JOINED_EVENTS:
            return {
                ...state,
                userJoinedEvents: action.payload.data
            };
        case types.DELETE_EVENT:
            return state;
        default:
            return state;
    }
}
