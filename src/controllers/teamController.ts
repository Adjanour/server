import { Request, Response } from 'express';
import TeamModel from '../models/team';

export const getTeams = async (req: Request, res: Response): Promise<void> => {
    try {
        const teams = await TeamModel.find();
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Implement other controller functions for teams as needed
