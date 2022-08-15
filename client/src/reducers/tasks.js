import { FETCH_ALL, FETCH_TASK, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes.js';

export default (state = { isLoading: true, tasks: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return { ...state, tasks: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages};
        case FETCH_TASK:
            return { ...state, task: action.payload};
        case FETCH_BY_SEARCH:
            return { ...state, tasks: action.payload};
        case CREATE:
            const tasks =  [action.payload, ...state.tasks]
            tasks.pop()
            return { ...state, tasks};
        case UPDATE:
            return { ...state, tasks: state.tasks.map((task) => (task._id === action.payload._id ? action.payload : task))};
        case DELETE:
            return { ...state, tasks: state.tasks.filter((task) => task._id !== action.payload)};
        default:
            return state;
    }
}