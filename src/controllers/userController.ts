import { Request, Response } from 'express';
import UserModel from '../models/user';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {

}
// Implement other controller functions for users as needed

// POST /api/users - Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { uid, email, displayName, avatar } = req.body;

        // Validate required fields
        if (!uid || !email || !displayName) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ uid });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this UID already exists.' });
        }

        // Create a new user
        const newUser = new UserModel({
            uid,
            email,
            displayName,
            avatar
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return success response
        return res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};