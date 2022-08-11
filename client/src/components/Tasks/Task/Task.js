import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumpUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch } from 'react-redux';

import useStyles from './styles';
    
const Task = ({ task, setCurrentId }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={task.selectedFile} title={task.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{task.taskName}</Typography>
                <Typography variant="body2">{moment(task.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(task._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body4" color="textSecondary">{task.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            <div className={classes.details}>
                <Typography variant="body1" color="textSecondary">{task.taskDescription}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom></Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={ () => {} }>
                    <ThumpUpAltIcon fontSize="small" />
                    Like
                    {task.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={ () => {} }>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>


        </Card>
    );
}

export default Task;