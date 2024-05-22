import { Request, Response } from 'express';
import ProjectModel from '../models/project';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = new ProjectModel(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body);
        await project?.save();
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        await ProjectModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Project deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Implement other controller functions for projects as needed
