import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';

import { getTask, getTasksBySearch } from '../../actions/tasks';
import useStyles from './styles';

const TaskDetails = () => {
    const { task, tasks, isLoading } = useSelector((state) => state.tasks)
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getTask(id));
    }, [id])

    useEffect(() => {
        if(task) {
            dispatch(getTasksBySearch({ search: 'none', programmingLanguages: task?.programmingLanguages.join(',') }));
        }
    }, [task]);

    if(!task) return null;

    if(isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    const recommendedTasks = tasks.filter(({_id}) => _id !== task._id);

    const openTask = (_id) => history.push(`/tasks/${_id}`);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{task.taskName}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{task.programmingLanguages.map((programmingLanguage) => `#${programmingLanguage} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{task.taskDescription}</Typography>
                    <Typography variant="h6">Created by: {task.taskName}</Typography>
                    <Typography variant="body1">{moment(task.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={task.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={task.taskName} />
                </div>
            </div>
            {recommendedTasks.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">Lignende opgaver:</Typography>
                    <Divider />
                    <div className={classes.recommendedTasks}>
                        {recommendedTasks.map(({ taskName, companyName, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} maxwidth="true" onClick={() => openTask(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{taskName}</Typography>
                                <Typography gutterBottom variant="h6">{companyName}</Typography>
                                <Typography gutterBottom variant="h6">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default TaskDetails;