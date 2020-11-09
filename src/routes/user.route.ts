import UserController from './../controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();

export default () => {
    // Registrando usuário
    router.post('/users/register', UserController.register);
    // Autenticando usuário
    router.post('/users/login', UserController.login);

    return router;
}