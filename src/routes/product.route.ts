import { Router } from 'express';
import authMiddleware from './../middlewares/auth.middleware';
import adminMiddleware from './../middlewares/admin.middleware';
import ProductController from './../controllers/product.controller';

const router: Router = Router();

export default () => {
    router.route('/products')
        // Lista de produtos
        .get(authMiddleware, ProductController.getProducts)
        // Criação de produto
        .post([authMiddleware, adminMiddleware], ProductController.createProduct);

    router.route('/products/:id')
        // Buscar produto por id
        .get(authMiddleware, ProductController.findProductById)
        // Atualizar produto por id
        .patch([authMiddleware, adminMiddleware], ProductController.updateProduct)
        // Excluir produto por id
        .delete([authMiddleware, adminMiddleware], ProductController.deleteProduct);

    return router;
}