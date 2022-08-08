import express from 'express';

import { getTasks, createPost } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);

export default router;