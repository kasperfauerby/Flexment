import { TextField, Button, Typography, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createTask, updateTask } from "../../actions/tasks";
    
const Form = ({ currentId, setCurrentId }) => {
    const [taskData, setTaskData] = useState({
        taskName: '', programmingLanguage: '', companyName: '', companyAddress: '',
        taskDescription: '', creator: '', tags: '', selectedFile: ''
    });
    const task = useSelector((state) => currentId ? state.tasks.find((task) => task._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (task) setTaskData(task);
    }, [task])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateTask(currentId, taskData));
        } else {
            dispatch(createTask(taskData));
        }
    }

    const clear = () => {
        setCurrentId(null);
        setTaskData({taskName: '', programmingLanguage: '', companyName: '', companyAddress: '',
        taskDescription: '', creator: '', tags: '', selectedFile: ''});
    }

    return (
        <Paper className = {classes.paper}>
            <form autoComplete = 'off' noValidate className={`${classes.root}, ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h5'>{currentId ? 'Rediger' : 'Opret'} opgave</Typography>
                <TextField name = 'taskName' variant = 'outlined' label = 'Titel' fullWidth value={taskData.taskName} onChange = {(e) => setTaskData({ ... taskData, taskName: e.target.value })}/>
                <TextField name = 'programmingLanguage' variant = 'outlined' label = 'Sprog' fullWidth value = {taskData.programmingLanguage} onChange = {(e) => setTaskData({ ... taskData, programmingLanguage: e.target.value })}/>
                <TextField name = 'companyName' variant = 'outlined' label = 'Firma' fullWidth value = {taskData.companyName} onChange = {(e) => setTaskData({ ... taskData, companyName: e.target.value })}/>
                <TextField name = 'companyAddress' variant = 'outlined' label = 'Adresse' fullWidth value = {taskData.companyAddress} onChange = {(e) => setTaskData({ ... taskData, companyAddress: e.target.value })}/>
                <TextField name = 'taskDescription' variant = 'outlined' label = 'Beskrivelse' fullWidth value = {taskData.taskDescription} onChange = {(e) => setTaskData({ ... taskData, taskDescription: e.target.value })}/>
                <TextField name = 'creator' variant = 'outlined' label = 'Lavet af' fullWidth value = {taskData.creator} onChange = {(e) => setTaskData({ ... taskData, creator: e.target.value })}/>
                <TextField name = 'tags' variant = 'outlined' label = 'tags' fullWidth value = {taskData.tags} onChange = {(e) => setTaskData({ ... taskData, tags: e.target.value })}/>
                <div className={classes.fileInput}><FileBase type='File' multiple={false} onDone={({base64}) => setTaskData({ ... taskData, selectedFile: base64 })}></FileBase></div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Tilføj</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;