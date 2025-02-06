import { z } from 'zod';
import { zodMongoObjectId } from '../../utils/zod.js';

const requiredFields = z
    .object({
        genesisId: z.number()
    })
    .required();

const optionalFields = z
    .object({
        isAdmin: z.boolean(),
    });

// GET /api/features/
export const getAllRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({}),
});

// GET /api/features/:id
export const getByIdRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});

// POST /api/features
export const createOneRequestSchema = z.object({
    body: requiredFields.merge(optionalFields),
    query: z.object({}),
    params: z.object({}),
});

// PUT /api/features/:id
export const updateOneRequestSchema = z.object({
    body: requiredFields.partial().merge(optionalFields),
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});

// DELETE /api/features/:id
export const deleteOneRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
        id: zodMongoObjectId,
    }),
});
