import { DocumentNotFoundError } from '../../utils/errors.js';
import { User, UserDocument } from './interface.js';
import { UsersModel } from './model.js';

export class UsersManager {
    static getById = async (genesisId: string): Promise<UserDocument> => {
        return await UsersModel.findOne({ genesisId: genesisId }).orFail(new DocumentNotFoundError(genesisId)).lean().exec();
    };

    static createOne = async (user: User): Promise<UserDocument> => {
        return UsersModel.create({ user });
    };

    static updateOne = async (userId: string, update: Partial<User>): Promise<UserDocument> => {
        return UsersModel.findByIdAndUpdate(userId, update, { new: true }).orFail(new DocumentNotFoundError(userId)).lean().exec();
    };

    static deleteOne = async (userId: string): Promise<UserDocument> => {
        return UsersModel.findByIdAndDelete(userId).orFail(new DocumentNotFoundError(userId)).lean().exec();
    };
}
