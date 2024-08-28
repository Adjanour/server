import mongoose, { Schema, Document } from 'mongoose';
import {client} from '../../config/db';

export interface Project extends Document {
    name: string;
    description: string;
    teamId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update the `updatedAt` field
ProjectSchema.pre<Project>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const ProjectModel = client.model<Project>('Project', ProjectSchema);

export default ProjectModel;
