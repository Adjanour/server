import { Request, Response } from 'express';
import TaskModel from '../models/task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await TaskModel.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = new TaskModel(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body);
        await task?.save();
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        await TaskModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const completeTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await TaskModel.findByIdAndUpdate(req.params.id, { status: 'completed'});
        await task?.save();
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}



// Implement other controller functions for tasks as needed
