import { Request, Response, NextFunction } from 'express';
import * as createError from 'http-errors';
import * as jwt from 'jsonwebtoken';

export default (req: Request | any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(createError('Token não fornecido.'));
    }

    const [, token] = authHeader.split(' ');

    try {
        const payload = jwt.verify(token, process.env.APP_SECRET);

        req.userId = payload.id;

        next();
    } catch (error) {
        return next(createError(401, 'Token inválido.'));
    }
}