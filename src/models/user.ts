import { Schema, Document } from 'mongoose';
import {client} from '../../config/db';

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
    avatar: { type: String,required: false, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre<User>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserModel = client.model<User>('User', UserSchema);

export default UserModel;
