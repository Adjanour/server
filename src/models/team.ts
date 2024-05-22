import mongoose, { Schema, Document } from 'mongoose';
import client from '../../config/db';

export interface Team extends Document {
    name: string;
    description: string;
    members: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const TeamSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const TeamModel = client.model<Team>('Team', TeamSchema);

export default TeamModel;
