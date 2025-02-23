import { z } from 'zod';

export const zodMongoObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId' });

const requiredFields = z
    .object({
        isAdmin: z.boolean(),
    })
    .required();

const optionalFields = z
    .object({
        genesisId: z.string(),
    })
    .required();

// GET /api/users/:id
export const getByIdRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
        id: z.string(),
    }),
});

// POST /api/users
export const createOneRequestSchema = z.object({
    body: requiredFields.merge(optionalFields),
    query: z.object({}),
    params: z.object({}),
});

// PUT /api/users/:id
export const updateOneRequestSchema = z.object({
    body: requiredFields,
    query: z.object({}),
    params: z.object({
        id: z.string(),
    }),
});

// DELETE /api/users/:id
export const deleteOneRequestSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
        id: z.string(),
    }),
});
