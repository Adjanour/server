import express from 'express';
import { getTasks } from '../controllers/taskController';

const router = express.Router();

router.route('/tasks')
    .get(getTasks);

export default router;
