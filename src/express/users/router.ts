import { Router } from 'express';
import { validateRequest, wrapController } from '../../utils/express/wrappers.js';
import { UsersController } from './controller.js';
import {
    createOneRequestSchema,
    deleteOneRequestSchema,
    getAllRequestSchema,
    getByIdRequestSchema,
    updateOneRequestSchema,
} from './validations.js';

export const usersRouter = Router();

usersRouter.get('/', validateRequest(getAllRequestSchema), wrapController(UsersController.getAll));


usersRouter.get('/:id', validateRequest(getByIdRequestSchema), wrapController(UsersController.getById));

usersRouter.post('/', validateRequest(createOneRequestSchema), wrapController(UsersController.createOne));

usersRouter.put('/:id', validateRequest(updateOneRequestSchema), wrapController(UsersController.updateOne));

usersRouter.delete('/:id', validateRequest(deleteOneRequestSchema), wrapController(UsersController.deleteOne));
