import RequestInterface from './../interfaces/request.interface';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

export default (req: RequestInterface, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(createError('Token não fornecido.'));
    }

    const [, token] = authHeader.split(' ');

    try {
        const payload = jwt.verify(token, process.env.APP_SECRET);

        req.userId = payload.id;
        req.userRole = payload.role;

        next();
    } catch (error) {
        return next(createError(401, 'Token inválido.'));
    }
}