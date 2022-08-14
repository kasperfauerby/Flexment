import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deleteTask, likeTask } from '../../../actions/tasks';
    
const Task = ({ task, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
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

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={task.selectedFile} title={task.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{task.taskName}</Typography>
                <Typography variant="body2">{moment(task.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === task?.creator || user?.result?._id === task?.creator) && (  
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(task._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{task.programmingLanguage.map((programmingLanguage) => `#${programmingLanguage} `)}</Typography>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="p">{task.taskDescription}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.name} variant="h7" gutterBottom>Oprettet af: {task.companyName}, {task.name}</Typography>
            </CardContent>
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