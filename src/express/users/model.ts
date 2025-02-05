import mongoose from 'mongoose';
import { config } from '../../config.js';
import { UserDocument } from './interface.js';

const UsersSchema = new mongoose.Schema<UserDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        IDFid: {
            type: Number,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
    },
);

export const UsersModel = mongoose.model<UserDocument>(config.mongo.usersCollectionName, UsersSchema);
