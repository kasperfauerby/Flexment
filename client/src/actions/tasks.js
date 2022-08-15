import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

// Action Creators
export const getTasks = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks(page);

        console.log(data)

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getTasksBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchTasksBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createTask = (task) => async (dispatch) => {
    try {
        const { data } = await api.createTask(task);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateTask = (id, task) => async (dispatch) => {
    try {
        const { data } = await api.updateTask(id, task);
        console.log("Testing");
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        await api.deleteTask(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeTask = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeTask(id);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}