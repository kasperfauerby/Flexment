import { TextField, Button, Typography, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createTask, updateTask } from "../../actions/tasks";
    
const Form = ({ currentId, setCurrentId }) => {
    const [taskData, setTaskData] = useState({
        taskName: '', companyName: '', taskDescription: '', programmingLanguages: [], selectedFile: ''
    });
    const task = useSelector((state) => currentId ? state.tasks.tasks.find((task) => task._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        if (task) setTaskData(task);
    }, [task])
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateTask(currentId, {...taskData, name: user?.result?.name }));
        } else {
            dispatch(createTask({ ...taskData, name: user?.result?.name }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setTaskData({taskName: '', companyName: '',
        taskDescription: '', programmingLanguages: [], selectedFile: ''});
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Venligst log in før du laver opretter en opgave eller liker en opgave...
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className = {classes.paper} elevation={6}>
            <form autoComplete = 'off' noValidate className={`${classes.root}, ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h5'>{currentId ? 'Rediger' : 'Opret'} opgave</Typography>
                <TextField name = 'taskName' variant = 'outlined' label = 'Titel' fullWidth value={taskData.taskName} onChange = {(e) => setTaskData({ ... taskData, taskName: e.target.value })}/>
                <TextField name = 'companyName' variant = 'outlined' label = 'Firma' fullWidth value = {taskData.companyName} onChange = {(e) => setTaskData({ ... taskData, companyName: e.target.value })}/>
                {/* <TextField name = 'companyAddress' variant = 'outlined' label = 'Adresse' fullWidth value = {taskData.companyAddress} onChange = {(e) => setTaskData({ ... taskData, companyAddress: e.target.value })}/> */}
                <TextField name = 'taskDescription' variant = 'outlined' label = 'Beskrivelse' fullWidth multiline minRows={5} value = {taskData.taskDescription} onChange = {(e) => setTaskData({ ... taskData, taskDescription: e.target.value })}/>
                <TextField name = 'programmingLanguages' variant = 'outlined' label = 'Teknologier (komma seperaret)' fullWidth value = {taskData.programmingLanguages} onChange = {(e) => setTaskData({ ...taskData, programmingLanguages: e.target.value.split(',') })}/>
                <div className={classes.fileInput}><FileBase type='File' multiple={false} onDone={({base64}) => setTaskData({ ...taskData, selectedFile: base64 })}></FileBase></div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Tilføj</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;