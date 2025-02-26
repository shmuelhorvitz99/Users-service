import mongoose from 'mongoose';
import 'dotenv/config';
import env from 'env-var';

export const config = {
    service: {
        port: env.get('PORT').default(8000).required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').default('mongodb://mongo:27017/mydatabase').required().asString(),
        usersCollectionName: env.get('USERS_COLLECTION_NAME').default('users').required().asString(),
    },
};

// התחברות למונגו
mongoose.connect(config.mongo.uri)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
