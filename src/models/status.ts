import {client} from '../../config/db';
import mongoose, { Schema, Document } from 'mongoose';

export interface Status extends Document {
    name: string;
    shortName: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

const StatusSchema: Schema = new Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    color: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const StatusModel = client.model<Status>('Status', StatusSchema);

export default StatusModel;