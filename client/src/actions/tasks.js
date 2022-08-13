import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js';
import * as api from '../api/index.js';

// Action Creators
export const getTasks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks();

        dispatch({ type: FETCH_ALL, payload: data });
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