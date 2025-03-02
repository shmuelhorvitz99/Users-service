import 'dotenv/config';
import env from 'env-var';

export const config = {
    service: {
        port: env.get('PORT').default(3002).required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').default('mongodb://localhost/WhatsDown').required().asString(),
        usersCollectionName: env.get('USERS_COLLECTION_NAME').default('users').required().asString(),
    },
};