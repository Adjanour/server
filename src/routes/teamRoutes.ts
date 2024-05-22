import express from 'express';
import { getTeams } from '../controllers/teamController';

const router = express.Router();

router.route('/teams')
    .get(getTeams);

export default router;

