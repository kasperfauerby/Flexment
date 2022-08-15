import express from 'express';

import { getTasks, getTask, getTasksBySearch, createTask, updateTask, deleteTask, likeTask } from '../controllers/tasks.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getTasks);
router.get('/search', getTasksBySearch)
router.get('/:id', getTask);
router.post('/', auth, createTask);
router.patch('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.patch('/:id/likeTask', auth, likeTask)

export default router;