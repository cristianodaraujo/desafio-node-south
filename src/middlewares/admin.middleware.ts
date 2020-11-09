import RequestInterface from './../interfaces/request.interface';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export default (req: RequestInterface, res: Response, next: NextFunction) => {
    try {
        if (String(req.userRole) !== 'admin') {
            return next(createError(401, 'Usuário sem permissão.'));
        }

        next();
    } catch (error) {
        return next(createError(401, 'Token inválido.'));
    }
}