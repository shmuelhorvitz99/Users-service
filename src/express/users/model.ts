import mongoose from 'mongoose';
import { config } from '../../config.js';
import { UserDocument } from './interface.js';

const UsersSchema = new mongoose.Schema<UserDocument>(
    {
        genesisId: {
            type: String,
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
