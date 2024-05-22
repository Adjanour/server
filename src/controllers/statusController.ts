import { Request, Response } from "express";
import StatusModel from "../models/status";

export const getStatuses = async (req:Request, res:Response) => {
    try {
        const statuses = await StatusModel.find();
        res.status(200).json(statuses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createStatus = async (req:Request, res:Response) => {
    try {
        const status = new StatusModel(req.body);
        await status.save();
        res.status(201).json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateStatus = async (req:Request, res:Response) => {
    try {
        const status = await StatusModel.findByIdAndUpdate(req.params.id, req.body);
        await status?.save();
        res.status(200).json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteStatus = async (req:Request, res:Response) => {
    try {
        await StatusModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Status deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

