import { Router } from 'express';
import ProductController from '@controllers/product.controller';

const router: Router = Router();

export default () => {
    router.route('/products')
        // Lista de produtos
        .get(ProductController.getProducts)
        // Criação de produto
        .post(ProductController.createProduct);

    router.route('/products/:id')
        // Buscar produto por id
        .get(ProductController.findProductById)
        // Atualizar produto por id
        .patch(ProductController.updateProduct)
        // Excluir produto por id
        .delete(ProductController.deleteProduct);

    return router;
}