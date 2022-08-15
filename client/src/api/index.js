import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
});

export const fetchTasks = (page) => API.get(`/tasks?page=${page}`);

export const fetchTask = (id) => API.get(`/tasks/${id}`);

export const fetchTasksBySearch = (searchQuery) => API.get(`/tasks/search?searchQuery=${searchQuery.search || 'none'}&programmingLanguages=${searchQuery.programmingLanguages}`);
export const createTask = (newTask) => API.post('/tasks', newTask);
export const updateTask = (id, updatedTask) => API.patch(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const likeTask = (id) => API.patch(`/tasks/${id}/likeTask`);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);
