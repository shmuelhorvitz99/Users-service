import { DocumentNotFoundError } from '../../utils/errors';
import { Feature, FeatureDocument } from './interface';
import { FeaturesModel } from './model';

export class FeaturesManager {
    static getByQuery = async (query: Partial<Feature>, step: number, limit?: number): Promise<FeatureDocument[]> => {
        return FeaturesModel.find(query, {}, limit ? { limit, skip: limit * step } : {}).exec();
    };

    static getCount = async (query: Partial<Feature>): Promise<number> => {
        return FeaturesModel.count(query);
    };

    static getById = async (featureId: string): Promise<FeatureDocument> => {
        return FeaturesModel.findById(featureId).orFail(new DocumentNotFoundError(featureId)).exec();
    };

    static createOne = async (feature: Feature): Promise<FeatureDocument> => {
        return FeaturesModel.create(feature);
    };

    static updateOne = async (featureId: string, update: Partial<Feature>): Promise<FeatureDocument> => {
        return FeaturesModel.findByIdAndUpdate(featureId, update, { new: true }).orFail(new DocumentNotFoundError(featureId)).exec();
    };

    static deleteOne = async (featureId: string): Promise<FeatureDocument> => {
        return FeaturesModel.findByIdAndDelete(featureId).orFail(new DocumentNotFoundError(featureId)).exec();
    };
}
