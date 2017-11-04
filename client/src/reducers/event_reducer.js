import types from '../actions/types';

const DEFAULT_STATE = {all: []};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_ALL:
            console.log(action.payload);
            return {
                all: action.payload
            };
        default:
            return state;
    }
}