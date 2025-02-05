import { DocumentNotFoundError } from '../../utils/errors.js';
import { User, UserDocument } from './interface.js';
import { UsersModel } from './model.js';

export class UsersManager {
    static getAll = async (): Promise<UserDocument[]> => {
        return UsersModel.find().lean().exec();
    };

    static getById = async (featureId: string): Promise<UserDocument> => {
        return UsersModel.findById(featureId).orFail(new DocumentNotFoundError(featureId)).lean().exec();
    };

    static createOne = async (feature: User): Promise<UserDocument> => {
        return UsersModel.create(feature);
    };

    static updateOne = async (featureId: string, update: Partial<User>): Promise<UserDocument> => {
        return UsersModel.findByIdAndUpdate(featureId, update, { new: true }).orFail(new DocumentNotFoundError(featureId)).lean().exec();
    };

    static deleteOne = async (featureId: string): Promise<UserDocument> => {
        return UsersModel.findByIdAndDelete(featureId).orFail(new DocumentNotFoundError(featureId)).lean().exec();
    };
}
