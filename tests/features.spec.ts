/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Express } from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { config } from '../src/config.js';
import { User } from '../src/express/users/interface.js';
import { Server } from '../src/express/server.js';

const { mongo } = config;

const fakeObjectId = '111111111111111111111111';

const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection!.deleteMany({});
    }
};

const exampleUser: User = {
    name: 'test',
    IDFid: 123,
    isAdmin: false,
};

describe('e2e users api testing', () => {
    let app: Express;

    beforeAll(async () => {
        await mongoose.connect(mongo.uri);
        app = Server.createExpressApp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await removeAllCollections();
    });

    describe('/isAlive', () => {
        it('should return alive', async () => {
            const response = await request(app).get('/isAlive').expect(200);
            expect(response.text).toBe('alive');
        });
    });

    describe('/unknownRoute', () => {
        it('should return status code 404', async () => {
            return request(app).get('/unknownRoute').expect(404);
        });
    });



    describe('GET /api/users/:userId', () => {
        it('should get a user', async () => {
            const { body: user } = await request(app).post('/api/users').send(exampleUser).expect(200);

            const { body } = await request(app).get(`/api/users/${user._id}`).expect(200);

            expect(body).toEqual(user);
        });

        it('should fail for getting a non-existing user', async () => {
            return request(app).get(`/api/users/${fakeObjectId}`).expect(404);
        });
    });

    describe('GET /api/users', () => {
        it('should get all users', async () => {
            const { body: user } = await request(app).post('/api/users').send(exampleUser).expect(200);

            const { body } = await request(app).get('/api/users').expect(200);

            expect(body).toEqual(expect.arrayContaining([user]));
        });

        describe('POST /api/users', () => {
            it('should create a new user', async () => {
                const { body } = await request(app).post('/api/users').send(exampleUser).expect(200);

                expect(body).toEqual(expect.objectContaining(exampleUser));
            });

            it('should fail validation for missing fields', async () => {
                return request(app).post('/api/users').send({}).expect(400);
            });
        });

        describe('PUT /api/users/:userId', () => {
            it('should update user', async () => {
                const propertyForUpdate = 'test2';

                const {
                    body: { _id },
                } = await request(app).post('/api/users').send(exampleUser).expect(200);

            });

            it('should fail for updating a non-existing user', async () => {
                return request(app).put(`/api/users/${fakeObjectId}`).send(exampleUser).expect(404);
            });
        });

        describe('DELETE /api/users/:userId', () => {
            it('should delete user', async () => {
                const {
                    body: { _id },
                } = await request(app).post('/api/users').send(exampleUser).expect(200);

                return request(app).delete(`/api/users/${_id}`).expect(200);
            });

            it('should fail for deleting a non-existing user', async () => {
                return request(app).delete(`/api/users/${fakeObjectId}`).expect(404);
            });
        });
    });
});
