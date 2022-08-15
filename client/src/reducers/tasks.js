import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                tasks: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                tasks: action.payload
            };
        case CREATE:
            return { ...state, tasks:[ ...state.tasks, action.payload]};
        case UPDATE:
            return state.map((task) => (task._id === action.payload._id ? action.payload : task));
        case DELETE:
            return state.filter((task) => task._id !== action.payload);
        default:
            return state;
    }
}