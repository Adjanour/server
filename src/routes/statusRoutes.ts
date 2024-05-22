import express from 'express';
import { getStatuses } from '../controllers/statusController';


const router = express.Router();

router.route('/status')
    .get(getStatuses);


export default router;