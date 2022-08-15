import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteTask, likeTask } from '../../../actions/tasks';
    
const Task = ({ task, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (task.likes.length > 0) {
          return task.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{task.likes.length > 2 ? `You and ${task.likes.length - 1} others` : `${task.likes.length} like${task.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{task.likes.length} {task.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openTask = () => history.push(`/tasks/${task._id}`)

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} component="span" name="test" onClick={openTask}>
                <CardMedia className={classes.media} image={task.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{task.taskName}</Typography>
                    <Typography variant="body2">{moment(task.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === task?.creator || user?.result?._id === task?.creator) && (  
                    <div className={classes.overlay2}>
                        <Button onClick={(e) => {e.stopPropagation(); setCurrentId(task._id);}}
                        style={{color: 'white'}} size="small" 
                        >
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{task.programmingLanguages.map((programmingLanguage) => `#${programmingLanguage} `)}</Typography>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="p">{task.taskDescription}</Typography>
                </div>
                <CardContent>
                    <Typography className={classes.name} variant="caption" gutterBottom>Oprettet af: {task.companyName}, {task.name}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={ () => dispatch(likeTask(task._id)) }>
                    <Likes />
                </Button>
                {(user?.result?.googleId === task?.creator || user?.result?._id === task?.creator) && (    
                <Button size="small" color="primary" onClick={ () => dispatch(deleteTask(task._id)) }>
                    <DeleteIcon fontSize="small" />
                    &nbsp; Delete &nbsp;
                </Button>)}
            </CardActions>
        </Card>
    );
}

export default Task;