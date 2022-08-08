import React from 'react';
import { useSelector } from 'react-redux';

import Task from './Task/Task'
import useStyles from './styles';
    
const Tasks = () => {
    const tasks = useSelector((state) => state.tasks);
    const classes = useStyles();

    console.log(tasks)
    
    return (
        <>
        <h1>Tasks</h1>
        <Task />
        <Task />
        </>
    );
}

export default Tasks;