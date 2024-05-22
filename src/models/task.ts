import mongoose, { Schema, Document } from 'mongoose';
import client from '../../config/db';

export interface Task extends Document {
    projectId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: Date;
    createdBy: mongoose.Types.ObjectId;
    assignedTo?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const TaskModel = client.model<Task>('Task', TaskSchema);

export default TaskModel;



