import mongoose from 'mongoose';
import { config } from '../../config';
import { Feature, FeatureDocument } from './interface';

const FeaturesSchema = new mongoose.Schema<Feature>(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
    },
    {
        versionKey: false,
    },
);

export const FeaturesModel = mongoose.model<FeatureDocument>(config.mongo.featuresCollectionName, FeaturesSchema);
