import * as api from '../api';

// Action Creators
export const getTasks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks();

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}
