import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from './../models/user.model';
import UserSchema from './../schemas/user.shema';
import UserInterface from './../interfaces/user.interface';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserSchema.validateAsync(req.body);
        const user: UserInterface = new User(result);
        const savedUser = await user.save();

        res.send(savedUser);
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = await UserSchema.validateAsync(req.body);
        const user: UserInterface = await User.findOne({ email });
        if (!user) {
            throw createError(404, 'Usuário não registrado.');
        }

        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            throw createError(401, 'Senha inválida.');
        }

        const secret = String(process.env.APP_SECRET);
        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.send({ token });
    } catch (error) {
        if (error.isJoi === true)
            return next(createError(400, 'Usuário ou senha inválidos.'));
        next(error)
    }
};

export default {
    register,
    login
}