import { DocumentNotFoundError } from '../../utils/errors.js';
import { User, UserDocument } from './interface.js';
import { UsersModel } from './model.js';

export class UsersManager {
    static getById = async (genesisId: string): Promise<UserDocument | null> => {
        return await UsersModel.findOne({ genesisId: genesisId }).lean().exec() || null;
    };

    static createOne = async (user: User): Promise<UserDocument> => {
        return UsersModel.create( user );
    };

    static updateOne = async (genesisId: string, update: Partial<User>): Promise<UserDocument> => {
        
        return UsersModel.findOneAndUpdate({ genesisId: genesisId }, update, { new: true }).orFail(new DocumentNotFoundError(genesisId)).lean().exec();
    };

    static deleteOne = async (genesisId: string): Promise<UserDocument> => {
        return UsersModel.findOneAndDelete({genesisId:genesisId}).orFail(new DocumentNotFoundError(genesisId)).lean().exec();
    };
}
