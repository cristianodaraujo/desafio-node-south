import UserController from '@controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();

export default () => {
    router.post('/users/register', UserController.register);
    router.post('/users/login', UserController.login);
    

    // router.route('/products/:id')
    //     // Buscar produto por id
    //     .get(ProductController.findProductById)
    //     // Atualizar produto por id
    //     .patch(ProductController.updateProduct)
    //     // Excluir produto por id
    //     .delete(ProductController.deleteProduct);

    return router;
}