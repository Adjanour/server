import mongoose from 'mongoose';
import UserModel from './models/user';
import TeamModel from './models/team';
import ProjectModel from './models/project';
import TaskModel from './models/task';
import { connectDB } from '../config/db'; // Assuming you have this in your config

const seedDatabase = async () => {
    await connectDB();

    try {
        // Clear existing data (optional)
        await UserModel.deleteMany({});
        await TeamModel.deleteMany({});
        await ProjectModel.deleteMany({});
        await TaskModel.deleteMany({});

        // Insert users
        const users = await UserModel.insertMany([
            { uid: 'user1', email: 'user1@example.com', displayName: 'User 1' },
            { uid: 'user2', email: 'user2@example.com', displayName: 'User 2' },
        ]);

        // Insert teams
        const teams = await TeamModel.insertMany([
            { name: 'Team A', description: 'Team A Description', members: [users[0]._id, users[1]._id] },
            { name: 'Team B', description: 'Team B Description', members: [users[1]._id] },
        ]);

        // Insert projects
        const projects = await ProjectModel.insertMany([
            { name: 'Project 1', description: 'Project 1 Description', teamId: teams[0]._id },
            { name: 'Project 2', description: 'Project 2 Description', teamId: teams[1]._id },
        ]);

        // Insert tasks
        await TaskModel.insertMany([
            { projectId: projects[0]._id, title: 'Task 1', description: 'Task 1 Description', status: 'pending', createdBy: users[0]._id, assignedTo: users[1]._id },
            { projectId: projects[1]._id, title: 'Task 2', description: 'Task 2 Description', status: 'in-progress', createdBy: users[1]._id, assignedTo: users[0]._id },
        ]);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.disconnect();
    }
};

// Run the seeder
seedDatabase();
