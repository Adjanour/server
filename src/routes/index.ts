import userRoutes from './userRoutes';
import teamRoutes from './teamRoutes';
import projectRoutes from './projectRoutes';
import taskRoutes from './taskRoutes';
import statusRoutes from './statusRoutes';
import { Router } from 'express';


const  routes : Router[]  = [userRoutes, teamRoutes, projectRoutes, taskRoutes]

export default  routes;