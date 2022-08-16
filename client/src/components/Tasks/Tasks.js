import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Task from './Task/Task'
import useStyles from './styles';
    
const Tasks = ({ setCurrentId }) => {
    const { tasks, isLoading } = useSelector((state) => state.tasks);
    const classes = useStyles();

    console.log(tasks)
    
    if(!tasks.length && !isLoading) return 'No Tasks'

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {tasks.map((task) => (
                    <Grid key={task._id} item xs={12} sm={12} md={6} lg={3}>
                        <Task task={task} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Tasks;