import express from 'express';
import {createUser, getUsers} from '../controllers/userController';

const router = express.Router();

router.route('/users')
    .get(getUsers)
    .post(createUser);


export default router;
