import { Express } from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { config } from '../src/config.js';
import { User } from '../src/express/users/interface.js';
import { Server } from '../src/express/server.js';

const { mongo } = config;
const fakeGenesisId = '111111111111111111111111';

const removeTestUsersCollection = async () => {
    const usersCollection = mongoose.connection.collections['test_users'];
    await usersCollection.deleteMany({});
};

const TestUserSchema = new mongoose.Schema({
    genesisId: String,
    isAdmin: Boolean,
});
const TestUser = mongoose.model('test_users', TestUserSchema);

const exampleUser: User = {
    genesisId: "1234",
    isAdmin: false,
};

describe('e2e users API testing', () => {
    let app: Express;

    beforeAll(async () => {
        await mongoose.connect(mongo.uri);
        app = Server.createExpressApp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await removeTestUsersCollection();
    });

    afterAll(async () => {
        await removeTestUsersCollection();
    });

    describe('/isAlive', () => {
        it('should return alive', async () => {
            const response = await request(app).get('/isAlive').expect(200);
            expect(response.text).toBe('alive');
        });
    });

    describe('/unknownRoute', () => {
        it('should return status code 404 for unknown route', async () => {
            await request(app).get('/unknownRoute').expect(404);
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const { body } = await request(app).post('/api/users').send(exampleUser).expect(200);
            expect(body).toEqual(expect.objectContaining(exampleUser));
        });

        it('should fail validation for missing fields', async () => {
            await request(app).post('/api/users').send({}).expect(400);
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return 200 with null for a non-existing user', async () => {
            const response = await request(app).get(`/api/users/${fakeGenesisId}`).expect(200);
            expect(response.body).toBeNull();
        });

        it('should return 200 with the user', async () => {
            const response = await request(app).get(`/api/users/${exampleUser.genesisId}`).expect(200);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            expect(response.body).toEqual(expect.objectContaining(exampleUser));
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should return 200 with the updated user', async () => {
            const updatedUser = { genesisId: exampleUser.genesisId, isAdmin: true };
            const response = await request(app).put(`/api/users/${exampleUser.genesisId}`).send(updatedUser).expect(200);
            expect(response.body).toEqual(expect.objectContaining(updatedUser));
        });

        it('should fail validation for missing fields', async () => {
            await request(app).put(`/api/users/${exampleUser.genesisId}`).send({}).expect(400);
        });

        it('should return 404 for a non-existing user', async () => {
            const updatedUser = { genesisId: exampleUser.genesisId, isAdmin: true };
            await request(app).put(`/api/users/${fakeGenesisId}`).send(updatedUser).expect(404);
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should return 200 with the deleted user', async () => {
            await request(app).put(`/api/users/${exampleUser.genesisId}`).send(exampleUser).expect(200);
            const response = await request(app).delete(`/api/users/${exampleUser.genesisId}`).expect(200);
            expect(response.body).toEqual(expect.objectContaining(exampleUser));
        });

        it('should return 404 for a non-existing user', async () => {
            await request(app).delete(`/api/users/${fakeGenesisId}`).expect(404);
        });
    });
});
