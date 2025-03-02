import { Response } from 'express';
import { TypedRequest } from '../../utils/zod.js';
import { UsersManager } from './manager.js';
import { createOneRequestSchema, deleteOneRequestSchema, getByIdRequestSchema, updateOneRequestSchema } from './validations.js';

export class UsersController {
    static getById = async (req: TypedRequest<typeof getByIdRequestSchema>, res: Response) => {
        res.json(await UsersManager.getById(req.user?.genesisId ?? req.params.id));
    };

    static createOne = async (req: TypedRequest<typeof createOneRequestSchema>, res: Response) => {
        res.json(await UsersManager.createOne(req.body));
    };

    static updateOne = async (req: TypedRequest<typeof updateOneRequestSchema>, res: Response) => {
        res.json(await UsersManager.updateOne(req.params.id, req.body));
    };

    static deleteOne = async (req: TypedRequest<typeof deleteOneRequestSchema>, res: Response) => {
        res.json(await UsersManager.deleteOne(req.params.id));
    };
}
