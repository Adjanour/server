import mongoose, { Schema, Document } from 'mongoose';
import client from '../../config/db';

export interface User extends Document {
    uid: string;
    email: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const UserModel = client.model<User>('User', UserSchema);

export default UserModel;
